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
      .then(async (data) => {
        const clothesWithBlobUrls = await Promise.all(
          data.map(
            async (cloth: { id: number; path: string; tags: string[] }) => {
              console.log(cloth.path); // Log the URL to the console
              const response = await fetch(cloth.path);
              const blob = await response.blob();
              const objectURL = URL.createObjectURL(blob);
              return { ...cloth, path: objectURL };
            }
          )
        );
        setClothes(clothesWithBlobUrls);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const filteredClothes = clothes.filter((cloth) => {
    // If no tag is selected or the cloth's tags include the selected tag, include the cloth
    return selectedTag === "" || cloth.tags.includes(selectedTag);
  });

  const allTags = clothes.reduce((tags, cloth) => {
    cloth.tags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    });
    return tags;
  }, [] as string[]);

  return (
    <div
      className="container"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)", // This will create a grid with 2 columns
        gap: "10px", // This is the space between the images
        marginTop: "9vh",
        marginBottom: "9vh",
        overflowY: "auto",
      }}
    >
      <TagDropdown onTagSelected={handleTagSelected} tags={allTags} />
      {filteredClothes.map((cloth) => (
        <img
          key={cloth.id}
          src={cloth.path}
          alt={cloth.tags.join(", ")}
          style={{
            width: "100%", // This will make the images fill their grid cell
            height: "auto", // This will maintain the aspect ratio of the images
          }}
        />
      ))}
    </div>
  );
};

export default ClosetShelf;
