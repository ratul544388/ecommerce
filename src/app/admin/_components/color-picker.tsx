import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SketchPicker } from "react-color";

export function ColorPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div role="button" className="border shadow-sm rounded-md text-sm h-9 px-3 flex items-center">
          {value}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-transparent border-none shadow-none">
        <SketchPicker
          className="mx-auto"
          color={value}
          onChangeComplete={(value) => onChange(value.hex)}
        />
      </PopoverContent>
    </Popover>
  );
}
