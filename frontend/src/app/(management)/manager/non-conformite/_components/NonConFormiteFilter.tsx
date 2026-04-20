import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GRAVITE_FORM_OPTIONS } from "./schema";

type Props = {
  search: string;
  gravity: string;
  onSearchChange: (value: string) => void;
  onGravityChange: (value: string) => void;
};

const NonConFormiteFilter = (props: Props) => {
  const { search, gravity, onSearchChange, onGravityChange } = props;
  const data = [
    { value: "ALL", label: "Toutes les gravités" },
    ...GRAVITE_FORM_OPTIONS,
  ];

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center gap-3">
      <div className="relative flex items-center flex-1 md:max-w-xl">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par produit..."
          className="w-full pl-6 pr-4 h-10 rounded-full bg-white dark:bg-slate-900 border border-sky-500/30 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-sky-500 focus-visible:border-sky-500 transition-colors"
        />
      </div>

      <Select value={gravity} onValueChange={onGravityChange}>
        <SelectTrigger className="w-full md:w-72 h-10 py-5 rounded-full bg-white dark:bg-slate-900 border border-sky-500/30 text-slate-800 dark:text-slate-100">
          <SelectValue placeholder="Filtrer par gravité" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-slate-900 border border-sky-500/30 text-slate-800 dark:text-slate-100">
          {data.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default NonConFormiteFilter;
