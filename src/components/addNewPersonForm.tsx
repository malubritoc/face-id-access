"use client";

import "@/styles/formStyles.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import axios from "axios";
import { SpinnerGraySmall } from "@/components/spinnerGraySmall";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { WebcamCaptureNewPerson } from "./webcamCaptureNewPerson.tsx";
import { toast } from "@/hooks/use-toast";

const AddNewPersonFormSchema = z.object({
  name: z.string().min(1, { message: "Por favor, preencha este campo." }),
  email: z
    .string()
    .email({ message: "E-mail inválido." })
    .min(1, { message: "Por favor, preencha este campo." }),
  image: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});

type AddNewPersonFormInputs = z.infer<typeof AddNewPersonFormSchema>;

export function AddNewPersonForm({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const permissions = ["a", "b", "c", "d"];
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [registerImage, setRegisterImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddNewPersonFormInputs>({
    resolver: zodResolver(AddNewPersonFormSchema),
    mode: "onChange",
  });

  function handlePermissionChange(permission: string) {
    setSelectedPermissions(
      (prevPermissions) =>
        prevPermissions.includes(permission)
          ? prevPermissions.filter((p) => p !== permission) // Remove o dia se já estiver selecionado
          : [...prevPermissions, permission] // Adiciona o dia se não estiver selecionado
    );
  }

  useEffect(() => {
    if (registerImage) {
      setValue("image", registerImage);
    }
  }, [registerImage, setValue]);

  useEffect(() => {
    setValue("permissions", selectedPermissions);
  }, [selectedPermissions, setValue]);

  async function handleAddNewPerson(data: AddNewPersonFormInputs) {
    if (!registerImage) {
      setError("image", {
        type: "manual",
        message: "Por favor, registre sua face.",
      });
      return;
    }

    if (selectedPermissions.length === 0) {
      setError("permissions", {
        type: "manual",
        message: "Por favor, selecione pelo menos uma permissão.",
      });
      return;
    }
    try {
      console.log(data);
      toast({
        variant: "success",
        title: "Usuário cadastrado com sucesso!",
        description:
          "O usuário foi cadastrado com êxito e já pode ser identificado na página inicial.",
      });
      setIsOpen(false);
      //   const response = await axios.post(
      //     "https://41ea-2804-29b8-50d3-e47e-f3b8-6281-f64-3764.ngrok-free.app/api/client/save",
      //     {
      //       name: data.name,
      //       email: data.email,
      //       facial_image: registerImage,
      //       permissions: data.permissions,
      //     },
      //     {
      //       headers: { accessKey: "Sva7P1nRGDKi8_Slh_XeiVyi7PTHFh-w" },
      //     }
      //   );
      //   console.log(response);
      //   console.log("Imagem enviada:", registerImage);
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
      alert("Erro ao enviar a imagem.");
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar novo usuário!",
        description:
          "Por favor, verifique seus dados e tente novamente mais tarde.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleAddNewPerson)}
      className="flex flex-col gap-4 items-start"
    >
      <div className="div-field">
        <Label>Nome</Label>
        <Input
          {...register("name")}
          placeholder="Digite aqui o nome do novo usuário"
        />
        {errors.name && (
          <span className="error-message">{errors.name.message}</span>
        )}
      </div>
      <div className="div-field">
        <Label>Email</Label>
        <Input
          {...register("email")}
          placeholder="Digite aqui o email do novo usuário"
        />
        {errors.email && (
          <span className="error-message">{errors.email.message}</span>
        )}
      </div>
      <div className="div-field">
        <Label>Clique na imagem para registrar sua face</Label>
        <WebcamCaptureNewPerson setRegisterImage={setRegisterImage} />
        {errors.image && (
          <span className="error-message">{errors.image.message}</span>
        )}
      </div>
      <div className="div-field">
        <Label>Selecione as permissões</Label>
        <div className="flex flex-col gap-1">
          {permissions.map((permission, idx) => {
            return (
              <div key={idx} className="flex items-center gap-2">
                <Checkbox
                  id={permission}
                  checked={selectedPermissions.includes(permission)}
                  onCheckedChange={() => handlePermissionChange(permission)}
                />
                <label
                  htmlFor={permission}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {permission}
                </label>
              </div>
            );
          })}
        </div>
        {errors.permissions && (
          <span className="error-message">{errors.permissions.message}</span>
        )}
      </div>
      <Button type="submit" className="w-full">
        {isSubmitting ? <SpinnerGraySmall /> : "Cadastrar"}
      </Button>
    </form>
  );
}
