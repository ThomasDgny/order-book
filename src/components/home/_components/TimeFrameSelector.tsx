import { TimeFrames } from "../../../constants/constants";
import { TimeFrameKey } from "../../../types/types";

export default function TimeFrameSelector({
    switchTimeFrame,
    handleTimeFrameChange,
  }: {
    switchTimeFrame: TimeFrameKey;
    handleTimeFrameChange: (frame: TimeFrameKey) => void;
  }) {
    return (
      <div className="flex gap-4 mt-4">
        {Object.keys(TimeFrames).map((key) => (
          <button
            key={key}
            className={`px-4 py-2 rounded-md ${
              switchTimeFrame === key ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTimeFrameChange(key as TimeFrameKey)}
          >
            {key}
          </button>
        ))}
      </div>
    );
  }