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
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    const canvas = canvasRef.current;
    setCanvasRef(canvas);
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    contextRef.current = context;
    updateWidthAndHeight();
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  }, [setCanvasRef]);
  useEffect(() => {
    if (clearDraw) {
      contextRef.current.clearRect(
        0,
        0,
        (canvasRef.current.width = window.innerWidth),
        (canvasRef.current.height = window.innerHeight)
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
    contextRef.current.closePath();
    setIsDrawing(false);
  };
  const Draw = (e) => {
    if (!isDrawing) {
      return;
    }
    contextRef.current.lineTo(e.clientX, e.clientY);
    contextRef.current.lineCap = "round";
    contextRef.current.stroke();
    contextRef.current.moveTo(e.clientX, e.clientY);
  };

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
        height={height}
        width={width}
      ></canvas>
    </>
  );
};
export default Canvas;
