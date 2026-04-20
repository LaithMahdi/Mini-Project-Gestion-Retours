"use client";

import {
  PackageIcon,
  Alert02Icon,
  UserGroup03Icon,
  Clock04Icon,
} from "@hugeicons/core-free-icons";
import { SidebarItem } from "./SidebarItem";
import { useSessionStore } from "@/stores/use_session_store";

const routes = [
  {
    icon: UserGroup03Icon,
    label: "Mes Utilisateurs",
    href: "/manager/users",
  },
  {
    icon: PackageIcon,
    label: "Retours",
    href: "/manager/returns",
  },
  {
    icon: Clock04Icon,
    label: "Historique",
    href: "/manager/history",
  },
  {
    icon: Alert02Icon,
    label: "Non Conformités",
    href: "/manager/non-conformite",
  },
];

const SidebarRoutes = () => {
  const { currentUser } = useSessionStore();

  const canEdit =
    currentUser?.role === "USER" || currentUser?.role === "MANAGER";

  const getVisibleRoutes = () => {
    if (!canEdit) {
      return routes;
    }
    return routes.filter((route) => route.label !== "Mes Utilisateurs");
  };

  const visibleRoutes = getVisibleRoutes();

  return (
    <div className="flex flex-col w-full h-12 py-4">
      {visibleRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
