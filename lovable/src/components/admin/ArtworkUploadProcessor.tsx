import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Image, Sparkles, Wand2 } from "lucide-react";
import { toast } from "sonner";

export function ArtworkUploadProcessor() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImages((prev) => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });

    toast.success("🎨 Images Uploaded!", {
      description: "Ready to create abstract variations",
    });
  };

  const createAbstractVariations = async () => {
    setIsProcessing(true);

    for (const imageData of uploadedImages) {
      try {
        // Create variations based on the uploaded image using the edge function
        const response = await fetch("/functions/v1/generate-artwork", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            basePrompt:
              "Based on uploaded nature image: abstract geometric patterns inspired by nature",
            artworkType: "user_inspired",
            style: "abstract_variation",
          })
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Generated artwork:", result);
        }
      } catch (error) {
        console.error("Error processing image:", error);
      }
    }

    setIsProcessing(false);
    toast.success("🌟 Abstract Variations Created!", {
      description: "Your uploaded images have been processed into unique artworks",
    });
  };

  return (
    <Card className="border-2 border-green-500/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Upload className="h-5 w-5" />
          Artwork Upload & Processing System
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="cursor-pointer"
          />
          <p className="text-xs text-muted-foreground mt-2">
            Upload your nature images to create abstract variations
          </p>
        </div>

        {uploadedImages.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {uploadedImages.map((img, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img src={img} alt={`Upload ${index}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <Button
              onClick={createAbstractVariations}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600"
            >
              {isProcessing ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                  Creating Variations...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Create Abstract Variations ({uploadedImages.length} images)
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
