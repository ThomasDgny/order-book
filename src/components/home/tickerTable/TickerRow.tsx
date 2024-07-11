import React from "react";
import TickerRowItem from "./TickerRowItem";

interface Pair {
  pair: string;
  productId: string;
}

interface TickerRowProps {
  pairs: Pair[];
}

const TickerRow: React.FC<TickerRowProps> = ({ pairs }) => {
  return (
    <>
      {pairs.map(({ pair, productId }) => (
        <TickerRowItem key={pair} pair={pair} productId={productId} />
      ))}
    </>
  );
};

export default TickerRow;
