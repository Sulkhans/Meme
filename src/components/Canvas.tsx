import { useEffect, useRef, useState } from "react";
import { MemeObject, TextObject } from "./Main";

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
    context.font = "16px Poppins";
    context.fillStyle = "black";
    context.textAlign = "center";
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
  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragging && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      let mouseX: number, mouseY: number;
      if ("touches" in e) {
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
      } else {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      }
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
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      />
      <button onClick={handleDownload}>Download Image</button>
    </div>
  );
};

export default Canvas;
