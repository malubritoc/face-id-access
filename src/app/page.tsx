"use client";

import { WebcamCapture } from "@/components/webcamCapture";

export default function Home() {
  return (
    <div className="max-w-6xl w-full flex flex-col gap-6 py-4 px-8">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-5xl font-bold text-center text-[#1C9AEA]">
          Bem-vindo ao FaceAccess!
        </h1>
        <h3 className="text-xl font-semibold text-center text-[#1C9AEA]">
          Faça aqui sua identificação facial para acessar o sistema.
        </h3>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p>
          Posicione-se na tela abaixo com o rosto dentro do quadrado amarelo e
          quando estiver pronto clique no botão &quot;Capturar&quot;.
        </p>
        <p>
          Quando estiver satisfeito com a imagem capturada, clique no botão
          &quot;Entrar&quot; ou tente novamente.
        </p>
      </div>
      <WebcamCapture />
    </div>
  );
}
