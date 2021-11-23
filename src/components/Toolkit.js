const Toolkit = ({
  HandleIncrement,
  size,
  HandleDecrement,
  HandleOnChange,
  color,
  HandleClear,
  canvasRef,
  setEraser,
  eraser
}) => {
  const downloadImage = () => {
    let url = canvasRef.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "board";
    a.click();
  };
  const HandleEraser = () => {
    if (eraser === true) {
      setEraser(false);
    } else {
      setEraser(true);
    }
    console.log(eraser);
  };
  return (
    <>
      <button onClick={HandleDecrement} className="item increment">
        -
      </button>
      <div onChange={HandleOnChange} className=" item size">
        {size}
      </div>
      <button onClick={HandleIncrement} className="item decrement">
        +
      </button>
      <input
        onChange={HandleOnChange}
        value={color}
        type="color"
        id="color"
        className="item"
      />
      <button onClick={downloadImage} className="item downloadBtn">
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="download"
          className="svg-inline--fa fa-download fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
          ></path>
        </svg>
      </button>
      <div
        onClick={HandleEraser}
        style={{ background: `${!eraser ? "white" : "grey"}` }}
        className="item eraser"
      >
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="eraser"
          class="svg-inline--fa fa-eraser fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M497.941 273.941c18.745-18.745 18.745-49.137 0-67.882l-160-160c-18.745-18.745-49.136-18.746-67.883 0l-256 256c-18.745 18.745-18.745 49.137 0 67.882l96 96A48.004 48.004 0 0 0 144 480h356c6.627 0 12-5.373 12-12v-40c0-6.627-5.373-12-12-12H355.883l142.058-142.059zm-302.627-62.627l137.373 137.373L265.373 416H150.628l-80-80 124.686-124.686z"
          ></path>
        </svg>
      </div>
      <div onClick={HandleClear} className="item clear">
        Clear
      </div>
    </>
  );
};
export default Toolkit;
