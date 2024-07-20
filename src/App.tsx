import Alert from "./components/Alert";
import ListGroup from "./components/ListGroup";
import Button from "./components/Button"; //bottom two buttons
import ClosetShelf from "./components/Shelf"; //closet
import CameraPage from "./components/Camera";

import React, { useState } from "react";

import "./App.css";

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
      {page === "home" ? (
        <Button
          color1={colors.secondary}
          borderColor1={colors.third}
          onClick1={() => setPage("myCloset")}
          children1="Closet"
          color2={colors.secondary}
          borderColor2={colors.third}
          onClick2={() => setPage("planOutfit")}
          children2="Plan Outfit"
          color3={colors.secondary}
          borderColor3={colors.third}
          onClick3={() => setPage("camera")}
          children3="Camera"
          setPage={setPage}
        />
      ) : page === "myCloset" ? (
        <ClosetShelf />
      ) : page === "planOutfit" ? (
        <ClosetShelf />
      ) : (
        <CameraPage />
      )}
    </div>
  );
}

export default App;

/*
  let items = ["1", "2", "3", "4", "5"];
  const handleSelectedItem = (item: string) => {
    console.log(item);
  };
  return (
    <div>
      
      <ListGroup
        items={items}
        heading="Categories"
        onSelectItem={handleSelectedItem}
      />
    </div>
  );
  


  return (
    <div>
      <Alert>
        Hello <span>World</span>
      </Alert>
    </div>
  );
  */
