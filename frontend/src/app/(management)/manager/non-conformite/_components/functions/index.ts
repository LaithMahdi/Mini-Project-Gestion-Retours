export const getGraviteMeta = (gravite: string) => {
  const metaMap: Record<
    string,
    {
      label: string;
      className: string;
      bgColor: string;
      borderColor: string;
    }
  > = {
    FAIBLE: {
      label: "Faible",
      className:
        "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      bgColor: "bg-emerald-100",
      borderColor: "border-emerald-300",
    },
    MOYENNE: {
      label: "Moyenne",
      className:
        "bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
      bgColor: "bg-yellow-100",
      borderColor: "border-yellow-300",
    },
    ELEVEE: {
      label: "Élevée",
      className:
        "bg-orange-50 dark:bg-orange-950/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800",
      bgColor: "bg-orange-100",
      borderColor: "border-orange-300",
    },
    CRITIQUE: {
      label: "Critique",
      className:
        "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800",
      bgColor: "bg-rose-100",
      borderColor: "border-rose-300",
    },
  };

  return (
    metaMap[gravite] || {
      label: gravite,
      className:
        "bg-slate-50 dark:bg-slate-950/30 text-slate-700 dark:text-slate-400",
      bgColor: "bg-slate-100",
      borderColor: "border-slate-300",
    }
  );
};
