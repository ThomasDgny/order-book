import { Coins } from "../../../constants/constants";
import { ProductIdKey } from "../../../types/types";

export default function ProductSelector({
    selectedPair,
    handlePairChange,
  }: {
    selectedPair: string | null;
    handlePairChange: (newPair: ProductIdKey) => void;
  }) {
    return (
      <div className="flex gap-4 mt-4">
        {Object.keys(Coins).map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-md ${
              selectedPair === Coins[key as ProductIdKey]
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handlePairChange(key as ProductIdKey)}
          >
            {key}
          </button>
        ))}
      </div>
    );
  }