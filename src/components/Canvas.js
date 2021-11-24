import { useRef, useEffect, useState } from "react";
const Canvas = ({
  eraser,
  colour,
  size,
  clearDraw,
  setClearDraw,
  setCanvasRef
}) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [height, setHeight] = useState(1);
  const [width, setWidth] = useState(1);
  const [isDrawing, setIsDrawing] = useState(false);
  const updateWidthAndHeight = () => {
    let imageData = contextRef.current.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
    contextRef.current.putImageData(imageData, 0, 0);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    setCanvasRef(canvas);
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    contextRef.current = context;
    contextRef.current.lineWidth = size;
    updateWidthAndHeight();
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, [setCanvasRef, size]);
  useEffect(() => {
    if (clearDraw) {
      contextRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
      setClearDraw(false);
    }
    contextRef.current.strokeStyle = `${eraser ? "white" : colour}`;
    contextRef.current.lineWidth = size;
  }, [colour, size, clearDraw, setClearDraw, eraser]);

  const StartDrawing = (e) => {
    setIsDrawing(true);
    contextRef.current.beginPath();
  };
  const FinishDrawing = () => {
    contextRef.current.beginPath();
    setIsDrawing(false);
  };
  const Draw = (e) => {
    if (!isDrawing) {
      return;
    }
    contextRef.current.lineTo(e.clientX, e.clientY);
    contextRef.current.lineWidth = size;
    contextRef.current.lineCap = "round";
    contextRef.current.stroke();
    contextRef.current.moveTo(e.clientX, e.clientY);
  };
  console.log(width);

  return (
    <>
      <canvas
        onTouchEnd={() => {
          setIsDrawing(false);
          contextRef.current.beginPath();
        }}
        onTouchStart={() => {
          setIsDrawing(true);
        }}
        onTouchMove={(e) => Draw(e.touches[0])}
        ref={canvasRef}
        onMouseDown={StartDrawing}
        onMouseMove={Draw}
        onMouseUp={FinishDrawing}
        id="canvas"
        height={height - 50}
        width={width}
      ></canvas>
    </>
  );
};
export default Canvas;
