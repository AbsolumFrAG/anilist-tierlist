import { ChangeEvent, FC, useState } from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface ColorPickerProps {
  color: string;
  onChange: (newColor: string) => void;
}

export const ColorPicker: FC<ColorPickerProps> = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-8 h-8 p-0 border-2 dark:border-gray-600"
          style={{ backgroundColor: color }}
        />
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3 bg-white dark:bg-gray-800 border dark:border-gray-700">
        <div className="flex flex-col gap-2">
          <input
            type="color"
            value={color}
            onChange={handleChange}
            className="w-32 h-32 cursor-pointer border-none bg-transparent"
          />
          <input
            type="text"
            value={color}
            onChange={handleChange}
            className="w-full px-2 py-1 text-sm border rounded 
                       bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-gray-100 
                       border-gray-300 dark:border-gray-600
                       focus:border-blue-500 dark:focus:border-blue-400
                       focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};
