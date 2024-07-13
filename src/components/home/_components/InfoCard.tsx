export default function InfoCard({ label, value }: { label: string; value: string }) {
    return (
      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <p className="font-bold text-sm">{value}</p>
      </div>
    );
  }
  