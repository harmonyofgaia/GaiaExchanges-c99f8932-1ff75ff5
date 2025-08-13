import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useEarningActivities } from "@/hooks/useEarningSystem";
import { BookOpen, Users } from "lucide-react";

export function EnvironmentalEducationActions() {
  const [educationType, setEducationType] = useState("");
  const [topic, setTopic] = useState("");
  const [duration, setDuration] = useState("");
  const [participants, setParticipants] = useState("");
  const { recordEnvironmentalEducation, loading } =
    useEarningActivities("user-123");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!educationType || !topic || !duration) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await recordEnvironmentalEducation({
        type: educationType,
        topic,
        duration: parseInt(duration),
        participants: parseInt(participants) || 1,
        certificateEarned: true,
        contentShared: true,
        impactReported: true,
      });

      toast.success(
        "Environmental education activity recorded! +15 points earned",
      );
      setEducationType("");
      setTopic("");
      setDuration("");
      setParticipants("");
    } catch (error) {
      toast.error("Failed to record education activity");
    }
  };

  return (
    <Card className="border-blue-500/30 bg-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <BookOpen className="h-5 w-5" />
          📚 Environmental Education
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Education Type
            </label>
            <Select value={educationType} onValueChange={setEducationType}>
              <SelectTrigger>
                <SelectValue placeholder="Select education type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="course_completion">
                  Course Completion
                </SelectItem>
                <SelectItem value="teaching">Teaching/Mentoring</SelectItem>
                <SelectItem value="content_creation">
                  Content Creation
                </SelectItem>
                <SelectItem value="workshop_attendance">
                  Workshop Attendance
                </SelectItem>
                <SelectItem value="research">Research Project</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Topic</label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Climate change, renewable energy, biodiversity..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Duration (hours)
            </label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Hours spent"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Participants (optional)
            </label>
            <Input
              type="number"
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              placeholder="Number of people reached"
              min="1"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading
              ? "Recording..."
              : "📚 Record Education Activity (+15 Points)"}
          </Button>
        </form>

        <div className="mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
          <p className="text-sm text-blue-300">
            💡 <strong>Bonus:</strong> Teaching others or creating educational
            content earns extra tokens!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
