import { useEffect, useRef, useState } from "react";
import { MemeObject, TextObject } from "./Main";
// @ts-ignore
import Download from "../assets/download.svg?react";

type CanvasProps = {
  width: number;
  height: number;
  meme: MemeObject;
  texts: TextObject[];
  setTexts: React.Dispatch<React.SetStateAction<TextObject[]>>;
  activeIndex: number;
};

const Canvas = ({
  width,
  height,
  meme,
  texts,
  setTexts,
  activeIndex,
}: CanvasProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawText = (context: CanvasRenderingContext2D, obj: TextObject) => {
    context.font = `${obj.size} Impact`;
    context.fillStyle = obj.color;
    context.fillText(obj.text, obj.x, obj.y);
  };

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      var img = new Image();
      img.src = meme.url;
      img.crossOrigin = "anonymous";
      if (context) {
        img.onload = () => {
          context.drawImage(img, 0, 0, width, height);
          texts.forEach((obj) => drawText(context, obj));
        };
      }
    }
  }, [meme, texts]);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      setTexts((prevTexts) => {
        const newTexts = [...prevTexts];
        newTexts[activeIndex] = {
          ...newTexts[activeIndex],
          x: mouseX,
          y: mouseY,
        };
        return newTexts;
      });
    }
  };

  const handleDownload = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "Meme.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 relative">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`rounded-sm cursor-grab ${isDragging && "cursor-grabbing"}`}
      />
      <Download
        onClick={handleDownload}
        className="absolute bottom-4 right-4 w-10 h-10 border-2 border-[#606060] bg-[#303030] hover:bg-[#404040] rounded-md p-1"
      />
    </div>
  );
};

export default Canvas;
