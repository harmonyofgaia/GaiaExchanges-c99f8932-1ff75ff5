import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, CheckCircle, Clock, Star } from "lucide-react";
import { toast } from "sonner";

interface PhotoSubmission {
  id: string;
  title: string;
  description: string;
  category: "cleanup" | "planting" | "conservation" | "education";
  status: "pending" | "verified" | "rejected";
  tokensEarned: number;
  submittedDate: Date;
  verifiedDate?: Date;
}

export function PhotoVerificationSystem() {
  const [submissions, setSubmissions] = useState<PhotoSubmission[]>([
    {
      id: "1",
      title: "Beach Cleanup Activity",
      description: "Collected 15kg of plastic waste from the beach",
      category: "cleanup",
      status: "verified",
      tokensEarned: 75,
      submittedDate: new Date("2024-01-20"),
      verifiedDate: new Date("2024-01-21")
    },
    {
      id: "2",
      title: "Community Garden Planting",
      description: "Planted 20 native flowers in community garden",
      category: "planting",
      status: "pending",
      tokensEarned: 0,
      submittedDate: new Date("2024-01-22")
    },
  ]);

  const [uploadCount, setUploadCount] = useState(2);

  const handlePhotoUpload = () => {
    const newSubmission: PhotoSubmission = {
      id: Date.now().toString(),
      title: "New Environmental Activity",
      description: "Awaiting verification...",
      category: "cleanup",
      status: "pending",
      tokensEarned: 0,
      submittedDate: new Date()
    };
    setSubmissions((prev) => [newSubmission, ...prev]);
    setUploadCount((prev) => prev + 1);
    toast.success("Photo submitted for verification! You'll earn tokens once verified.");
  };

  const getCategoryColor = (category: PhotoSubmission["category"]) => {
    switch (category) {
      case "cleanup":
        return "bg-blue-600";
      case "planting":
        return "bg-green-600";
      case "conservation":
        return "bg-purple-600";
      case "education":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusIcon = (status: PhotoSubmission["status"]) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case "rejected":
        return <CheckCircle className="h-4 w-4 text-red-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-900/20 to-red-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Camera className="h-6 w-6" />
            📸 Photo Verification System
            <Badge className="bg-orange-600">Phase 1</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400">
                Submit Environmental Activity
              </h3>

              <div className="p-6 border-2 border-dashed border-orange-500/30 rounded-lg text-center space-y-4">
                <Camera className="h-12 w-12 text-orange-400 mx-auto" />
                <div>
                  <h4 className="font-medium text-orange-400 mb-2">Upload Photo Evidence</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Take a photo of your environmental activity to earn GAiA tokens after
                    verification
                  </p>
                </div>
                <Button onClick={handlePhotoUpload} className="bg-orange-600 hover:bg-orange-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo (+50-100 GAiA)
                </Button>
              </div>

              <div className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/20">
                <h4 className="font-medium text-orange-400 mb-2">📋 Verification Guidelines</h4>
                <ul className="text-sm text-orange-200/80 space-y-1">
                  <li>• Photo must clearly show the environmental activity</li>
                  <li>• Include a brief description of your action</li>
                  <li>• Verification typically takes 24-48 hours</li>
                  <li>• Earn 50-100 GAiA tokens per verified activity</li>
                </ul>
              </div>
            </div>

            {/* Submissions History */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-orange-400">Your Submissions</h3>

              <div className="space-y-3">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="p-4 bg-orange-900/20 rounded-lg border border-orange-500/20"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{submission.title}</h4>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(submission.status)}
                        <Badge className={getCategoryColor(submission.category)}>
                          {submission.category}
                        </Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{submission.description}</p>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">
                        {submission.submittedDate.toLocaleDateString()}
                      </span>
                      {submission.status === "verified" && (
                        <span className="text-green-400 font-bold">
                          +{submission.tokensEarned} GAiA
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20 text-center">
                  <div className="text-xl font-bold text-green-400">75</div>
                  <div className="text-xs text-muted-foreground">Tokens Earned</div>
                </div>
                <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20 text-center">
                  <div className="text-xl font-bold text-blue-400">{uploadCount}</div>
                  <div className="text-xs text-muted-foreground">Photos Submitted</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
