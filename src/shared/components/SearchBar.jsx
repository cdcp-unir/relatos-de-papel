import React, { useContext } from "react";

import { GlobalContext } from "../context/GlobalContext";

function SearchBar({
  value,
  onChange,
  placeholder = "Buscar por título, autor, categoría o ISBN...",
}) {
  const context = useContext(GlobalContext);

  const searchValue = value ?? context?.searchQuery ?? "";

  const handleChange = (e) => {
    const newValue = e.currentTarget.value;

    if (onChange) {
      onChange(newValue);
      return;
    }

    context?.setSearchQuery?.(newValue);
  };

  const handleClear = () => {
    if (onChange) {
      onChange("");
      return;
    }

    context?.setSearchQuery?.("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <label className="input input-bordered w-full flex items-center gap-2">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>

        <input
          type="search"
          className="grow"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
        />

        {searchValue && (
          <button
            type="button"
            className="btn btn-ghost btn-xs"
            onClick={handleClear}
            aria-label="Limpiar búsqueda"
          >
            ✕
          </button>
        )}
      </label>
    </div>
  );
}

export default SearchBar;