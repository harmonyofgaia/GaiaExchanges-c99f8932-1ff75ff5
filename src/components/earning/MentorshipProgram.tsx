import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GraduationCap,
  Users,
  Star,
  MessageCircle,
  Calendar,
  Trophy,
  BookOpen,
  Target,
  Heart,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface Mentor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  totalSessions: number;
  avatar: string;
  skills: string[];
}

interface Session {
  id: string;
  topic: string;
  mentorName: string;
  date: string;
  time: string;
  duration: string;
  status: "upcoming" | "completed" | "cancelled";
}

export function MentorshipProgram() {
  const [userRole, setUserRole] = useState<"student" | "mentor" | "both">("student");
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"browse" | "sessions" | "progress">("browse");

  const handleRoleSwitch = (role: "student" | "mentor" | "both") => {
    setUserRole(role);
    toast.success(`🎓 Role switched to ${role}`, {
      description: `You're now viewing as ${role}`,
      duration: 3000,
    });
  };

  const handleMentorSelect = (mentorId: string) => {
    setSelectedMentor(mentorId);
    toast.success("🎯 Mentor selected!", {
      description: "You can now book sessions with this mentor",
      duration: 3000,
    });
  };

  const handleBookSession = (mentorId: string) => {
    toast.success("📅 Session booked!", {
      description: "Your mentorship session has been scheduled",
      duration: 3000,
    });
  };

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <GraduationCap className="h-6 w-6" />
          🎓 GAIA Mentorship Program
        </CardTitle>
        <div className="flex gap-2">
          {(["student", "mentor", "both"] as const).map((role) => (
            <Button
              key={role}
              onClick={() => handleRoleSwitch(role)}
              variant={userRole === role ? "default" : "outline"}
              size="sm"
              className={userRole === role ? "bg-purple-600" : ""}
            >
              {role === "student" ? "🎓" : role === "mentor" ? "👨‍🏫" : "🤝"} {role.toUpperCase()}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30 text-center">
            <div className="text-2xl font-bold text-purple-400">247</div>
            <div className="text-sm text-purple-300">Active Mentors</div>
          </div>
          <div className="bg-pink-900/30 p-4 rounded-lg border border-pink-500/30 text-center">
            <div className="text-2xl font-bold text-pink-400">892</div>
            <div className="text-sm text-pink-300">Students</div>
          </div>
          <div className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30 text-center">
            <div className="text-2xl font-bold text-blue-400">1,547</div>
            <div className="text-sm text-blue-300">Sessions Completed</div>
          </div>
          <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30 text-center">
            <div className="text-2xl font-bold text-green-400">4.9/5</div>
            <div className="text-sm text-green-300">Average Rating</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2">
          {(
            [
              { key: "browse", label: "👥 Browse Mentors", icon: Users },
              { key: "sessions", label: "📅 My Sessions", icon: Calendar },
              { key: "progress", label: "📊 Progress Tracking", icon: Target },
            ] as const
          ).map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              onClick={() => setActiveTab(key)}
              variant={activeTab === key ? "default" : "outline"}
              size="sm"
              className={activeTab === key ? "bg-purple-600" : "border-purple-500/30"}
            >
              <Icon className="h-4 w-4 mr-1" />
              {label}
            </Button>
          ))}
        </div>

        {/* Browse Mentors Tab */}
        {activeTab === "browse" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-purple-400">🔍 Find Your Perfect Mentor</h3>

            {/* Mentor Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {mentorCategories.map((category) => (
                <Button
                  key={category.name}
                  variant="outline"
                  size="sm"
                  className="border-purple-500/30 text-purple-400"
                >
                  {category.icon} {category.name}
                </Button>
              ))}
            </div>

            {/* Mentor Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockMentors.map((mentor) => (
                <Card key={mentor.id} className="border-purple-500/30 bg-purple-900/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={mentor.avatar} />
                        <AvatarFallback>{mentor.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold text-purple-400">{mentor.name}</h4>
                        <p className="text-sm text-muted-foreground">{mentor.specialty}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="text-sm">{mentor.rating}/5</span>
                      <span className="text-xs text-muted-foreground">
                        ({mentor.totalSessions} sessions)
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {mentor.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} className="text-xs bg-purple-600/20 text-purple-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleMentorSelect(mentor.id)}
                        size="sm"
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                      >
                        <Heart className="h-3 w-3 mr-1" />
                        Select
                      </Button>
                      <Button
                        onClick={() => handleBookSession(mentor.id)}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-purple-500/30"
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* My Sessions Tab */}
        {activeTab === "sessions" && (userRole === "student" || userRole === "both") && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-purple-400">📅 Your Mentorship Sessions</h3>

            <div className="grid gap-4">
              {mockSessions.map((session) => (
                <Card key={session.id} className="border-blue-500/30 bg-blue-900/10">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-blue-400">{session.topic}</h4>
                        <p className="text-sm text-muted-foreground">
                          with {session.mentorName} • {session.date} at {session.time}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            className={`${
                              session.status === "completed"
                                ? "bg-green-600"
                                : session.status === "upcoming"
                                  ? "bg-blue-600"
                                  : "bg-yellow-600"
                            } text-white`}
                          >
                            {session.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{session.duration}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-3 w-3 mr-1" />
                          Chat
                        </Button>
                        {session.status === "upcoming" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Calendar className="h-3 w-3 mr-1" />
                            Join
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Progress Tracking Tab */}
        {activeTab === "progress" && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-purple-400">📊 Your Learning Journey</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Learning Progress */}
              <Card className="border-green-500/30 bg-green-900/10">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Learning Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { skill: "Sustainability Practices", progress: 85 },
                    { skill: "Community Leadership", progress: 67 },
                    { skill: "Project Management", progress: 45 },
                    { skill: "Green Technology", progress: 73 },
                  ].map((item) => (
                    <div key={item.skill} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-green-300">{item.skill}</span>
                        <span className="text-sm text-green-400">{item.progress}%</span>
                      </div>
                      <Progress value={item.progress} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="border-yellow-500/30 bg-yellow-900/10">
                <CardHeader>
                  <CardTitle className="text-yellow-400 flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Mentorship Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "First Session Complete", earned: true },
                    { name: "10 Sessions Milestone", earned: true },
                    { name: "Skill Mastery", earned: false },
                    { name: "Community Leader", earned: false },
                    { name: "Mentor Graduate", earned: false },
                  ].map((achievement) => (
                    <div key={achievement.name} className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          achievement.earned ? "bg-yellow-400" : "bg-gray-600"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          achievement.earned ? "text-yellow-300" : "text-gray-400"
                        }`}
                      >
                        {achievement.name}
                      </span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Mentor Dashboard (if user is mentor or both) */}
        {(userRole === "mentor" || userRole === "both") && (
          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                👨‍🏫 Mentor Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-orange-900/30 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">12</div>
                  <div className="text-sm text-orange-300">Active Students</div>
                </div>
                <div className="text-center p-4 bg-orange-900/30 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">47</div>
                  <div className="text-sm text-orange-300">Sessions This Month</div>
                </div>
                <div className="text-center p-4 bg-orange-900/30 rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">4.8</div>
                  <div className="text-sm text-orange-300">Average Rating</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Calendar className="h-4 w-4 mr-2" />
                  Manage Schedule
                </Button>
                <Button variant="outline" className="border-orange-500/30 text-orange-400">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Student Messages
                </Button>
                <Button variant="outline" className="border-orange-500/30 text-orange-400">
                  <Zap className="h-4 w-4 mr-2" />
                  Update Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

// Mock data
const mentorCategories = [
  { name: "Sustainability", icon: "🌱" },
  { name: "Technology", icon: "💻" },
  { name: "Leadership", icon: "👑" },
  { name: "Business", icon: "💼" },
];

const mockMentors = [
  {
    id: "1",
    name: "Dr. Sarah Green",
    specialty: "Sustainability Expert",
    rating: 4.9,
    totalSessions: 156,
    avatar: "",
    skills: ["Environmental Science", "Carbon Footprint", "Green Energy", "Waste Management"],
  },
  {
    id: "2",
    name: "Marcus Tech",
    specialty: "Blockchain Developer",
    rating: 4.8,
    totalSessions: 89,
    avatar: "",
    skills: ["Blockchain", "Smart Contracts", "DeFi", "Web3"],
  },
  {
    id: "3",
    name: "Luna Community",
    specialty: "Community Leader",
    rating: 4.9,
    totalSessions: 203,
    avatar: "",
    skills: ["Leadership", "Community Building", "Project Management", "Communication"],
  },
];

const mockSessions = [
  {
    id: "1",
    topic: "Introduction to Sustainable Living",
    mentorName: "Dr. Sarah Green",
    date: "Today",
    time: "2:00 PM",
    duration: "60 min",
    status: "upcoming" as const,
  },
  {
    id: "2",
    topic: "Smart Contract Fundamentals",
    mentorName: "Marcus Tech",
    date: "Yesterday",
    time: "4:00 PM",
    duration: "45 min",
    status: "completed" as const,
  },
  {
    id: "3",
    topic: "Community Project Planning",
    mentorName: "Luna Community",
    date: "Tomorrow",
    time: "10:00 AM",
    duration: "90 min",
    status: "upcoming" as const,
  },
];
