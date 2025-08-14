import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ActionParameters {
  inputField: string;
  sliderValue: number;
  enableFeature: boolean;
  optionA: boolean;
  optionB: boolean;
  selectedDate: Date | undefined;
}

interface ActionHistoryItem {
  id: string;
  timestamp: Date;
  parameters: ActionParameters;
  status: "success" | "error";
  result?: string;
  error?: string;
}

interface PrecisionControlProps {
  actionName?: string;
  actionId?: string;
}

export function PrecisionControl({ actionName, actionId }: PrecisionControlProps) {
  const [inputField, setInputField] = useState("");
  const [sliderValue, setSliderValue] = useState([50]);
  const [enableFeature, setEnableFeature] = useState(false);
  const [optionA, setOptionA] = useState(false);
  const [optionB, setOptionB] = useState(false);
  const [actionHistory, setActionHistory] = useState<ActionHistoryItem[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<Date>();

  const executeAction = useCallback(
    async (parameters: ActionParameters) => {
      const actionIdToUse = actionId || Date.now().toString();

      setActionHistory((prev) => [
        ...prev,
        {
          id: actionIdToUse,
          timestamp: new Date(),
          parameters,
          status: "success" as const,
          result: `Action executed successfully${actionName ? ` for ${actionName}` : ""}`,
        },
      ]);

      try {
        // Simulate action execution
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setActionHistory((prev) =>
          prev.map((action) =>
            action.id === actionIdToUse
              ? {
                  ...action,
                  status: "success" as const,
                  result: "Action completed",
                }
              : action
          )
        );
      } catch (error) {
        setActionHistory((prev) =>
          prev.map((action) =>
            action.id === actionIdToUse
              ? {
                  ...action,
                  status: "error" as const,
                  error: error instanceof Error ? error.message : "Unknown error",
                }
              : action
          )
        );
      }
    },
    [actionName, actionId]
  );

  const handleSubmit = () => {
    const parameters: ActionParameters = {
      inputField,
      sliderValue: sliderValue[0],
      enableFeature,
      optionA,
      optionB,
      selectedDate,
    };
    executeAction(parameters);
  };

  const handleOptionAChange = (checked: boolean | "indeterminate") => {
    setOptionA(checked === true);
  };

  const handleOptionBChange = (checked: boolean | "indeterminate") => {
    setOptionB(checked === true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          Precision Control Panel
          {actionName && <span className="text-sm text-muted-foreground ml-2">({actionName})</span>}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="input">Input Field</Label>
          <Input id="input" value={inputField} onChange={(e) => setInputField(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="slider">Slider Value</Label>
          <Slider
            id="slider"
            defaultValue={sliderValue}
            max={100}
            step={1}
            onValueChange={setSliderValue}
          />
          <p>Value: {sliderValue[0]}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="enable" checked={enableFeature} onCheckedChange={setEnableFeature} />
          <Label htmlFor="enable">Enable Feature</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="optionA" checked={optionA} onCheckedChange={handleOptionAChange} />
          <Label htmlFor="optionA">Option A</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="optionB" checked={optionB} onCheckedChange={handleOptionBChange} />
          <Label htmlFor="optionB">Option B</Label>
        </div>
        <div className="grid gap-2">
          <Label>Selected Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button onClick={handleSubmit}>Execute Action</Button>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Action History</h3>
          <Table>
            <TableCaption>A history of executed actions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Timestamp</TableHead>
                <TableHead>Parameters</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {actionHistory.map((action) => (
                <TableRow key={action.id}>
                  <TableCell>{action.timestamp.toLocaleTimeString()}</TableCell>
                  <TableCell>
                    <ul className="list-disc pl-5">
                      <li>Input: {action.parameters.inputField}</li>
                      <li>Slider: {action.parameters.sliderValue}</li>
                      <li>Enable: {action.parameters.enableFeature ? "Yes" : "No"}</li>
                      <li>Option A: {action.parameters.optionA ? "Yes" : "No"}</li>
                      <li>Option B: {action.parameters.optionB ? "Yes" : "No"}</li>
                      <li>Date: {action.parameters.selectedDate?.toLocaleDateString() || "N/A"}</li>
                    </ul>
                  </TableCell>
                  <TableCell>{action.status}</TableCell>
                  <TableCell>{action.result || action.error}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
