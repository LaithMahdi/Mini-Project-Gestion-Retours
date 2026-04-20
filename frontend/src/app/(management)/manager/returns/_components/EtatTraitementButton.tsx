"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckmarkCircle02Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RETURNS_ENDPOINT, RETURNS_KEY } from "@/config";
import { ETAT_TRAITEMENT_OPTIONS } from "@/constants";
import apiClient from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { getEtatTraitementMeta } from "./functions";

type Props = {
  id: number;
  etatTraitement: string;
};

export default function EtatTraitementButton({ id, etatTraitement }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(etatTraitement);
  const queryClient = useQueryClient();

  useEffect(() => {
    setSelectedValue(etatTraitement);
  }, [etatTraitement]);

  const options = useMemo(
    () => ETAT_TRAITEMENT_OPTIONS.filter((option) => option.value !== "ALL"),
    [],
  );

  const mutation = useMutation({
    mutationFn: async (value: string) => {
      await apiClient.patch(`${RETURNS_ENDPOINT}/patch/${id}`, {
        etatTraitement: value,
      });
    },
    onSuccess: (_, value) => {
      queryClient.invalidateQueries({ queryKey: [RETURNS_KEY, id] });
      const nextMeta = getEtatTraitementMeta(value);

      toast.success(`Etat mis a jour: ${nextMeta.label}`);
    },
    onError: () => {
      setSelectedValue(etatTraitement);
      toast.error("Echec de mise a jour de l'etat.");
    },
  });

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    mutation.mutate(value);
    setOpen(false);
  };

  const currentMeta = getEtatTraitementMeta(selectedValue);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={mutation.isPending}
          className={cn(
            "h-8 rounded-full border px-2.5 py-1 text-xs font-medium",
            currentMeta.className,
          )}
        >
          <HugeiconsIcon icon={CheckmarkCircle02Icon} className="size-3.5" />
          {currentMeta.label}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 border border-sky-500/30 bg-white dark:bg-slate-900 p-1.5">
        <div className="space-y-1">
          {options.map((option) => {
            const optionMeta = getEtatTraitementMeta(option.value);
            const isSelected = selectedValue === option.value;

            return (
              <button
                key={option.value}
                type="button"
                disabled={mutation.isPending}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "w-full flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-colors",
                  optionMeta.className,
                  "hover:brightness-110 disabled:opacity-60",
                )}
              >
                <span className="truncate">{option.label}</span>
                {isSelected && (
                  <HugeiconsIcon icon={Tick02Icon} className="ml-auto size-4" />
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
