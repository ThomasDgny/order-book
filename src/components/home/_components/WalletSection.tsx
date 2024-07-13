export default function WalletSection({ balance }: { balance: number }) {
    return (
      <div className="flex-1 max-w-80">
        <div className="flex flex-col gap-4 h-full">
          <div className="h-full w-full bg-slate-100">{balance}</div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Update Form</h2>
            Update balance Form
          </div>
        </div>
      </div>
    );
  }