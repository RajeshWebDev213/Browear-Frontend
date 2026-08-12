function DashboardCard({ title, value, icon: Icon, color, iconColor }) {
  return (
    <div className="flex items-center justify-between border border-gray-200 p-6 transition-colors hover:border-gray-300">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {title}
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          {value}
        </h2>
      </div>

      <div className={`flex h-14 w-14 items-center justify-center ${color}`}>
        <Icon size={26} className={iconColor} />
      </div>
    </div>
  );
}

export default DashboardCard;