import React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const OutfitCanvas = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "60vh",
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
  );
};

export default OutfitCanvas;
