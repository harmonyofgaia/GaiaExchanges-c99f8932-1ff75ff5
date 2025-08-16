import * as React from "react";
import { cn } from "@/lib/utils";
import { sanitizeInput } from "@/utils/inputSanitization";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  sanitize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, sanitize = false, onChange, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (sanitize && onChange) {
        const sanitized = sanitizeInput(e.target.value);
        const syntheticEvent = {
          ...e,
          target: { ...e.target, value: sanitized }
        } as React.ChangeEvent<HTMLTextAreaElement>;
        onChange(syntheticEvent);
      } else if (onChange) {
        onChange(e);
      }
    };

    return (
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };