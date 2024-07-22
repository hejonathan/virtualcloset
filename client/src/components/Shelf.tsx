import React, { useState } from "react";
import TagDropdown from "./TagDropdown";

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

const ClosetShelf = () => {
  const [selectedTag, setSelectedTag] = useState("");

  const handleTagSelected = (tag: string) => {
    setSelectedTag(tag);
  };

  const filteredImages = images.filter((image) => {
    // Replace this with your actual logic for determining if an image has a tag
    return selectedTag === "" || image.includes(selectedTag);
  });
  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding: "10px",
        marginTop: "9vh",
        marginBottom: "9vh", // Add this line
        overflowY: "auto",
        maxHeight: "79vh",
      }}
    >
      <TagDropdown onTagSelected={handleTagSelected} />
      {filteredImages.map((image, index) => (
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

export default ClosetShelf;
