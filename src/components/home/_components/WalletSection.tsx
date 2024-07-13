import React, { useState } from "react";

type WalletSectionProps = {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
};

export default function WalletSection({
  balance,
  setBalance,
}: WalletSectionProps) {
  const [newBalance, setNewBalance] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setNewBalance(isNaN(value) ? 0 : value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBalance((prev) => prev + newBalance);
  };

  return (
    <div className="flex-1 max-w-80">
      <div className="bg-white flex flex-col gap-4 h-full">
        <div className="max-h-40 w-full p-4 rounded-lg">
          <h2 className="text-sm font-medium mb-4">Current Balance</h2>
          <div className="text-3xl font-bold">{balance}</div>
        </div>
        <div className=" p-4 rounded-lg">
          <form onSubmit={handleSubmit}>
            <label htmlFor="newBalance" className="block mb-2">
              Update Balance
              <input
                type="number"
                id="newBalance"
                name="newBalance"
                className="w-full border-gray-300 rounded-md p-2 mt-1 bg-slate-100"
                value={newBalance}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
            >
              Update Balance
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
