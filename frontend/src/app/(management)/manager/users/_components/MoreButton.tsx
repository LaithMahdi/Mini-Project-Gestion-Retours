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
import { useState } from "react";
import UserDialog from "./UserDialog";
import DeleteButton from "./DeleteButton";

interface Props {
  item: Item;
}

const MoreButton = (props: Props) => {
  const { item } = props;
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={item.role === "ADMIN"}>
          <Button variant="outline">
            <HugeiconsIcon icon={MoreHorizontalIcon} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setOpenEditDialog(true)}>
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-rose-500 focus:text-rose-500"
              onClick={() => setOpenDeleteDialog(true)}
            >
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserDialog
        item={item}
        open={openEditDialog}
        onOpenChange={setOpenEditDialog}
      />
      <DeleteButton
        data={item}
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
      />
    </>
  );
};

export default MoreButton;
