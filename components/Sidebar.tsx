export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-gray-100 hidden md:flex flex-col">
      <div className="p-4 font-bold text-lg border-b border-gray-700">Menu</div>
      <nav className="flex-1 p-4 space-y-2">
        <a href="/reports" className="block px-3 py-2 rounded hover:bg-gray-700">📊 Reports</a>
        <a href="/products" className="block px-3 py-2 rounded hover:bg-gray-700">📦 Products</a>
        <a href="/transactions" className="block px-3 py-2 rounded hover:bg-gray-700">💰 Transactions</a>
        <a href="/customers" className="block px-3 py-2 rounded hover:bg-gray-700">👥 Customers</a>
        <a href="/suppliers" className="block px-3 py-2 rounded hover:bg-gray-700">🏭 Suppliers</a>
      </nav>
    </aside>
  );
}
