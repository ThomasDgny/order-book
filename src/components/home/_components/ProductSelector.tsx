import React, { useState } from "react";
import { Coins } from "../../../constants/constants";
import { ProductIdKey } from "../../../types/types";
import { ChevronDownIcon } from "lucide-react";

interface ProductSelectorProps {
  selectedPair: string | null;
  handlePairChange: (newPair: ProductIdKey) => void;
}

export default function ProductSelector({
  selectedPair,
  handlePairChange,
}: ProductSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = (key: ProductIdKey) => {
    handlePairChange(key);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`inline-flex justify-center w-full rounded-md px-4 py-2 text-sm font-medium ${
            selectedPair ? "text-gray-900" : "text-gray-500"
          } hover:bg-gray-50 focus:outline-none`}
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={toggleDropdown}
        >
          {selectedPair || "Select Pair"}
          <ChevronDownIcon
            className={`h-5 w-5 ml-2 ${isOpen ? "-rotate-180" : "rotate-0"}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-fit rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          {Object.keys(Coins).map((key) => (
            <button
              key={key}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-medium"
              role="menuitem"
              onClick={() => handleItemClick(key as ProductIdKey)}
            >
              {key}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
