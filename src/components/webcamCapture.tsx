"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
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

    console.log(image);

    try {
      const response = await axios.post(
        "https://41ea-2804-29b8-50d3-e47e-f3b8-6281-f64-3764.ngrok-free.app/api/client/save",
        {
          name: "Chrystian",
          email: "chrystian@gmail.com",
          facial_image: image,
          permissions: ["a", "b", "c"],
        },
        {
          headers: { accessKey: "Sva7P1nRGDKi8_Slh_XeiVyi7PTHFh-w" },
        }
      );

      console.log(response);
      console.log("Imagem enviada:", image);
      setImage(null);
      startCamera();
      alert("Imagem enviada com sucesso!");
      setLoading(false);
    } catch (error) {
      console.error("Erro ao enviar a imagem:", error);
      alert("Erro ao enviar a imagem.");
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
