import React from "react";

interface SliderProps {
  value: number[];
  max: number;
  step: number;
  className?: string;
  onValueChange: (value: number[]) => void;
}

export const Slider: React.FC<SliderProps> = ({
  value,
  max,
  step,
  className,
  onValueChange,
}) => (
  <input
    type="range"
    min={0}
    max={max}
    step={step}
    value={value[0]}
    className={className}
    onChange={(e) => onValueChange([Number(e.target.value)])}
    style={{ width: "100%" }}
  />
);
