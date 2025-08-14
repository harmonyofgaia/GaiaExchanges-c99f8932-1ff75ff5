import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Target,
  Bomb,
  Wind,
  Users,
  Trophy,
  Crosshair,
  Flame,
  Zap,
  Shield,
  Crown,
  Star,
  Settings,
} from "lucide-react";
import { toast } from "sonner";

interface Worm {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  position: { x: number; y: number };
  gaiaValue: number;
  team: "player" | "enemy";
  isActive: boolean;
  color: string;
}

interface Weapon {
  id: string;
  name: string;
  damage: number;
  cost: number;
  radius: number;
  icon: React.ReactElement;
  description: string;
}

interface Explosion {
  x: number;
  y: number;
  radius: number;
  timestamp: number;
}

export function WormsGameArena() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<"waiting" | "playing" | "paused" | "finished">(
    "waiting"
  );
  const [currentPlayer, setCurrentPlayer] = useState<"player" | "enemy">("player");
  const [selectedWeapon, setSelectedWeapon] = useState("bazooka");
  const [windStrength, setWindStrength] = useState(0);
  const [turnTimer, setTurnTimer] = useState(45);
  const [power, setPower] = useState([50]);
  const [angle, setAngle] = useState([45]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [gaiaEarned, setGaiaEarned] = useState(0);
  const [roundNumber, setRoundNumber] = useState(1);

  const [worms, setWorms] = useState<Worm[]>([
    {
      id: "1",
      name: "GAiA Warrior Alpha",
      health: 100,
      maxHealth: 100,
      position: { x: 150, y: 300 },
      gaiaValue: 25,
      team: "player",
      isActive: true,
      color: "#10b981",
    },
    {
      id: "2",
      name: "GAiA Warrior Beta",
      health: 100,
      maxHealth: 100,
      position: { x: 200, y: 300 },
      gaiaValue: 25,
      team: "player",
      isActive: false,
      color: "#3b82f6",
    },
    {
      id: "3",
      name: "GAiA Warrior Gamma",
      health: 100,
      maxHealth: 100,
      position: { x: 250, y: 300 },
      gaiaValue: 25,
      team: "player",
      isActive: false,
      color: "#8b5cf6",
    },
    {
      id: "4",
      name: "Destroyer Worm Alpha",
      health: 120,
      maxHealth: 120,
      position: { x: 550, y: 300 },
      gaiaValue: 40,
      team: "enemy",
      isActive: false,
      color: "#ef4444",
    },
    {
      id: "5",
      name: "Destroyer Worm Beta",
      health: 120,
      maxHealth: 120,
      position: { x: 600, y: 300 },
      gaiaValue: 45,
      team: "enemy",
      isActive: false,
      color: "#f97316",
    },
    {
      id: "6",
      name: "Destroyer Worm Gamma",
      health: 130,
      maxHealth: 130,
      position: { x: 650, y: 300 },
      gaiaValue: 50,
      team: "enemy",
      isActive: false,
      color: "#dc2626",
    },
  ]);

  const weapons: Weapon[] = [
    {
      id: "bazooka",
      name: "Bazooka",
      damage: 45,
      cost: 0,
      radius: 30,
      icon: <Bomb className="h-4 w-4" />,
      description: "Standard explosive rocket",
    },
    {
      id: "grenade",
      name: "Grenade",
      damage: 35,
      cost: 5,
      radius: 40,
      icon: <Bomb className="h-4 w-4" />,
      description: "High-explosive grenade",
    },
    {
      id: "shotgun",
      name: "Shotgun",
      damage: 25,
      cost: 3,
      radius: 15,
      icon: <Target className="h-4 w-4" />,
      description: "Close-range spread shot",
    },
    {
      id: "airstrike",
      name: "Air Strike",
      damage: 75,
      cost: 20,
      radius: 60,
      icon: <Flame className="h-4 w-4" />,
      description: "Devastating aerial bombardment",
    },
    {
      id: "lightning",
      name: "Lightning",
      damage: 90,
      cost: 25,
      radius: 20,
      icon: <Zap className="h-4 w-4" />,
      description: "Instant electric strike",
    },
    {
      id: "nuke",
      name: "Nuclear Bomb",
      damage: 150,
      cost: 50,
      radius: 100,
      icon: <Crown className="h-4 w-4" />,
      description: "Ultimate destruction weapon",
    },
  ];

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw sky gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#2c5aa0");
    gradient.addColorStop(1, "#1a1a2e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);

    // Draw terrain
    ctx.fillStyle = "#16a34a";
    ctx.beginPath();
    ctx.moveTo(0, canvas.height * 0.7);
    for (let x = 0; x <= canvas.width; x += 10) {
      const y = canvas.height * 0.7 + Math.sin(x * 0.01) * 20;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();

    // Draw worms
    worms.forEach((worm) => {
      if (worm.health <= 0) return;

      ctx.fillStyle = worm.color;
      ctx.beginPath();
      ctx.arc(worm.position.x, worm.position.y, 12, 0, Math.PI * 2);
      ctx.fill();

      // Draw worm eyes
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(worm.position.x - 4, worm.position.y - 3, 2, 0, Math.PI * 2);
      ctx.arc(worm.position.x + 4, worm.position.y - 3, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(worm.position.x - 4, worm.position.y - 3, 1, 0, Math.PI * 2);
      ctx.arc(worm.position.x + 4, worm.position.y - 3, 1, 0, Math.PI * 2);
      ctx.fill();

      // Highlight active worm
      if (worm.isActive) {
        ctx.strokeStyle = "#ffd700";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(worm.position.x, worm.position.y, 15, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw health bar
      const barWidth = 30;
      const barHeight = 4;
      const barX = worm.position.x - barWidth / 2;
      const barY = worm.position.y - 25;

      ctx.fillStyle = "#333333";
      ctx.fillRect(barX, barY, barWidth, barHeight);

      ctx.fillStyle = worm.health > 30 ? "#10b981" : "#ef4444";
      const healthPercent = worm.health / worm.maxHealth;
      ctx.fillRect(barX, barY, barWidth * healthPercent, barHeight);
    });

    // Draw explosions
    explosions.forEach((explosion) => {
      const age = Date.now() - explosion.timestamp;
      const maxAge = 1000;
      const alpha = Math.max(0, 1 - age / maxAge);

      if (alpha > 0) {
        const gradient = ctx.createRadialGradient(
          explosion.x,
          explosion.y,
          0,
          explosion.x,
          explosion.y,
          explosion.radius
        );
        gradient.addColorStop(0, `rgba(255, 165, 0, ${alpha})`);
        gradient.addColorStop(0.5, `rgba(255, 69, 0, ${alpha * 0.8})`);
        gradient.addColorStop(1, `rgba(255, 0, 0, ${alpha * 0.3})`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(explosion.x, explosion.y, explosion.radius * (1 - age / maxAge), 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Draw wind indicator
    ctx.fillStyle = "#ffffff";
    ctx.font = "16px Arial";
    ctx.fillText(`Wind: ${windStrength > 0 ? "+" : ""}${windStrength}`, 20, 30);

    // Draw trajectory preview if player's turn
    if (currentPlayer === "player" && gameState === "playing") {
      const activeWorm = worms.find((w) => w.isActive && w.team === "player");
      if (activeWorm) {
        ctx.strokeStyle = "#ffffff";
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 2;
        ctx.beginPath();

        const startX = activeWorm.position.x;
        const startY = activeWorm.position.y;
        const powerFactor = power[0] / 100;
        const radianAngle = (angle[0] * Math.PI) / 180;

        for (let t = 0; t < 100; t += 2) {
          const x = startX + (powerFactor * 5 * Math.cos(radianAngle) + windStrength * 0.1) * t;
          const y = startY - powerFactor * 5 * Math.sin(radianAngle) * t + 0.5 * 9.8 * t * t * 0.1;

          if (t === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          if (y > canvas.height * 0.7) break;
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  }, [worms, explosions, windStrength, currentPlayer, gameState, power, angle]);

  useEffect(() => {
    drawGame();
  }, [drawGame]);

  useEffect(() => {
    if (gameState === "playing") {
      const timer = setInterval(() => {
        setTurnTimer((prev) => {
          if (prev <= 1) {
            switchTurn();
            return 45;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState, currentPlayer, switchTurn]);

  useEffect(() => {
    // Generate random wind strength every 15 seconds
    const windInterval = setInterval(() => {
      setWindStrength(Math.floor(Math.random() * 21) - 10); // -10 to +10
    }, 15000);

    return () => clearInterval(windInterval);
  }, []);

  // Clean up old explosions
  useEffect(() => {
    const cleanup = setInterval(() => {
      setExplosions((prev) => prev.filter((explosion) => Date.now() - explosion.timestamp < 1000));
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  const startGame = () => {
    setGameState("playing");
    setCurrentPlayer("player");
    setTurnTimer(45);
    setGaiaEarned(0);
    setRoundNumber(1);

    // Reset worms
    setWorms((prev) =>
      prev.map((worm) => ({
        ...worm,
        health: worm.maxHealth,
        isActive: worm.id === "1", // First player worm is active
      }))
    );

    toast.success("🐛 Worms Battle Arena Started!", {
      description: "Strategic combat with GAiA token rewards!",
      duration: 4000,
    });
  };

  const switchTurn = useCallback(() => {
    setCurrentPlayer((prev) => {
      const newPlayer = prev === "player" ? "enemy" : "player";

      // Set next active worm
      const teamWorms = worms.filter((w) => w.team === newPlayer && w.health > 0);
      if (teamWorms.length > 0) {
        setWorms((prev) =>
          prev.map((worm) => ({
            ...worm,
            isActive: worm.team === newPlayer && worm.id === teamWorms[0].id,
          }))
        );
      }

      return newPlayer;
    });
    setTurnTimer(45);
  }, [worms]);

  const fireWeapon = async () => {
    const weapon = weapons.find((w) => w.id === selectedWeapon);
    if (!weapon) return;

    const activeWorm = worms.find((w) => w.isActive && w.team === currentPlayer);
    if (!activeWorm) return;

    // Calculate impact point
    const powerFactor = power[0] / 100;
    const radianAngle = (angle[0] * Math.PI) / 180;
    const impactX = activeWorm.position.x + powerFactor * 200 * Math.cos(radianAngle);
    const impactY = activeWorm.position.y - powerFactor * 100 * Math.sin(radianAngle) + 50;

    // Add explosion effect
    setExplosions((prev) => [
      ...prev,
      {
        x: impactX,
        y: impactY,
        radius: weapon.radius,
        timestamp: Date.now(),
      },
    ]);

    // Calculate damage to worms
    let totalDamage = 0;
    let wormsHit = 0;

    setWorms((prev) =>
      prev.map((worm) => {
        const distance = Math.sqrt(
          Math.pow(worm.position.x - impactX, 2) + Math.pow(worm.position.y - impactY, 2)
        );

        if (distance <= weapon.radius && worm.health > 0) {
          const damageFactor = 1 - distance / weapon.radius;
          const damage =
            Math.floor(weapon.damage * damageFactor) + Math.floor(Math.random() * 20) - 10;
          const finalDamage = Math.max(0, Math.min(damage, worm.health));

          totalDamage += finalDamage;
          wormsHit++;

          const newHealth = worm.health - finalDamage;

          // Award GAiA if enemy worm is defeated
          if (newHealth <= 0 && worm.team === "enemy") {
            setGaiaEarned((prev) => prev + worm.gaiaValue);

            toast.success(`🏆 Worm Defeated!`, {
              description: `${worm.name} destroyed! Earned ${worm.gaiaValue} GAiA tokens!`,
              duration: 4000,
            });
          }

          return { ...worm, health: newHealth };
        }

        return worm;
      })
    );

    if (wormsHit > 0) {
      toast.success(`💥 Direct Hit!`, {
        description: `${weapon.name} hit ${wormsHit} worm${wormsHit > 1 ? "s" : ""} for ${totalDamage} total damage!`,
        duration: 3000,
      });
    } else {
      toast.info("🎯 Miss!", {
        description: "No worms in blast radius",
        duration: 2000,
      });
    }

    // Check win conditions
    setTimeout(() => {
      const playerWorms = worms.filter((w) => w.team === "player" && w.health > 0);
      const enemyWorms = worms.filter((w) => w.team === "enemy" && w.health > 0);

      if (enemyWorms.length === 0) {
        setGameState("finished");
        toast.success("🎉 Victory!", {
          description: `All enemy worms defeated! Total GAiA earned: ${gaiaEarned}`,
          duration: 6000,
        });
      } else if (playerWorms.length === 0) {
        setGameState("finished");
        toast.error("💀 Defeat!", {
          description: "All your worms have been defeated!",
          duration: 6000,
        });
      }
    }, 500);

    switchTurn();
  };

  const getWormsByTeam = (team: "player" | "enemy") => {
    return worms.filter((w) => w.team === team && w.health > 0);
  };

  const pauseGame = () => {
    setGameState(gameState === "playing" ? "paused" : "playing");
  };

  return (
    <Card className="bg-gradient-to-br from-brown-900/30 to-yellow-900/30 border-2 border-yellow-500/50">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center gap-2 text-2xl">
          <Target className="h-8 w-8" />
          🐛 WORMS BATTLEFIELD - Strategic Combat Arena
        </CardTitle>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <p className="text-muted-foreground">
            Advanced artillery combat with GAiA token rewards • Wind effects • Multiple weapons
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-400 font-bold">
                Wind: {windStrength > 0 ? "+" : ""}
                {windStrength}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-yellow-400" />
              <span className="text-yellow-400 font-bold">Round: {roundNumber}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-green-400" />
              <span className="text-green-400 font-bold">GAiA: {gaiaEarned.toFixed(1)}</span>
            </div>
            {gameState === "playing" && (
              <div className="flex items-center gap-2">
                <Badge className={currentPlayer === "player" ? "bg-green-600" : "bg-red-600"}>
                  {currentPlayer === "player" ? "YOUR TURN" : "ENEMY TURN"}
                </Badge>
                <span className="text-yellow-400 font-bold">{turnTimer}s</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Game Canvas */}
        <div className="relative bg-gradient-to-b from-sky-400/20 to-green-600/20 border-2 border-yellow-500/30 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full h-80 cursor-crosshair"
            onClick={(e) => {
              if (gameState === "playing" && currentPlayer === "player") {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) * (800 / rect.width);
                const y = (e.clientY - rect.top) * (400 / rect.height);

                // Quick fire at clicked location
                fireWeapon();
              }
            }}
          />

          {/* Game Overlay */}
          {gameState === "waiting" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">🐛</div>
                <div className="text-2xl font-bold text-yellow-400 mb-4">WORMS BATTLE ARENA</div>
                <div className="text-lg text-muted-foreground mb-6">
                  Strategic artillery combat with environmental physics
                </div>
                <Button
                  onClick={startGame}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-xl px-8 py-4"
                >
                  <Target className="h-6 w-6 mr-2" />
                  🚀 START BATTLE
                </Button>
              </div>
            </div>
          )}

          {gameState === "paused" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-4">⏸️ GAME PAUSED</div>
                <Button onClick={pauseGame} className="bg-green-600 hover:bg-green-700">
                  Resume Battle
                </Button>
              </div>
            </div>
          )}

          {gameState === "finished" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              <div className="text-center space-y-4">
                <div className="text-6xl mb-4">
                  {getWormsByTeam("player").length > 0 ? "🏆" : "💀"}
                </div>
                <div className="text-3xl font-bold text-yellow-400">
                  {getWormsByTeam("player").length > 0 ? "VICTORY!" : "DEFEAT!"}
                </div>
                <div className="text-xl text-green-400">
                  GAiA Tokens Earned: {gaiaEarned.toFixed(1)}
                </div>
                <Button
                  onClick={startGame}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  New Battle
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Control Panel */}
        {gameState === "playing" && currentPlayer === "player" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weapon Selection */}
            <Card className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <Bomb className="h-5 w-5" />
                  🔫 Arsenal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {weapons.map((weapon) => (
                    <Button
                      key={weapon.id}
                      onClick={() => setSelectedWeapon(weapon.id)}
                      variant={selectedWeapon === weapon.id ? "default" : "outline"}
                      className={`flex flex-col gap-1 h-20 text-xs ${
                        selectedWeapon === weapon.id
                          ? "bg-gradient-to-r from-red-600 to-orange-600"
                          : "border-red-500/30"
                      }`}
                      title={weapon.description}
                    >
                      {weapon.icon}
                      <div>{weapon.name}</div>
                      <div className="text-red-400">{weapon.damage} DMG</div>
                      {weapon.cost > 0 && <div className="text-yellow-400">{weapon.cost} 💰</div>}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Firing Controls */}
            <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  🎯 Targeting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-blue-300 mb-2 block">Power: {power[0]}%</label>
                  <Slider
                    value={power}
                    onValueChange={setPower}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-blue-300 mb-2 block">Angle: {angle[0]}°</label>
                  <Slider
                    value={angle}
                    onValueChange={setAngle}
                    max={90}
                    step={1}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={fireWeapon}
                  className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-lg py-3"
                >
                  <Crosshair className="h-5 w-5 mr-2" />
                  🎯 FIRE WEAPON
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Game Controls */}
        {gameState !== "waiting" && (
          <div className="flex justify-center gap-4">
            <Button
              onClick={pauseGame}
              variant="outline"
              className="border-yellow-500/30 text-yellow-400"
            >
              {gameState === "paused" ? "Resume" : "Pause"} Game
            </Button>
            <Button
              onClick={() => setGameState("waiting")}
              variant="outline"
              className="border-red-500/30 text-red-400"
            >
              End Battle
            </Button>
          </div>
        )}

        {/* Worm Status Display */}
        {gameState !== "waiting" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                🐛 Your Worms
              </h4>
              {getWormsByTeam("player").map((worm) => (
                <div
                  key={worm.id}
                  className="mb-2 p-2 bg-green-900/20 rounded border border-green-500/20"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-green-400 font-semibold">{worm.name}</span>
                    <span className="text-yellow-400">{worm.gaiaValue} GAiA</span>
                    {worm.isActive && <Badge className="bg-green-600 text-xs">ACTIVE</Badge>}
                  </div>
                  <Progress value={(worm.health / worm.maxHealth) * 100} className="h-3" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {worm.health}/{worm.maxHealth} HP
                  </div>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                💀 Enemy Worms
              </h4>
              {getWormsByTeam("enemy").map((worm) => (
                <div
                  key={worm.id}
                  className="mb-2 p-2 bg-red-900/20 rounded border border-red-500/20"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-red-400 font-semibold">{worm.name}</span>
                    <span className="text-yellow-400">{worm.gaiaValue} GAiA</span>
                    {worm.isActive && <Badge className="bg-red-600 text-xs">ACTIVE</Badge>}
                  </div>
                  <Progress value={(worm.health / worm.maxHealth) * 100} className="h-3" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {worm.health}/{worm.maxHealth} HP
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Battle Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-green-900/30 rounded border border-green-500/20">
            <div className="text-lg font-bold text-green-400">
              {getWormsByTeam("player").length}
            </div>
            <div className="text-xs text-green-300">Your Worms</div>
          </div>
          <div className="p-3 bg-red-900/30 rounded border border-red-500/20">
            <div className="text-lg font-bold text-red-400">{getWormsByTeam("enemy").length}</div>
            <div className="text-xs text-red-300">Enemy Worms</div>
          </div>
          <div className="p-3 bg-yellow-900/30 rounded border border-yellow-500/20">
            <div className="text-lg font-bold text-yellow-400">{gaiaEarned.toFixed(1)}</div>
            <div className="text-xs text-yellow-300">GAiA Earned</div>
          </div>
          <div className="p-3 bg-blue-900/30 rounded border border-blue-500/20">
            <div className="text-lg font-bold text-blue-400">{roundNumber}</div>
            <div className="text-xs text-blue-300">Round Number</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center text-sm text-muted-foreground bg-black/30 rounded-lg p-4">
          <h4 className="font-bold text-yellow-400 mb-2">🎮 How to Play</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div>• Use Power and Angle sliders to aim your shots</div>
            <div>• Wind affects projectile trajectory</div>
            <div>• Click anywhere on battlefield for quick targeting</div>
            <div>• Different weapons have unique damage and blast radius</div>
            <div>• Defeat enemy worms to earn GAiA tokens</div>
            <div>• Strategic positioning and weapon choice is key</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
