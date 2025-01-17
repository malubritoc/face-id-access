import Image from "next/image";
import logo from "@/assets/logo.png";
import { Plus } from "lucide-react";

export function Header() {
  return (
    <div className="w-full bg-black flex items-center justify-between p-4">
      <Image src={logo} alt="Logo" width={150} />
      <div>
        <Plus size={32} color="#1C9AEA" />
      </div>
    </div>
  );
}
