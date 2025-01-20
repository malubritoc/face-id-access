import { AddNewPersonForm } from "./addNewPersonForm";
import { DialogTitle } from "./ui/dialog";

export function AddNewPersonDialogContent() {
  return (
    <div className="flex flex-col gap-8">
      <DialogTitle className="text-2xl">Cadastrar Novo Usuário</DialogTitle>
      <AddNewPersonForm />
    </div>
  );
}
