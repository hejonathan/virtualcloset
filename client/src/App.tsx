import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import Button from "./components/Button"; //bottom two buttons
import ClosetShelf from "./components/Shelf"; //closet
import CameraPage from "./components/Camera";

import React, { useState } from "react";

import "./App.css";

import axios from "axios";

function App() {
  const [page, setPage] = useState("home");
  const colors = {
    primary: "#cbe5ef", // Light cyan for background
    secondary: "#87c1d8", // Darker cyan for buttons
    third: "#4a89a3",
    borderColor: "#4a89a3", // Darker darker cyan for borders
    success: "#B4CDCD",
    info: "#FFFFE0",
    warning: "#CD5C5C",
    danger: "#8B3A3A",
    light: "#F5F5F5",
    dark: "#2C2C2C",
  };

  return (
    <div>
      <button
        onClick={() => setPage("home")}
        style={{
          width: "24vw", // 10% of the viewport's width
          height: "4vh", // 5% of the viewport's height
          position: "absolute",
          top: "20px",
          left: "20px",
          backgroundColor: colors.secondary,
          color: "black",
          borderColor: colors.third,
          fontSize: "16px",
          fontFamily: "Lato, sans-serif",
          padding: "5px",
          borderRadius: "3px",
          border: "2px solid",
          cursor: "pointer",
        }}
      >
        ← HOME
      </button>
      {page === "home" ? (
        <Button
          color1={colors.secondary}
          borderColor1={"black"}
          onClick1={() => setPage("myCloset")}
          children1="CLOSET"
          color2={colors.secondary}
          borderColor2={"black"}
          onClick2={() => setPage("planOutfit")}
          children2="OUTFIT"
          color3={colors.secondary}
          borderColor3={"black"}
          onClick3={() => setPage("camera")}
          children3="CAMERA"
          setPage={setPage}
        />
      ) : page === "myCloset" ? (
        <ClosetShelf />
      ) : page === "planOutfit" ? (
        <ClosetShelf />
      ) : (
        <CameraPage />
      )}
      {page !== "home" && (
        <div className="d-flex justify-content-between position-fixed bottom-0 start-0 end-0 p-3">
          <Button
            color1={colors.secondary}
            borderColor1={"black"}
            onClick1={() => setPage("myCloset")}
            children1="CLOSET"
            color2={colors.secondary}
            borderColor2={"black"}
            onClick2={() => setPage("planOutfit")}
            children2="OUTFIT"
            color3={colors.secondary}
            borderColor3={"black"}
            onClick3={() => setPage("camera")}
            children3="CAMERA"
            setPage={setPage}
          />
        </div>
      )}
    </div>
  );
}

export default App;
