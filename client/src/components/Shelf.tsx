import React, { useState, useEffect } from "react";
import TagDropdown from "./TagDropdown";
import { useNavigate } from "react-router-dom";

const ClosetShelf = () => {
  const [selectedTag, setSelectedTag] = useState("");
  const [clothes, setClothes] = useState<
    Array<{ id: number; path: string; tags: string[] }>
  >([]);
  const [selectedCloth, setSelectedCloth] = useState<number | null>(null);
  const navigate = useNavigate();
  const [removingCloth, setRemovingCloth] = useState<number | null>(null);

  const handleTagSelected = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleSelect = (id: number) => {
    setSelectedCloth(id);
  };

  const handleRemoveClothing = (id: number) => {
    fetch("/api/delete-clothing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        if (data.success) {
          // If the clothing item was successfully deleted, remove it from the local state
          setClothes(clothes.filter((cloth) => cloth.id !== id));
        } else {
          // If there was an error, log it to the console
          console.error("Error:", data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetch("/api/get-all-cloth-tags")
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
        <div
          key={cloth.id}
          style={{
            border: selectedCloth === cloth.id ? "2px solid blue" : "none", // Highlight the selected image
          }}
        >
          <img
            src={cloth.path}
            alt={cloth.tags.join(", ")}
            style={{
              width: "100%", // This will make the images fill their grid cell
              height: "auto", // This will maintain the aspect ratio of the images
            }}
          />
          <button
            onClick={() => handleSelect(cloth.id)}
            style={{
              backgroundColor: "#87c1d8",
              color: "black",
              padding: "5px 10px",
              cursor: "pointer",
              marginTop: "5px",
              fontSize: "14px",
              borderRadius: "3px",
              border: "2px solid",
              fontFamily: "Lato, sans-serif",
              borderColor: "#212529",
            }}
          >
            Edit
          </button>
          {selectedCloth === cloth.id && (
            <div>
              <button onClick={() => navigate(`/add-tag/${cloth.id}`)}>
                Edit Tags
              </button>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <button onClick={() => setRemovingCloth(cloth.id)}>
                  Remove Clothing
                </button>
                {removingCloth === cloth.id && (
                  <button
                    onClick={() => {
                      handleRemoveClothing(cloth.id);
                      setRemovingCloth(null);
                    }}
                  >
                    Are you sure?
                  </button>
                )}
              </div>
              <button>Try it On</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClosetShelf;
