function UserStatsCard({ title, value }) {
  return (
    <div className="border border-gray-200 p-6">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {title}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
        {value}
      </h2>
    </div>
  );
}

export default UserStatsCard;