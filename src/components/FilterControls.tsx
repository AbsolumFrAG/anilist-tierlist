import { FC } from "react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";

const animeFormats = [
  "TV",
  "TV_SHORT",
  "MOVIE",
  "SPECIAL",
  "OVA",
  "ONA",
  "MUSIC",
] as const;

export type AnimeFormat = (typeof animeFormats)[number];

interface FilterControlsProps {
  includeAdult: boolean;
  onIncludeAdultChange: (include: boolean) => void;
  selectedFormat: AnimeFormat | "ALL";
  onFormatChange: (format: AnimeFormat | "ALL") => void;
}

export const FilterControls: FC<FilterControlsProps> = ({
  includeAdult,
  onIncludeAdultChange,
  selectedFormat,
  onFormatChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Filters
      </h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="include-adult"
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Include adult content
          </Label>
          <Switch
            id="include-adult"
            checked={includeAdult}
            onCheckedChange={onIncludeAdultChange}
          />
        </div>
        <div>
          <Label
            htmlFor="format-select"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
          >
            Format
          </Label>
          <Select value={selectedFormat} onValueChange={onFormatChange}>
            <SelectTrigger id="format-select" className="w-full">
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All formats</SelectItem>
              {animeFormats.map((format) => (
                <SelectItem key={format} value={format}>
                  {format.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
