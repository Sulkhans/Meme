import { useEffect, useRef, useState } from "react";
import { MemeObject } from "./Main";

type CanvasProps = {
  width: number;
  height: number;
  meme: MemeObject;
  text: string;
};

const Canvas = ({ width, height, meme, text }: CanvasProps) => {
  const [textPosition, setTextPosition] = useState({
    x: width / 2,
    y: height / 2,
  });
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawText = (context: CanvasRenderingContext2D) => {
    context.font = "30px Poppins";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText(text, textPosition.x, textPosition.y);
  };

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      var img = new Image();
      img.src = meme.url;
      img.crossOrigin = "anonymous";
      console.log(meme);
      if (context) {
        img.onload = () => {
          context.drawImage(img, 0, 0, width, height);
          drawText(context);
        };
      }
    }
  }, [meme, text, textPosition]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      setTextPosition({ x: mouseX, y: mouseY });
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
      />
      <button onClick={handleDownload}>Download Image</button>
    </div>
  );
};

export default Canvas;
