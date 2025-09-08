// src/components/StyledSwitch.tsx
import React from "react";

interface StyledSwitchProps<T extends string> {
  options: { value: T; label: string }[];
  selectedValue: T;
  onValueChange: (value: T) => void;
  theme: "red" | "blue";
}

// Ícone de checkmark para usar nos botões
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-4 h-4 ml-1.5"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
      clipRule="evenodd"
    />
  </svg>
);

export function StyledSwitch<T extends string>({
  options,
  selectedValue,
  onValueChange,
  theme,
}: StyledSwitchProps<T>) {
  const baseClasses =
    "flex items-center justify-center w-1/2 py-2 px-4 text-sm font-semibold transition-all duration-300 rounded-full";

  const themeClasses = {
    red: {
      container: "border-red-200",
      selected: "bg-[#FF1935] text-white shadow-md",
      unselected: "text-gray-500",
    },
    blue: {
      container: "border-blue-200",
      selected: "bg-[#0F2167] text-white shadow-md",
      unselected: "text-gray-500",
    },
  };

  const currentTheme = themeClasses[theme];

  return (
    <div
      className={`relative flex w-full max-w-[380px] p-1 bg-white border ${currentTheme.container} rounded-full shadow-inner`}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onValueChange(option.value)}
          className={`${baseClasses} ${
            selectedValue === option.value
              ? currentTheme.selected
              : currentTheme.unselected
          }`}
        >
          {option.label}
          {selectedValue === option.value && <CheckIcon />}
        </button>
      ))}
    </div>
  );
}
