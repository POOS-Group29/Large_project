import React, { useState } from "react";
import { RefCallBack } from "react-hook-form";
import { Tag } from "./Tag";

interface TagInputProps {
  label: string;
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  inputRef?: RefCallBack;
}

export const TagInput = (props: TagInputProps) => {
  const { tags, setTags } = props;
  const [input, setInput] = useState<string>("");

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      // Prevent adding empty tags
      if (!input) return;

      const tag = input.charAt(0).toUpperCase() + input.slice(1);

      // Prevent adding duplicate tags
      if (tags.includes(tag)) {
        setInput("");
        return;
      }

      setTags([...tags, tag]);
      setInput("");
    }
  };

  const handleTagClick = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  return (
    <div className="mt-6">
      <label
        htmlFor="maximumDepth"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <input
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
          placeholder="Press Enter to add tags"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={props.inputRef}
        />
        <div className="w-full mt-2 flex gap-1 flex-wrap">
          {tags.map((tag, index) => (
            <Tag key={tag} text={tag} onClick={() => handleTagClick(index)} />
          ))}
        </div>
      </div>
    </div>
  );
};
