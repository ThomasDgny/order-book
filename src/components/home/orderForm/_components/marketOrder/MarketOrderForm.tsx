interface OrderFormProps {
  title: string;
  quantity: number;
  setQuantity: (quantity: number) => void;
  total: number;
  handleSubmit: () => void;
  buttonColor: string;
  buttonText: string;
}

export default function MarketOrderForm({
  title,
  quantity,
  setQuantity,
  total,
  handleSubmit,
  buttonColor,
  buttonText,
}: OrderFormProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="mb-2">
        <label className="block text-sm">Price:</label>
        <input
          type="number"
          placeholder="Market Price"
          disabled
          className="border rounded p-1 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseFloat(e.target.value))}
          className="border rounded p-1 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm">Total:</label>
        <input
          type="number"
          value={total}
          readOnly
          className="border rounded p-1 w-full"
        />
      </div>
      <button
        onClick={handleSubmit}
        className={`${buttonColor} text-white px-4 py-2 rounded`}
      >
        {buttonText}
      </button>
    </div>
  );
}
