"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export function WebcamCaptureNewPerson({
  setRegisterImage,
}: {
  setRegisterImage: Dispatch<SetStateAction<string | null>>;
}) {
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

  function captureImage() {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageDataUrl = canvas.toDataURL("image/png");
    setImage(imageDataUrl);
    setRegisterImage(imageDataUrl);
  }

  return (
    <div className="relative flex flex-col items-center gap-4">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt="Captura"
          className="w-96 h-72 border border-[3px] border-white rounded-lg overflow-hidden px-[-2px]"
        />
      ) : (
        <video
          onClick={() => captureImage()}
          ref={videoRef}
          autoPlay
          playsInline
          className="w-96 h-72 border border-[3px] border-white rounded-lg overflow-hidden px-[-2px] cursor-pointer"
        />
      )}
      <canvas ref={canvasRef} className="hidden" />
      {image && (
        <div
          className="absolute top-2 right-2 z-99 cursor-pointer"
          onClick={() => {
            setImage(null);
            setRegisterImage(null);
            startCamera();
          }}
        >
          <X size={16} color="red" />
        </div>
      )}
    </div>
  );
}
