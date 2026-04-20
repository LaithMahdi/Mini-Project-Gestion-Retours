export function getRoleMeta(role: string) {
  const roleMap: Record<string, { label: string; className: string }> = {
    ADMIN: {
      label: "Administrateur",
      className:
        "bg-red-100 text-red-800 border-red-300 dark:bg-red-900 dark:text-red-100 dark:border-red-700",
    },
    MANAGER: {
      label: "Gestionnaire",
      className:
        "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900 dark:text-blue-100 dark:border-blue-700",
    },
    USER: {
      label: "Utilisateur",
      className:
        "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-100 dark:border-green-700",
    },
  };

  return (
    roleMap[role] || {
      label: role,
      className:
        "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700",
    }
  );
}
