import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ETAT_TRAITEMENT_OPTIONS } from "@/constants";
import ReturnsButton from "./ReturnsButton";

type Props = {
  searchBy: "client" | "produit";
  search: string;
  etatTraitement: string;
  onSearchByChange: (value: "client" | "produit") => void;
  onSearchChange: (value: string) => void;
  onEtatTraitementChange: (value: string) => void;
};

const ReturnsFilter = (props: Props) => {
  const {
    searchBy,
    search,
    etatTraitement,
    onSearchByChange,
    onSearchChange,
    onEtatTraitementChange,
  } = props;
  return (
    <div className="w-full flex flex-col md:flex-row md:items-center gap-3">
      <div className="relative flex items-center flex-1 md:max-w-xl">
        <div className="absolute left-2 z-10 flex items-center bg-slate-100 dark:bg-slate-800 rounded-full p-0.5 border border-sky-500/20">
          <ReturnsButton
            label="Client"
            isSelected={searchBy === "client"}
            onClick={() => onSearchByChange("client")}
          />
          <ReturnsButton
            label="Product"
            isSelected={searchBy === "produit"}
            onClick={() => onSearchByChange("produit")}
          />
        </div>

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={
            searchBy === "client"
              ? "Rechercher par nom client..."
              : "Rechercher par produit..."
          }
          className="w-full pl-36 pr-4 h-10 rounded-full bg-white dark:bg-slate-900 border border-sky-500/30 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-1 focus-visible:ring-sky-500 focus-visible:border-sky-500 transition-colors"
        />
      </div>

      <Select value={etatTraitement} onValueChange={onEtatTraitementChange}>
        <SelectTrigger className="w-full md:w-72 h-10 py-5 rounded-full bg-white dark:bg-slate-900 border border-sky-500/30 text-slate-800 dark:text-slate-100">
          <SelectValue placeholder="Filtrer par état" />
        </SelectTrigger>
        <SelectContent className="bg-white dark:bg-slate-900 border border-sky-500/30 text-slate-800 dark:text-slate-100">
          {ETAT_TRAITEMENT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ReturnsFilter;
