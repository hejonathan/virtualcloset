import React, { useState } from "react";
import { tags as initialTags } from "./TagDropdown";

const AddTag = () => {
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>(initialTags);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags([...selectedTags, tag]);
    setAvailableTags(availableTags.filter((t) => t !== tag));
  };

  const filteredTags = availableTags.filter((tag) =>
    tag.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search tags"
        value={search}
        onChange={handleSearchChange}
      />
      <div>
        {filteredTags.map((tag) => (
          <button key={tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </button>
        ))}
      </div>
      <div>
        <h2>Selected Tags:</h2>
        {selectedTags.map((tag) => (
          <p key={tag}>{tag}</p>
        ))}
      </div>
    </div>
  );
};

export default AddTag;
