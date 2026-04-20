"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Item } from "./types";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSessionStore } from "@/stores/use_session_store";
import DeleteButton from "./DeleteButton";

interface Props {
  item: Item;
}

const MoreButton = (props: Props) => {
  const { item } = props;
  const router = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const { currentUser } = useSessionStore();

  const canEdit =
    currentUser?.role === "ADMIN" || currentUser?.role === "MANAGER";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={!canEdit}>
          <Button
            variant="outline"
            className={!canEdit ? "opacity-50 cursor-not-allowed" : ""}
          >
            <HugeiconsIcon icon={MoreHorizontalIcon} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => router.push(`/manager/returns/${item.id}`)}
            >
              Voir
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={!canEdit}
              onClick={() => router.push(`/manager/returns/update/${item.id}/`)}
            >
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={!canEdit}
              className="text-rose-500 focus:text-rose-500"
              onClick={() => setOpenDeleteDialog(true)}
            >
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteButton
        data={item}
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
      />
    </>
  );
};

export default MoreButton;
