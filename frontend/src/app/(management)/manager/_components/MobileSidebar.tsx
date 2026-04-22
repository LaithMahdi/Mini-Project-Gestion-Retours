"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { DashboardSquare03Icon } from "@hugeicons/core-free-icons";

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const pathname = usePathname();

  const effectivelyOpen = isOpen && openForPath === pathname;

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) setOpenForPath(pathname);
  };

  return (
    <Sheet modal={false} open={effectivelyOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className="lg:hidden bg-white dark:bg-slate-800 border-sky-500/30 hover:bg-sky-50 dark:hover:bg-slate-700 hover:border-sky-500"
        >
          <HugeiconsIcon
            icon={DashboardSquare03Icon}
            size={20}
            className="text-sky-400"
          />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
