import Image from "next/image";
import logo from "@/assets/logo.png";
import { AddNewPersonButton } from "./addNewPersonButton";

export function Header() {
  return (
    <div className="w-full bg-black flex items-center justify-between p-4">
      <Image src={logo} alt="Logo" width={150} />
      <div>
        <AddNewPersonButton />
      </div>
    </div>
  );
}
