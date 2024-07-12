import TickerRowItem from "./TickerRowItem";

interface Pair {
  pair: string;
  productId: string;
}

interface TickerRowProps {
  pairs: Pair[];
}

export default function TickerRow({ pairs }: TickerRowProps) {
  return (
    <>
      {pairs.map(({ pair, productId }) => (
        <TickerRowItem key={pair} pair={pair} productId={productId} />
      ))}
    </>
  );
}
