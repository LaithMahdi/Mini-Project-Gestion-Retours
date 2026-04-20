import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roles, ViewMode } from "./schema";
import ViewModeButton from "./ViewModeButton";

interface Props {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  role: string;
  onRoleChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
}

const UserFilter = (props: Props) => {
  const { view, setView, search, onSearchChange, role, onRoleChange } = props;

  const listRoles = [{ label: "Tous les rôles", value: "ALL" }, ...roles];

  return (
    <div className="w-full flex flex-col md:flex-row md:items-center gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-3 w-full">
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Rechercher par nom..."
          className="w-1/2 pl-4 pr-4 h-9 rounded-full bg-white dark:bg-slate-900 border border-sky-500/30 text-slate-800 dark:text-slate-100"
        />

        <Select value={role} onValueChange={onRoleChange}>
          <SelectTrigger className="w-full md:w-72 h-10 rounded-full bg-white dark:bg-slate-900 border border-sky-500/30">
            <SelectValue placeholder="Filtrer par rôle" />
          </SelectTrigger>
          <SelectContent>
            {listRoles.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end md:ml-auto">
        <ViewModeButton view={view} onViewChange={setView} />
      </div>
    </div>
  );
};

export default UserFilter;
