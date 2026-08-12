function ProfileHeader() {
  return (
    <div className="border border-gray-200 bg-white p-6">
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
        Account
      </span>
      <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
        My Account
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Manage your profile, orders, wishlist and security.
      </p>
    </div>
  );
}

export default ProfileHeader;