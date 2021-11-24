import { useState } from "react";
import "./styles.css";
import Toolkit from "./components/Toolkit";
import Canvas from "./components/Canvas";

export default function App() {
  const HandleIncrement = () => {
    size >= 50 ? setSize(size) : setSize(size + 5);
    console.log(size);
  };
  const HandleDecrement = () => {
    if (size === 5) {
      setSize(size);
    } else setSize(size - 5);
    console.log(size);
  };

  const HandleOnChange = (e) => {
    setColour(e.target.value);
  };
  const HandleClear = () => {
    setClearDraw(true);
    console.log(clearDraw);
  };
  const [size, setSize] = useState(10);
  const [colour, setColour] = useState("#000000");
  const [clearDraw, setClearDraw] = useState(false);
  const [canvasRef, setCanvasRef] = useState(null);
  const [eraser, setEraser] = useState(false);
  return (
    <div className="App">
      <Canvas
        setClearDraw={setClearDraw}
        size={size}
        colour={colour}
        clearDraw={clearDraw}
        setCanvasRef={setCanvasRef}
        eraser={eraser}
      />
      <div className="absolute-toolkit">
        <div className="toolkit">
          <Toolkit
            canvasRef={canvasRef}
            HandleIncrement={HandleIncrement}
            HandleDecrement={HandleDecrement}
            HandleClear={HandleClear}
            HandleOnChange={HandleOnChange}
            color={colour}
            size={size}
            setEraser={setEraser}
            eraser={eraser}
          />
        </div>
      </div>
    </div>
  );
}
