import React, { useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

type Cloth = {
  id: string;
  path: string;
  tags: string[];
};

const OutfitCanvas = () => {
  const [clothes, setClothes] = useState<Cloth[]>([]);

  useEffect(() => {
    fetch("/api/get-all-cloth")
      .then((response) => response.json())
      .then((data) => setClothes(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSelect = (id: string) => {
    console.log(`Selected cloth ID: ${id}`);
    // Add your logic here to handle the selection of a cloth
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          flex: "1",
          overflow: "auto",
          paddingTop: "70px",
        }}
      >
        <TransformWrapper>
          <TransformComponent>
            <div
              style={{
                width: "5000px",
                height: "5000px",
                backgroundColor: "#f1f1f1",
              }}
            >
              {Array.from({ length: 50 }).map((_, index) => (
                <p key={index} style={{ margin: "20px" }}>
                  Text {index + 1}
                </p>
              ))}
            </div>
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div
        style={{
          width: "100%",
          height: "30vh",
          overflowX: "auto",
          overflowY: "hidden",
          position: "fixed",
          bottom: 0,
          backgroundColor: "#cbe5ef",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "10px",
          paddingBottom: "40px",
        }}
      >
        {clothes.map((cloth) => (
          <img
            key={cloth.id}
            src={cloth.path}
            alt={cloth.tags.join(", ")}
            style={{ width: "200px", height: "auto", margin: "10px" }} // Increase the width to make the images bigger
            onClick={() => handleSelect(cloth.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default OutfitCanvas;
