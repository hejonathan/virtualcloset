import React, { useState, useEffect } from "react";
//import { tags as initialTags } from "./TagDropdown";

const AddTag = () => {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    fetch("/api/get-all-tags")
      .then((response) => response.json())
      .then((data) => setAvailableTags(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  const handleUnselectTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag));
    setAvailableTags([...availableTags, tag]);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags([...selectedTags, tag]);
    setAvailableTags(availableTags.filter((t) => t !== tag));
  };

  const filteredTags = availableTags.filter((tag) =>
    tag.toLowerCase().includes(search.toLowerCase())
  );

  const handleNewTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(event.target.value);
  };

  const handleAddTag = () => {
    if (newTag && !availableTags.includes(newTag)) {
      setAvailableTags([...availableTags, newTag]);
      setNewTag("");
    }
  };

  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/processed-image")
      .then((response) => {
        const id = response.headers.get("id");
        setId(id ? parseInt(id) : null); // Convert id to a number
        return response.blob();
      })
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleSaveTags = () => {
    fetch("/api/save-tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id, // Use the stored ID
        tags: selectedTags,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          console.log(data.message);
        } else if (data.error) {
          console.error(data.error);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const style: React.CSSProperties = {
    width: "55vw",
    height: "4vh",
    position: "absolute",
    top: "60%", // Reduced from 50% to move everything up
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "transparent",
    color: "black",
    fontSize: "16px",
    fontFamily: "Lato, sans-serif",
    borderColor: "#212529",
    display: "flex", // Added to center everything
    flexDirection: "column", // Added to stack the children vertically
    alignItems: "center", // Added to center the children horizontally
    justifyContent: "center", // Added to center the children vertically
  };
  const searchBoxStyle: React.CSSProperties = {
    width: "70vw",
    height: "2vh",
    backgroundColor: "#87c1d8",
    color: "black",
    fontSize: "16px",
    borderRadius: "3px",
    border: "2px solid",
    fontFamily: "Lato, sans-serif",
    borderColor: "#212529",
    padding: "10px",
    marginBottom: "10px", //to leave space for the tags
  };
  const inputBoxStyle: React.CSSProperties = {
    width: "53vw",
    height: "2vh",
    backgroundColor: "#87c1d8",
    color: "black",
    fontSize: "16px",
    borderRadius: "3px",
    border: "2px solid",
    fontFamily: "Lato, sans-serif",
    borderColor: "#212529",
    padding: "10px",
  };
  const buttonStyle: React.CSSProperties = {
    backgroundColor: "#87c1d8",
    color: "black",
    fontSize: "16px",
    fontFamily: "Lato, sans-serif",
    margin: "5px", // Added to add spacing between the tags
    borderRadius: "15px", // Added to make the tags more rounded
  };

  const selectedTagsStyle: React.CSSProperties = {
    height: "100px", // Adjust this value to your liking
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "0px", // Adjust this value to your liking
    width: "300px",
    minHeight: "180px",
  };

  const availableTagsStyle: React.CSSProperties = {
    height: "200px", // Adjust this value to your liking
    minHeight: "130px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap", // This will allow the buttons to wrap onto the next line
    gap: "5px", // Adjust this value to your liking
    width: "300px",
  };

  return (
    <div style={style}>
      <div style={{ marginTop: "-160px", paddingBottom: "15px" }}>
        {imageSrc && (
          <img
            src={imageSrc}
            alt="Processed Image"
            style={{ width: "180px", height: "180px" }}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          margin: "10px 0",
        }}
      >
        <input
          type="text"
          placeholder="Add new tag"
          value={newTag}
          onChange={handleNewTagChange}
          style={{ ...inputBoxStyle, marginRight: "10px" }}
        />
        <button onClick={handleAddTag} style={buttonStyle}>
          Add
        </button>
      </div>
      <input
        type="text"
        placeholder="Search existing tags"
        value={search}
        onChange={handleSearchChange}
        style={searchBoxStyle}
      />
      <div style={availableTagsStyle}>
        {filteredTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            style={buttonStyle}
          >
            {tag}
          </button>
        ))}
      </div>
      <div style={{ margin: "10px 0" }}>
        <h2>SELECTED TAGS:</h2>
        <div style={selectedTagsStyle}>
          {selectedTags.map((tag) => (
            <div key={tag} style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={() => handleUnselectTag(tag)}
                style={{ ...buttonStyle, marginRight: "10px" }}
              >
                x
              </button>
              <p>{tag}</p>
            </div>
          ))}
        </div>
        <button
          onClick={handleSaveTags}
          style={{ ...buttonStyle, marginTop: "0px" }}
        >
          Save Tags
        </button>
      </div>
    </div>
  );
};
export default AddTag;
