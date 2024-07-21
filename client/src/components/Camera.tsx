import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

const CameraPage = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [webcamHeight, setWebcamHeight] = useState(0);
  const [webcamWidth, setWebcamWidth] = useState(0);

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

      fetch("http://your-server.com/save-image", {
        method: "POST",
        body: formData,
      });
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
          fontSize: "20px",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "2px solid black",
          cursor: "pointer",
          marginTop: "20px",
        }}
      >
        Take a Picture
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
              fontSize: "20px",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "2px solid black",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Save Image
          </button>
        </>
      )}
    </div>
  );
};

export default CameraPage;
