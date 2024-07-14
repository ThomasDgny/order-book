import { TimeFrameKey } from "../../../types/types";
import ChartComponent from "../chart/Chart";
import OrderForm from "../orderForm/OrderForm";
import TimeFrameSelector from "./TimeFrameSelector";

export default function ChartSection({
  selectedPair,
  switchTimeFrame,
  handleTimeFrameChange,
}: {
  selectedPair: string;
  switchTimeFrame: TimeFrameKey;
  handleTimeFrameChange: (frame: TimeFrameKey) => void;
}) {
  return (
    <div className="flex-1 w-full">
      <div className="flex flex-col gap-10 h-full">
        <div className="max-h-[400px] w-full">
          <TimeFrameSelector
            switchTimeFrame={switchTimeFrame}
            handleTimeFrameChange={handleTimeFrameChange}
          />
          <ChartComponent coin={selectedPair} time={switchTimeFrame} />
        </div>
        <div className="p-8">
          <OrderForm />
        </div>
      </div>
    </div>
  );
}
