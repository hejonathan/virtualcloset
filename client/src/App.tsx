import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import Button from "./components/Button"; //bottom two buttons
import ClosetShelf from "./components/Shelf"; //closet
import CameraPage from "./components/Camera";
import AddTag from "./components/AddTag";
import React from "react";

import "./App.css";

import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
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
    <Router>
      <div>
        <Link to="/">
          <button
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
        </Link>

        <Button
          color1={colors.secondary}
          borderColor1={"black"}
          onClick1={() => {}}
          children1="CLOSET"
          color2={colors.secondary}
          borderColor2={"black"}
          onClick2={() => {}}
          children2="OUTFIT"
          color3={colors.secondary}
          borderColor3={"black"}
          onClick3={() => {}}
          children3="CAMERA"
        />

        <Routes>
          <Route path="/myCloset" element={<ClosetShelf />} />
          <Route path="/planOutfit" element={<ClosetShelf />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/add-tag/:id" element={<AddTag />} />
          <Route path="/" element={<div />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
