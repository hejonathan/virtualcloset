import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const CameraPage = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [webcamHeight, setWebcamHeight] = useState(0);
  const [webcamWidth, setWebcamWidth] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setWebcamWidth(window.innerWidth * 0.8);
    setWebcamHeight(window.innerHeight * 0.3);
  }, []);

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCapturedImage(imageSrc);
    }
  };

  const saveImage = async () => {
    if (capturedImage) {
      //Convert base64 image data to Blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();

      //Send Blob to server
      const formData = new FormData();
      formData.append("image", blob, "captured_image.jpeg");

      fetch("/api/save-clothing", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message && data.id) {
            console.log(data.message);
            console.log("Image ID:", data.id);
            navigate(`/add-tag/${data.id}`);
          } else if (data.error) {
            console.error(data.error);
          }
        })
        .catch((error) => console.error("Error:", error));
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
        paddingTop: "80px",
      }}
    >
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ width: `${webcamWidth}px`, height: `${webcamHeight}px` }}
      />
      <button
        onClick={capture}
        style={{
          backgroundColor: "#87c1d8",
          color: "black",
          padding: "10px 20px",
          cursor: "pointer",
          marginTop: "20px",
          fontSize: "18px",
          borderRadius: "3px",
          border: "2px solid",
          fontFamily: "Lato, sans-serif",
          borderColor: "#212529",
        }}
      >
        CAPTURE IMAGE
      </button>

      {capturedImage && (
        <>
          <img
            src={capturedImage}
            style={{
              width: webcamWidth,
              height: webcamHeight,
              objectFit: "contain",
              paddingTop: "20px",
            }}
          />
          <button
            onClick={saveImage}
            style={{
              backgroundColor: "#87c1d8",
              color: "black",
              padding: "10px 20px",
              cursor: "pointer",
              marginTop: "20px",
              fontSize: "18px",
              borderRadius: "3px",
              border: "2px solid",
              fontFamily: "Lato, sans-serif",
              borderColor: "#212529",
            }}
          >
            SAVE AND PROCESS
          </button>
        </>
      )}
    </div>
  );
};

export default CameraPage;
