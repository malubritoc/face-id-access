import { Dispatch, SetStateAction } from "react";
import { AddNewPersonForm } from "./addNewPersonForm";
import { DialogTitle } from "./ui/dialog";

export function AddNewPersonDialogContent({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="flex flex-col gap-8">
      <DialogTitle className="text-2xl">Cadastrar Novo Usuário</DialogTitle>
      <AddNewPersonForm setIsOpen={setIsOpen} />
    </div>
  );
}
