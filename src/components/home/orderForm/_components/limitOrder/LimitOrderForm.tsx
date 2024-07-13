interface OrderFormProps {
  title: string;
  selectedPair: string;
  price: number;
  setPrice: (price: number) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  total: number;
  handleSubmit: () => void;
  buttonColor: string;
  buttonText: string;
}

export default function LimitOrderForm({
  title,
  selectedPair,
  price,
  setPrice,
  quantity,
  setQuantity,
  total,
  handleSubmit,
  buttonColor,
  buttonText,
}: OrderFormProps) {
  const pair = selectedPair.toLocaleUpperCase();
  
  return (
    <div className="p-4 w-full">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="mb-4 flex items-center">
        <label className="w-1/3 text-sm text-gray-600">Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value) || 0)}
          className="border rounded p-2 w-2/3"
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="w-1/3 text-sm text-gray-600">Amount:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
          className="border rounded p-2 w-2/3"
        />
      </div>
      <div className="mb-4 flex items-center">
        <label className="w-1/3 text-sm text-gray-600">Total:</label>
        <input
          type="number"
          value={total}
          readOnly
          className="border rounded p-2 w-2/3 bg-gray-100"
        />
      </div>
      <button
        onClick={handleSubmit}
        className={`block w-full ${buttonColor} text-white px-4 py-2 rounded-md`}
      >
        {`${buttonText} ${pair}`}
      </button>
    </div>
  );
}
