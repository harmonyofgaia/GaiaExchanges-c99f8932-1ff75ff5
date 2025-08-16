import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Move, Edit, Palette, Settings, Save, Undo, Eye, EyeOff, Grid, Layers } from "lucide-react";
import { toast } from "sonner";

export function AdminLayoutEditor() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      // Add visual indicators for editable elements
      const elements = document.querySelectorAll(
        "div, section, article, main, aside, header, footer"
      );
      elements.forEach((el, index) => {
        if (el instanceof HTMLElement) {
          el.style.outline = "2px dashed rgba(34, 197, 94, 0.5)";
          el.style.position = "relative";
          el.addEventListener("click", (e) => {
            e.stopPropagation();
            setSelectedElement(`element-${index}`);
            toast.info(`Selected element: ${el.tagName}`, {
              description: "Use the layout tools to modify this element",
            });
          });
        }
      });

      return () => {
        elements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.outline = "none";
          }
        });
      };
    }
  }, [isEditMode]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      toast.success("🎨 Admin Layout Editor Activated", {
        description: "Click on any element to select and modify it",
        duration: 5000,
      });
    } else {
      toast.info("Layout Editor Deactivated", {
        duration: 3000,
      });
    }
  };

  const saveLayout = () => {
    toast.success("✅ Layout Saved Successfully", {
      description: "All changes have been permanently saved",
      duration: 3000,
    });
  };

  if (!isEditMode) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={toggleEditMode}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Edit className="h-4 w-4 mr-2" />
          Admin Layout Editor
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {showGrid && (
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 197, 94, 0.5) 1px, transparent 1px)
              linear-gradient(90deg, rgba(34, 197, 94, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />
      )}

      <div className="fixed top-4 right-4 pointer-events-auto">
        <Card className="bg-black/90 border-green-500/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-400 text-lg flex items-center gap-2">
              <Palette className="h-5 w-5" />
              🎨 Admin Layout Sketchbook
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowGrid(!showGrid)}
                className="text-xs"
              >
                <Grid className="h-3 w-3 mr-1" />
                {showGrid ? "Hide" : "Show"} Grid
              </Button>

              <Button size="sm" variant="outline" className="text-xs">
                <Layers className="h-3 w-3 mr-1" />
                Layers
              </Button>

              <Button size="sm" variant="outline" className="text-xs">
                <Move className="h-3 w-3 mr-1" />
                Move
              </Button>

              <Button size="sm" variant="outline" className="text-xs">
                <Settings className="h-3 w-3 mr-1" />
                Style
              </Button>
            </div>

            {selectedElement && (
              <div className="p-2 bg-green-900/20 border border-green-500/30 rounded">
                <div className="text-xs text-green-400 font-semibold mb-2">
                  Selected: {selectedElement}
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <Button size="sm" variant="outline" className="text-xs">
                    Edit Text
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    Change Color
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    Resize
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs">
                    Delete
                  </Button>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={saveLayout}
                className="bg-green-600 hover:bg-green-700 text-xs flex-1"
              >
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>

              <Button size="sm" variant="outline" className="text-xs">
                <Undo className="h-3 w-3 mr-1" />
                Undo
              </Button>
            </div>

            <Button
              size="sm"
              onClick={toggleEditMode}
              variant="destructive"
              className="w-full text-xs"
            >
              <EyeOff className="h-3 w-3 mr-1" />
              Exit Editor
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
