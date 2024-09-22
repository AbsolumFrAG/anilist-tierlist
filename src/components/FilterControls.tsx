import { ChevronDownIcon } from "@radix-ui/react-icons";
import { FC, useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
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
  selectedFormats: AnimeFormat[] | "ALL";
  onFormatChange: (formats: AnimeFormat[] | "ALL") => void;
}

export const FilterControls: FC<FilterControlsProps> = ({
  includeAdult,
  onIncludeAdultChange,
  selectedFormats,
  onFormatChange,
}) => {
  const [isFormatMenuOpen, setIsFormatMenuOpen] = useState(false);

  const handleFormatChange = (
    format: AnimeFormat | "ALL",
    isChecked: boolean
  ) => {
    if (format === "ALL") {
      onFormatChange(isChecked ? "ALL" : []);
    } else {
      if (selectedFormats === "ALL") {
        onFormatChange(
          isChecked ? [format] : animeFormats.filter((f) => f !== format)
        );
      } else {
        if (isChecked) {
          onFormatChange([...selectedFormats, format]);
        } else {
          const newFormats = selectedFormats.filter((f) => f !== format);
          onFormatChange(newFormats.length === 0 ? "ALL" : newFormats);
        }
      }
    }
  };

  const isFormatSelected = (format: AnimeFormat | "ALL") => {
    if (selectedFormats === "ALL") return true;
    return selectedFormats.includes(format as AnimeFormat);
  };

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
        <div className="relative">
          <Label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Formats
          </Label>
          <Button
            onClick={() => setIsFormatMenuOpen(!isFormatMenuOpen)}
            className="w-full justify-between"
            variant="outline"
          >
            {selectedFormats === "ALL"
              ? "All Formats"
              : `${selectedFormats.length} selected`}
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
          {isFormatMenuOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
              <div className="p-2 space-y-2">
                <div className="flex items-center">
                  <Checkbox
                    id="format-ALL"
                    checked={selectedFormats === "ALL"}
                    onCheckedChange={(checked) =>
                      handleFormatChange("ALL", checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="format-ALL"
                    className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    All Formats
                  </Label>
                </div>
                {animeFormats.map((format) => (
                  <div key={format} className="flex items-center">
                    <Checkbox
                      id={`format-${format}`}
                      checked={isFormatSelected(format)}
                      onCheckedChange={(checked) =>
                        handleFormatChange(format, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`format-${format}`}
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {format.replace("_", " ")}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
