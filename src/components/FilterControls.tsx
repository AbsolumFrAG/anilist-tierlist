import { FC } from "react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

interface FilterControlsProps {
  includeAdult: boolean;
  onIncludeAdultChange: (include: boolean) => void;
}

export const FilterControls: FC<FilterControlsProps> = ({
  includeAdult,
  onIncludeAdultChange,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Filters</h2>
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
    </div>
  );
};
