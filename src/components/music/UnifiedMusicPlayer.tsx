import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";
import { Slider } from "../../ui/slider";
import { Music, Maximize2, Minimize2, X, SkipBack, SkipForward, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { toast } from "react-hot-toast";

interface Track {
	name: string;
	original_name?: string;
	url: string;
}

interface UnifiedMusicPlayerProps {
	playlist: Track[];
}

const UnifiedMusicPlayer: React.FC<UnifiedMusicPlayerProps> = ({ playlist }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentTrack, setCurrentTrack] = useState<Track | null>(playlist[0] || null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(false);
	const [volume, setVolume] = useState(0.7);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [isVisible, setIsVisible] = useState(true);
	const [isMinimized, setIsMinimized] = useState(false);
	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		setCurrentTrack(playlist[currentIndex] || null);
	}, [currentIndex, playlist]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio || !currentTrack) return;
		audio.src = currentTrack.url;
		audio.load();
		if (isPlaying) {
			audio.play().catch(() => setIsPlaying(false));
		}
	}, [currentTrack]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		audio.muted = isMuted;
		audio.volume = volume;
	}, [isMuted, volume]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		if (isPlaying) {
			audio.play().catch(() => setIsPlaying(false));
		} else {
			audio.pause();
		}
	}, [isPlaying]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;
		const timeUpdate = () => setCurrentTime(audio.currentTime);
		const loadedMetadata = () => setDuration(audio.duration);
		audio.addEventListener("timeupdate", timeUpdate);
		audio.addEventListener("loadedmetadata", loadedMetadata);
		return () => {
			audio.removeEventListener("timeupdate", timeUpdate);
			audio.removeEventListener("loadedmetadata", loadedMetadata);
		};
	}, []);

	const playTrack = (track: Track) => {
		setCurrentTrack(track);
		setIsPlaying(true);
	};

	const playNext = () => {
		if (playlist.length === 0) return;
		const nextIndex = (currentIndex + 1) % playlist.length;
		setCurrentIndex(nextIndex);
		playTrack(playlist[nextIndex]);
	};

	const playPrevious = () => {
		if (playlist.length === 0) return;
		const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
		setCurrentIndex(prevIndex);
		playTrack(playlist[prevIndex]);
	};

	const togglePlay = async () => {
		if (!audioRef.current || !currentTrack) return;
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			try {
				if (!audioRef.current.src) {
					playTrack(currentTrack);
				} else {
					await audioRef.current.play();
				}
			} catch (error) {
				toast.error("Failed to play audio");
			}
		}
	};

	const toggleMute = () => {
		setIsMuted((prev) => !prev);
		toast.info(!isMuted ? "🔇 Audio muted" : "🔊 Audio unmuted", { duration: 1000 });
	};

	const handleSeek = (value: number[]) => {
		if (audioRef.current && duration > 0) {
			audioRef.current.currentTime = (value[0] / 100) * duration;
		}
	};

	const formatTime = (seconds: number) => {
		if (isNaN(seconds)) return "0:00";
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const hidePlayer = () => {
		setIsVisible(false);
		if (audioRef.current) {
			audioRef.current.pause();
			setIsPlaying(false);
		}
	};

	if (!isVisible || !currentTrack) {
		return <audio ref={audioRef} />;
	}

	return (
		<>
			<audio ref={audioRef} />
			<Card
				className={`fixed bottom-4 right-4 z-50 border-primary/30 bg-background/95 backdrop-blur-md transition-all duration-300 ${
					isMinimized ? "w-64 h-16" : "w-80 h-auto"
				}`}
			>
				<CardContent className="p-3">
					{/* Header */}
					<div className="flex items-center justify-between mb-2">
						<div className="flex items-center gap-2">
							<Music className="h-4 w-4 text-primary" />
							<span className="text-sm font-medium text-primary">
								{isMinimized ? "🎵" : "Gaia Music"}
							</span>
						</div>
						<div className="flex items-center gap-1">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setIsMinimized(!isMinimized)}
								className="h-6 w-6 p-0 text-muted-foreground hover:text-primary"
							>
								{isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
							</Button>
							<Button
								variant="ghost"
								size="sm"
								onClick={hidePlayer}
								className="h-6 w-6 p-0 text-destructive hover:text-destructive/80"
							>
								<X className="h-3 w-3" />
							</Button>
						</div>
					</div>
					{!isMinimized && (
						<>
							{/* Track info */}
							<div className="mb-3">
								<h4 className="text-sm font-medium text-foreground truncate">
									{currentTrack.original_name || currentTrack.name}
								</h4>
								<div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
									<span>{formatTime(currentTime)}</span>
									<span>{formatTime(duration)}</span>
								</div>
							</div>
							{/* Progress bar */}
							<div className="mb-3">
								<Slider
									value={[duration > 0 ? (currentTime / duration) * 100 : 0]}
									max={100}
									step={1}
									className="w-full"
									onValueChange={handleSeek}
								/>
							</div>
						</>
					)}
					{/* Controls */}
					<div className={`flex items-center ${isMinimized ? "justify-center gap-2" : "justify-between"}`}>
						{!isMinimized && playlist.length > 1 && (
							<Button
								variant="ghost"
								size="sm"
								onClick={playPrevious}
								className="h-8 w-8 p-0 text-primary hover:text-primary/80"
							>
								<SkipBack className="h-4 w-4" />
							</Button>
						)}
						<Button
							variant="ghost"
							size="sm"
							onClick={togglePlay}
							className="h-8 w-8 p-0 text-primary hover:text-primary/80"
						>
							{isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
						</Button>
						{!isMinimized && (
							<>
								{playlist.length > 1 && (
									<Button
										variant="ghost"
										size="sm"
										onClick={playNext}
										className="h-8 w-8 p-0 text-primary hover:text-primary/80"
									>
										<SkipForward className="h-4 w-4" />
									</Button>
								)}
								<div className="flex items-center gap-2">
									<Button
										variant="ghost"
										size="sm"
										onClick={toggleMute}
										className="h-6 w-6 p-0 text-primary hover:text-primary/80"
									>
										{isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
									</Button>
									<Slider
										value={[volume * 100]}
										max={100}
										step={5}
										className="w-16"
										onValueChange={(value) => setVolume(value[0] / 100)}
									/>
								</div>
							</>
						)}
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export { UnifiedMusicPlayer };
export default UnifiedMusicPlayer;
