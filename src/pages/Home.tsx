import TickerTable from "../components/home/tickerTable/TickerTable";

export default function Home() {
  return (
    <div>
      <div className="container flex w-full gap-10">
        <div>
          <h1 className="text-2xl font-bold mb-4">Cryptocurrency Ticker</h1>
          <TickerTable />
        </div>
      </div>
    </div>
  );
}
