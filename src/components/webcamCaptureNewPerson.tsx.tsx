/* eslint-disable @next/next/no-img-element */
"use client";

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export function WebcamCaptureNewPerson({
  setRegisterImages,
}: {
  setRegisterImages: Dispatch<SetStateAction<string[] | null>>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<string>("");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [images, setImages] = useState<string[]>([]);

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
    setImages([...images, imageDataUrl]);
    setRegisterImages([...images, imageDataUrl]);
    startCamera();
  }

  return (
    <div className="relative flex flex-col gap-4">
      {images.length >= 7 ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image ? image : images[images.length - 1]}
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
      <div className="flex items-center gap-2">
        {images.map((image, index) => {
          return (
            <div key={index} className="relative w-12 h-8 ">
              <img
                src={image}
                alt="Captura"
                className="w-full h-full border border-[1px] border-white rounded-lg"
              />
              <div
                onClick={() => images.length > 7 && setImage(image)}
                className="absolute top-0 w-full h-full hover:bg-black/40 z-99 cursor-pointer"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
