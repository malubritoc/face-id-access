"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
// import axios from "axios";

export function WebcamCapture({ register }: { register?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

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

    const blob = await (await fetch(image)).blob();
    const formData = new FormData();
    formData.append("file", blob, "captured-image.png");

    try {
      if (register) {
        //   const response = await axios.post("/api/register", formData, {
        //   headers: { "Content-Type": "multipart/form-data" },
        //   });
        console.log("Imagem registrada:", image);
        setImage(null);
        startCamera();
        alert("Imagem registrada com sucesso!");
        return;
      }

      // const response = await axios.post("/api/upload", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      console.log("Imagem enviada:", image);
      setImage(null);
      startCamera();
      alert("Imagem enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
      alert("Erro ao enviar a imagem.");
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
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-96 h-72 border border-[3px] border-[#1C9AEA] rounded-lg overflow-hidden px-[-2px]"
        />
      )}
      <canvas ref={canvasRef} className="hidden" />
      <div className="w-full flex flex-col items-center gap-2">
        {!image ? (
          <Button className="max-w-96 w-full" onClick={captureImage}>
            Capturar
          </Button>
        ) : (
          <>
            <Button className="max-w-96 w-full" onClick={uploadImage}>
              Entrar
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
