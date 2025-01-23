"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
// import axios from "axios";

export function WebcamCapture() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [loading, setLoading] = useState(false);

  async function startCamera() {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStream(mediaStream);
    } catch (error) {
      console.error("Erro ao acessar a câmera:", error);
    }
  }

  useEffect(() => {
    startCamera();

    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const captureImage = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/png");
    setImage(imageDataUrl);
  };

  const uploadImage = async () => {
    if (!image) return;
    setLoading(true);

    const blob = await (await fetch(image)).blob();
    const formData = new FormData();
    formData.append("file", blob, "captured-image.png");

    console.log(image.split(",")[1]);

    try {
      await axios.post(
        "https://5d57-2804-29b8-50d3-e47e-9d8a-3d86-9b55-c736.ngrok-free.app/api/facial-recognition",
        image.split(",")[1],
        {
          headers: { accessKey: "Sva7P1nRGDKi8_Slh_XeiVyi7PTHFh-w" },
        }
      );
      setImage(null);
      startCamera();
      toast({
        variant: "success",
        title: "Usuário autorizado!",
        description: "Foi econtrada uma autorização para este usuário.",
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Usuário não autorizado!",
        description:
          "Não foi encontrada uma autorização para este usuário. Tente se posicionar novamente e enviar uma nova imagem ou fazer o cadastro de um novo usuário.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt="Captura"
          className="w-96 h-72 border border-[3px] border-[#1C9AEA] rounded-lg overflow-hidden px-[-2px]"
        />
      ) : (
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-96 h-72 border border-[3px] border-[#1C9AEA] rounded-lg overflow-hidden px-[-2px]"
          />
          <div className="absolute top-8 right-1/2 translate-x-[50%] w-36 h-40 border border-[3px] border-yellow-500 bg-transparent" />
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
      <div className="w-full flex flex-col items-center gap-2">
        {!image ? (
          <Button className="max-w-96 w-full" onClick={captureImage}>
            Capturar
          </Button>
        ) : (
          <>
            <Button
              disabled={loading}
              className="max-w-96 w-full"
              onClick={uploadImage}
            >
              {loading ? "Enviando imagem..." : "Entrar"}
            </Button>
            <Button
              onClick={() => {
                setImage(null);
                startCamera();
              }}
              className="max-w-96 w-full bg-gray-200 text-gray-600 hover:bg-gray-300"
            >
              Tentar novamente
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
