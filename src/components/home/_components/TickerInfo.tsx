import { ProductIdKey, TickerData } from "../../../types/types";
import InfoCard from "./InfoCard";
import ProductSelector from "./ProductSelector";

interface TickerInfoProps {
  selectedPair: string;
  tickerData: TickerData;
  handlePairChange: (newPair: ProductIdKey) => void;
}

export default function TickerInfo({
  selectedPair,
  tickerData,
  handlePairChange,
}: TickerInfoProps) {
  return (
    <div className="flex justify-between items-center py-3 px-8 rounded-md">
      {tickerData.markPrice ? (
        <>
          <div>
            <ProductSelector
              selectedPair={selectedPair}
              handlePairChange={handlePairChange}
            />
            <h3 className="text-2xl font-bold">{tickerData.markPrice}</h3>
            <p className="text-sm font-medium text-slate-500">
              {tickerData.markPrice}
            </p>
          </div>
          <div className="flex gap-10">
            <InfoCard label="24h change" value={tickerData.change} />
            <InfoCard label="24h high" value={tickerData.high} />
            <InfoCard label="24h low" value={tickerData.low} />
            <InfoCard label="24h volume" value={tickerData.volume} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
