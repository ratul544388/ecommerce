"use client";

import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";

interface ActionsProps {
  ids: string[];
  addAction: () => void;
  editAction: () => void;
  deleteAction: () => void;
}

export const Actions = ({
  ids,
  addAction,
  editAction,
  deleteAction,
}: ActionsProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-5">
        <p className="text-sm text-muted-foreground">
          {ids.length || "No"} Items Selected
        </p>
        {ids.length === 1 && (
          <Button size="sm" onClick={editAction} variant="outline">
            Edit
            <Edit className="h-4 w-4 ml-2" />
          </Button>
        )}
        {!!ids.length && (
          <Button size="sm" onClick={deleteAction} variant="destructive">
            Delete
            <Trash2 className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
      <Button size="sm" onClick={addAction} variant="outline">
        New
        <Plus className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};
