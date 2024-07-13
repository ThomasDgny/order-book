import InfoCard from "./InfoCard";

export default function TickerInfo({
    selectedPair,
    tickerData,
  }: {
    selectedPair: string;
    tickerData: any;
  }) {
    return (
      <div className="flex justify-between items-center bg-slate-100 py-3 px-8 rounded-md">
        <div>
          <p className="text-sm font-medium text-slate-500">{selectedPair}</p>
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
      </div>
    );
  }