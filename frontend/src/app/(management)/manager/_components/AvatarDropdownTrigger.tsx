import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = React.ComponentPropsWithoutRef<typeof Button> & {
  initials: string;
};

const AvatarDropdownTrigger = React.forwardRef<HTMLButtonElement, Props>(
  ({ initials, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size="icon"
        variant="ghost"
        aria-label="Open account menu"
        className={cn(
          "relative h-9 w-9 rounded-full p-0 ring-2 ring-transparent hover:ring-sky-400/60 transition-all duration-200",
          className,
        )}
        {...props}
      >
        <span className="flex h-full w-full items-center justify-center rounded-full bg-linear-to-br from-sky-400 to-blue-600 text-[11px] font-bold text-white tracking-wide shadow-inner">
          {initials}
        </span>
        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-slate-900 bg-emerald-400" />
      </Button>
    );
  },
);

AvatarDropdownTrigger.displayName = "AvatarDropdownTrigger";

export default AvatarDropdownTrigger;
