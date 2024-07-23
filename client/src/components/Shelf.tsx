import React, { useState, useEffect } from "react";
import TagDropdown from "./TagDropdown";

const ClosetShelf = () => {
  const [selectedTag, setSelectedTag] = useState("");
  const [clothes, setClothes] = useState<
    Array<{ id: number; path: string; tags: string[] }>
  >([]);

  const handleTagSelected = (tag: string) => {
    setSelectedTag(tag);
  };

  useEffect(() => {
    fetch("/api/get-all-cloth")
      .then((response) => response.json())
      .then((data) => setClothes(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const filteredClothes = clothes.filter((cloth) => {
    // If no tag is selected or the cloth's tags include the selected tag, include the cloth
    return selectedTag === "" || cloth.tags.includes(selectedTag);
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
        marginBottom: "9vh",
        overflowY: "auto",
        maxHeight: "79vh",
      }}
    >
      <TagDropdown onTagSelected={handleTagSelected} />
      {filteredClothes.map((cloth, index) => (
        <div key={index} style={{ width: "calc(50% - 20px)", margin: "10px" }}>
          <img src={cloth.path} alt="Cloth" />
          <div>
            {cloth.tags.map((tag, tagIndex) => (
              <span key={tagIndex}>{tag}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClosetShelf;
