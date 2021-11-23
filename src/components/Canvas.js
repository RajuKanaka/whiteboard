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
  const [isDrawing, setIsDrawing] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    setCanvasRef(canvas);
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    const context = canvas.getContext("2d");
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.scale(2, 2);
    context.lineCap = "round";
    contextRef.current = context;
  }, [setCanvasRef]);
  useEffect(() => {
    if (clearDraw) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      context.fillStyle = "white";
      context.fillRect(0, 0, canvas.width, canvas.height);
      setClearDraw(false);
    }
    contextRef.current.strokeStyle = `${eraser ? "white" : colour}`;
    contextRef.current.lineWidth = size;
  }, [colour, size, clearDraw, setClearDraw, eraser]);

  const StartDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };
  const FinishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };
  const Draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={StartDrawing}
        onMouseMove={Draw}
        onMouseUp={FinishDrawing}
        id="canvas"
      ></canvas>
    </>
  );
};
export default Canvas;
