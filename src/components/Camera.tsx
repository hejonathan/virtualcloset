import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const CameraPage = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
        paddingTop: "10px",
      }}
    >
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ width: "90%", height: "auto" }}
      />
      <button
        onClick={capture}
        style={{
          backgroundColor: "#87c1d8",
          color: "black",
          fontSize: "20px",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Take a Picture
      </button>
      {capturedImage && (
        <img
          src={capturedImage}
          style={{ maxWidth: "90%", height: "auto", paddingTop: "10px" }}
        />
      )}
    </div>
  );
};

export default CameraPage;
