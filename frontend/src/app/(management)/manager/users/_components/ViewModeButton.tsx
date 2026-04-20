import { HugeiconsIcon } from "@hugeicons/react";
import { ViewMode, viewsModes } from "./schema";

interface Props {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

const ViewModeButton = (props: Props) => {
  const { view, onViewChange } = props;
  return (
    <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
      {viewsModes.map((mode) => {
        const IconComponent = mode.icon;
        const isActive = view === mode.value;
        return (
          <button
            key={mode.value}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              isActive
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
            onClick={() => onViewChange(mode.value)}
            title={mode.label}
          >
            <HugeiconsIcon icon={mode.icon} className="w-4 h-4" />
            <span className="hidden sm:inline">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ViewModeButton;
