import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Palette,
  Layout,
  Settings,
  Download,
  Upload,
  Code,
  Eye,
  Save,
  Undo,
  Redo,
} from "lucide-react";

interface TemplateConfig {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    fontFamily: string;
    fontSize: string;
    lineHeight: string;
  };
  layout: {
    header: boolean;
    sidebar: boolean;
    footer: boolean;
    columns: number;
  };
  components: string[];
}

export function WebsiteTemplateSystem() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [templates, setTemplates] = useState<TemplateConfig[]>([
    {
      id: "1",
      name: "Eco Modern",
      description: "Clean and modern design with environmental focus",
      colors: {
        primary: "#10b981",
        secondary: "#065f46",
        accent: "#34d399",
        background: "#ffffff",
        text: "#1f2937",
      },
      typography: {
        fontFamily: "Inter",
        fontSize: "16px",
        lineHeight: "1.6",
      },
      layout: {
        header: true,
        sidebar: false,
        footer: true,
        columns: 1,
      },
      components: ["Header", "Hero", "Features", "Footer"],
    },
    {
      id: "2",
      name: "Nature Dashboard",
      description: "Dashboard layout for environmental data",
      colors: {
        primary: "#059669",
        secondary: "#047857",
        accent: "#10b981",
        background: "#f0fdf4",
        text: "#064e3b",
      },
      typography: {
        fontFamily: "Roboto",
        fontSize: "14px",
        lineHeight: "1.5",
      },
      layout: {
        header: true,
        sidebar: true,
        footer: false,
        columns: 2,
      },
      components: ["Header", "Sidebar", "Dashboard", "Charts"],
    },
  ]);

  const [customTemplate, setCustomTemplate] = useState<TemplateConfig>({
    id: "custom",
    name: "Custom Template",
    description: "Your personalized template",
    colors: {
      primary: "#3b82f6",
      secondary: "#1e40af",
      accent: "#60a5fa",
      background: "#ffffff",
      text: "#1f2937",
    },
    typography: {
      fontFamily: "Inter",
      fontSize: "16px",
      lineHeight: "1.6",
    },
    layout: {
      header: true,
      sidebar: false,
      footer: true,
      columns: 1,
    },
    components: ["Header", "Content", "Footer"],
  });

  const [activeTab, setActiveTab] = useState("templates");

  const handleColorChange = (
    colorType: keyof TemplateConfig["colors"],
    value: string,
  ) => {
    setCustomTemplate((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value,
      },
    }));
  };

  const handleTypographyChange = (
    typoType: keyof TemplateConfig["typography"],
    value: string,
  ) => {
    setCustomTemplate((prev) => ({
      ...prev,
      typography: {
        ...prev.typography,
        [typoType]: value,
      },
    }));
  };

  const handleLayoutChange = (
    layoutType: keyof TemplateConfig["layout"],
    value: boolean | number,
  ) => {
    setCustomTemplate((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        [layoutType]: value,
      },
    }));
  };

  const generateTemplate = () => {
    console.log("🎨 Generating template with config:", customTemplate);
    // Template generation logic would go here
  };

  const exportTemplate = () => {
    const dataStr = JSON.stringify(customTemplate, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${customTemplate.name.replace(/\s+/g, "-").toLowerCase()}-template.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const importTemplate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedTemplate = JSON.parse(e.target?.result as string);
          setCustomTemplate(importedTemplate);
        } catch (error) {
          console.error("Error importing template:", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          🎨 Website Template System
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create, customize, and deploy beautiful website templates for the GAiA
          ecosystem
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="deploy">Deploy</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all ${
                  selectedTemplate === template.id ? "ring-2 ring-blue-500" : ""
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5" />
                    {template.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {template.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Colors:</span>
                      <div className="flex gap-1">
                        {Object.values(template.colors).map((color, index) => (
                          <div
                            key={index}
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {template.components.map((component) => (
                        <Badge
                          key={component}
                          variant="secondary"
                          className="text-xs"
                        >
                          {component}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full mt-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCustomTemplate(template);
                      setActiveTab("customize");
                    }}
                  >
                    Customize This Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customize" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Color Customization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Color Scheme
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(customTemplate.colors).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <label className="text-sm font-medium capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="color"
                        value={value}
                        onChange={(e) =>
                          handleColorChange(
                            key as keyof TemplateConfig["colors"],
                            e.target.value,
                          )
                        }
                        className="w-12 h-8 p-0 border-0"
                      />
                      <Input
                        type="text"
                        value={value}
                        onChange={(e) =>
                          handleColorChange(
                            key as keyof TemplateConfig["colors"],
                            e.target.value,
                          )
                        }
                        className="w-20 text-xs"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Typography Customization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Typography
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Font Family</label>
                  <Input
                    value={customTemplate.typography.fontFamily}
                    onChange={(e) =>
                      handleTypographyChange("fontFamily", e.target.value)
                    }
                    placeholder="Inter, Roboto, Arial"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Font Size</label>
                  <Input
                    value={customTemplate.typography.fontSize}
                    onChange={(e) =>
                      handleTypographyChange("fontSize", e.target.value)
                    }
                    placeholder="16px, 1rem, 14px"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Line Height</label>
                  <Input
                    value={customTemplate.typography.lineHeight}
                    onChange={(e) =>
                      handleTypographyChange("lineHeight", e.target.value)
                    }
                    placeholder="1.5, 1.6, 24px"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Layout Customization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5" />
                  Layout Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Header</label>
                  <input
                    type="checkbox"
                    checked={customTemplate.layout.header}
                    onChange={(e) =>
                      handleLayoutChange("header", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Sidebar</label>
                  <input
                    type="checkbox"
                    checked={customTemplate.layout.sidebar}
                    onChange={(e) =>
                      handleLayoutChange("sidebar", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Footer</label>
                  <input
                    type="checkbox"
                    checked={customTemplate.layout.footer}
                    onChange={(e) =>
                      handleLayoutChange("footer", e.target.checked)
                    }
                    className="w-4 h-4"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Columns</label>
                  <Input
                    type="number"
                    min="1"
                    max="4"
                    value={customTemplate.layout.columns}
                    onChange={(e) =>
                      handleLayoutChange("columns", parseInt(e.target.value))
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Template Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Template Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Template Name</label>
                  <Input
                    value={customTemplate.name}
                    onChange={(e) =>
                      setCustomTemplate((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="My Custom Template"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Input
                    value={customTemplate.description}
                    onChange={(e) =>
                      setCustomTemplate((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="A beautiful custom template"
                  />
                </div>

                <div className="flex gap-2">
                  <Button onClick={exportTemplate} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                    <input
                      type="file"
                      accept=".json"
                      onChange={importTemplate}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Template Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center min-h-96"
                style={{
                  backgroundColor: customTemplate.colors.background,
                  color: customTemplate.colors.text,
                  fontFamily: customTemplate.typography.fontFamily,
                  fontSize: customTemplate.typography.fontSize,
                  lineHeight: customTemplate.typography.lineHeight,
                }}
              >
                {customTemplate.layout.header && (
                  <div
                    className="p-4 mb-4 rounded"
                    style={{ backgroundColor: customTemplate.colors.primary }}
                  >
                    <h1
                      className="text-2xl font-bold"
                      style={{ color: customTemplate.colors.background }}
                    >
                      {customTemplate.name}
                    </h1>
                  </div>
                )}

                <div
                  className={`grid gap-4 ${customTemplate.layout.columns > 1 ? `grid-cols-${customTemplate.layout.columns}` : ""}`}
                >
                  <div
                    className="p-4 rounded"
                    style={{
                      backgroundColor: customTemplate.colors.secondary,
                      color: customTemplate.colors.background,
                    }}
                  >
                    <h2 className="text-xl font-semibold mb-2">Main Content</h2>
                    <p>
                      This is a preview of your custom template with the
                      selected colors and typography.
                    </p>
                  </div>

                  {customTemplate.layout.sidebar && (
                    <div
                      className="p-4 rounded"
                      style={{
                        backgroundColor: customTemplate.colors.accent,
                        color: customTemplate.colors.background,
                      }}
                    >
                      <h3 className="text-lg font-semibold mb-2">Sidebar</h3>
                      <p>Sidebar content goes here.</p>
                    </div>
                  )}
                </div>

                {customTemplate.layout.footer && (
                  <div
                    className="p-4 mt-4 rounded"
                    style={{ backgroundColor: customTemplate.colors.text }}
                  >
                    <p
                      className="text-sm"
                      style={{ color: customTemplate.colors.background }}
                    >
                      Footer content - {customTemplate.description}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deploy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Deploy Template
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <p className="text-muted-foreground mb-6">
                  Ready to deploy your custom template? This will generate the
                  necessary files and configuration.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Template Files</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• HTML Structure</li>
                      <li>• CSS Styles</li>
                      <li>• JavaScript Components</li>
                      <li>• Asset Configuration</li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Deployment Options</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Static Site Generation</li>
                      <li>• CDN Distribution</li>
                      <li>• Custom Domain</li>
                      <li>• SSL Certificate</li>
                    </ul>
                  </div>
                </div>

                <Button
                  onClick={generateTemplate}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
                  size="lg"
                >
                  <Code className="h-5 w-5 mr-2" />
                  Generate & Deploy Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
