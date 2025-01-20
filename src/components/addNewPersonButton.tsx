"use client";

import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { AddNewPersonDialogContent } from "./addNewPersonDialogContent";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useState } from "react";

export function AddNewPersonButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Plus size={32} color="#1C9AEA" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Cadastrar novo usuário</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="max-h-[90%] overflow-y-scroll no-scrollbar">
        <AddNewPersonDialogContent setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
