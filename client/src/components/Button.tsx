import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  color1: string;
  borderColor1: string;
  onClick1: () => void;
  children1: ReactNode;
  color2: string;
  borderColor2: string;
  onClick2: () => void;
  children2: ReactNode;
  color3: string;
  borderColor3: string;
  onClick3: () => void;
  children3: ReactNode;
}

const Button: React.FC<Props> = ({
  color1,
  borderColor1,
  onClick1,
  children1,
  color2,
  borderColor2,
  onClick2,
  children2,
  color3,
  borderColor3,
  onClick3,
  children3,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bottom-fixed-container">
      <button
        style={{
          backgroundColor: color1,
          border: `2px solid ${borderColor1}`,
          fontSize: "16px",
        }}
        className="btn btn-lg button-style"
        onClick={() => {
          onClick1();
          navigate("/myCloset");
        }}
      >
        {children1}
      </button>
      <button
        style={{
          backgroundColor: color2,
          border: `2px solid ${borderColor2}`,
          fontSize: "16px",
        }}
        className="btn btn-lg button-style"
        onClick={() => {
          onClick2();
          navigate("/planOutfit");
        }}
      >
        {children2}
      </button>
      <button
        style={{
          backgroundColor: color3,
          border: `2px solid ${borderColor3}`,
          fontSize: "16px",
        }}
        className="btn btn-lg button-style"
        onClick={() => {
          onClick3();
          navigate("/camera");
        }}
      >
        {children3}
      </button>
    </div>
  );
};

export default Button;
