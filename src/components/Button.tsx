import React from "react";
interface Props {
  children1: string;
  children2: string;
  children3: string;
  color1: string;
  color2: string;
  color3: string;
  borderColor1: string;
  borderColor2: string;
  borderColor3: string;
  onClick1: () => void;
  onClick2: () => void;
  onClick3: () => void;
  setPage: (page: string) => void;
}

const Button: React.FC<Props> = ({
  children1,
  onClick1,
  color1,
  borderColor1,
  children2,
  onClick2,
  color2,
  borderColor2,
  children3,
  onClick3,
  color3,
  borderColor3,
  setPage,
}) => {
  return (
    <div className="d-flex justify-content-between position-fixed bottom-0 start-0 end-0 p-3">
      <button
        style={{
          backgroundColor: color1,
          border: `2px solid ${borderColor1}`,
          margin: "0 10px",
          fontSize: "5.3vw", // Adjust as needed
          padding: "1.5vw", // Adjust as needed
        }}
        className="btn btn-lg w-33"
        onClick={() => {
          onClick1();
          setPage("myCloset");
        }}
      >
        {children1}
      </button>
      <button
        style={{
          backgroundColor: color2,
          border: `2px solid ${borderColor2}`,
          margin: "0 10px",
          fontSize: "5.3vw", // Adjust as needed
          padding: "1.5vw", // Adjust as needed
        }}
        className="btn btn-lg w-33"
        onClick={() => {
          onClick2();
          setPage("planOutfit");
        }}
      >
        {children2}
      </button>
      <button
        style={{
          backgroundColor: color3,
          border: `2px solid ${borderColor3}`,
          margin: "0 10px",
          fontSize: "5.3vw", // Adjust as needed
          padding: "1.5vw", // Adjust as needed
        }}
        className="btn btn-lg w-33"
        onClick={() => {
          onClick3();
          setPage("camera");
        }}
      >
        {children3}
      </button>
    </div>
  );
};

export default Button;
