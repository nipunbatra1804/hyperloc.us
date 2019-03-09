import React from "react";

export default function FilterMenu(props) {
  const { options, selected, handleClick } = props;
  const getClass = (option, selected) => {
    if (selected && option.name === selected.name) return "btn btn-primary";
    if (!selected && option.value === "all") return "btn btn-primary";

    return "btn btn-outline-primary";
  };
  return (
    <div className="btn-group" role="group" style={{ display: "flex" }}>
      {options.map((option, index) => (
        <button
          key={index}
          type="button"
          className={getClass(option, selected)}
          onClick={() => handleClick(option)}
          data-testid={`filter-btn-${option.value.toLowerCase()}`}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
}
