import { FC } from "react";

interface ColorPickerProps {
  color: string;
  onChange: (newColor: string) => void;
}

export const ColorPicker: FC<ColorPickerProps> = ({ color, onChange }) => {
  return (
    <input
      type="color"
      value={color}
      onChange={(e) => onChange(e.target.value)}
      className="w-6 h-6 border-none cursor-pointer"
    />
  );
};
