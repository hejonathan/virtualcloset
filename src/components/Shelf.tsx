import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const images = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  // Add more image URLs here
];

const Shelf = () => {
  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding: "10px",
        marginTop: "100px",
        overflowY: "auto",
        maxHeight: "80vh",
      }}
    >
      {images.map((image, index) => (
        <div key={index} style={{ width: "calc(50% - 20px)", margin: "10px" }}>
          <img
            src={image}
            alt="Clothing item"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      ))}
    </div>
  );
};

export default Shelf;
