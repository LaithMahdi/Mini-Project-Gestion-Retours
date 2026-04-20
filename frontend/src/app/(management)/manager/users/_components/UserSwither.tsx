import { Switch } from "@/components/ui/switch";
import { Item } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
import { USERS_ENDPOINT, USERS_KEY } from "@/config";
import { useState } from "react";

interface Props {
  item: Item;
}

const UserSwither = (props: Props) => {
  const { item } = props;
  const queryClient = useQueryClient();
  const [value, setValue] = useState<boolean>(item.enabled);

  const mutation = useMutation({
    mutationFn: async (value: boolean) => {
      await apiClient.patch(`${USERS_ENDPOINT}/patch/${item.id}`, {
        enabled: value,
      });
    },
    onSuccess: (_, value) => {
      queryClient.invalidateQueries({ queryKey: [USERS_KEY, item.id] });
      toast.success(
        `Utilisateur ${value ? "activé" : "désactivé"} avec succès.`,
      );
    },
    onError: () => {
      toast.error("Echec de mise a jour de l'utilisateur.");
    },
  });

  return (
    <>
      <Switch
        id={`switch-${item.id}`}
        checked={value}
        onCheckedChange={(value) => {
          setValue(value);
          mutation.mutate(value);
        }}
        disabled={mutation.isPending || item.role === "ADMIN"}
      />
    </>
  );
};

export default UserSwither;
