import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "../ui/button";
import { PlusSignSquareIcon } from "@hugeicons/core-free-icons";

interface Props {
  title: string;
  totalItems: number;
  buttonName?: string;
  disabled?: boolean;
  onClick: () => void;
}

const PageHeader = (props: Props) => {
  const { title, totalItems, buttonName, disabled, onClick } = props;

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-1 h-10 bg-linear-to-b from-sky-400 to-sky-600 rounded-full" />
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          {title}&nbsp;
          <span className="text-sm font-medium text-sky-600 dark:text-sky-400">
            ({totalItems})
          </span>
        </h1>
      </div>
      <Button
        onClick={onClick}
        className="rounded-md"
        size="lg"
        disabled={disabled}
      >
        <HugeiconsIcon icon={PlusSignSquareIcon} className="size-4" />
        {buttonName || "Ajouter"}
      </Button>
    </div>
  );
};

export default PageHeader;
