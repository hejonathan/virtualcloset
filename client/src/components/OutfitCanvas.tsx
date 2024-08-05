import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

type Cloth = {
  id: string;
  path: string;
  tags: string[];
};

type CanvasImage = {
  clothId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  order: number;
};

const OutfitCanvas = () => {
  const [clothes, setClothes] = useState<Cloth[]>([]);
  const [canvasImages, setCanvasImages] = useState<CanvasImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/get-all-cloth-tags")
      .then((response) => response.json())
      .then((data) => setClothes(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSelect = (cloth: Cloth) => {
    setSelectedImage(cloth.path);
    setCanvasImages((prevImages) => [
      ...prevImages,
      {
        clothId: cloth.id,
        x: 0,
        y: 0,
        width: 320,
        height: 200,
        rotation: 0,
        order: prevImages.length,
      },
    ]);
  };

  const handleDragStop = (index: number, e: any, d: any) => {
    setCanvasImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index].x = d.x;
      newImages[index].y = d.y;
      return newImages;
    });
  };

  const handleResizeStop = (
    index: number,
    e: any,
    direction: any,
    ref: any
  ) => {
    setCanvasImages((prevImages) => {
      const newImages = [...prevImages];
      newImages[index].width = ref.offsetWidth;
      newImages[index].height = ref.offsetHeight;
      return newImages;
    });
  };

  const handleSave = () => {
    fetch("/api/save-canvas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(canvasImages),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
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
        <button
          style={{
            width: "44vw",
            height: "4vh",
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "#87c1d8",
            color: "black",
            borderColor: "#212529",
            fontSize: "16px",
            fontFamily: "Lato, sans-serif",
            padding: "5px",
            borderRadius: "3px",
            border: "2px solid",
            cursor: "pointer",
          }}
          onClick={handleSave}
        >
          SAVE CANVAS
        </button>
        <TransformWrapper>
          <TransformComponent>
            <div
              style={{
                width: "5000px",
                height: "5000px",
                backgroundColor: "#f1f1d1",
              }}
            >
              {canvasImages.map((image, index) => (
                <Rnd
                  key={index}
                  default={{
                    x: image.x,
                    y: image.y,
                    width: image.width,
                    height: image.height,
                  }}
                  onDragStop={(e, d) => handleDragStop(index, e, d)}
                  onResizeStop={(e, direction, ref) =>
                    handleResizeStop(index, e, direction, ref)
                  }
                >
                  <img
                    src={selectedImage || undefined}
                    alt="Selected"
                    style={{ width: "100%", height: "100%" }}
                  />
                </Rnd>
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
            style={{ width: "200px", height: "auto", margin: "10px" }}
            onClick={() => handleSelect(cloth)}
          />
        ))}
      </div>
    </div>
  );
};

export default OutfitCanvas;
