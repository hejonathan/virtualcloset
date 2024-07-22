import React from "react";

interface TagDropdownProps {
  onTagSelected: (tag: string) => void;
}

const TagDropdown: React.FC<TagDropdownProps> = ({ onTagSelected }) => {
  const tags = ["yellow", "blue"]; // Add more tags here

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onTagSelected(event.target.value);
  };

  return (
    <select
      onChange={handleTagChange}
      style={{
        width: "55vw", // 10% of the viewport's width
        height: "4vh",
        position: "absolute",
        top: "20px",
        right: "40px",
        backgroundColor: "#87c1d8",
        color: "black",
        fontSize: "16px",
        borderRadius: "3px",
        border: "2px solid",
        fontFamily: "Lato, sans-serif",
        borderColor: "#212529",
      }}
    >
      <option value="">FILTER CLOTHINGS</option>
      {tags.map((tag, index) => (
        <option key={index} value={tag}>
          {tag}
        </option>
      ))}
    </select>
  );
};

export const tags = ["yellow", "blue"];
export default TagDropdown;
