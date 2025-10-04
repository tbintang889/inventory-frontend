export default function Footer() {
  return (
    <footer className="bg-white shadow px-6 py-3 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Inventory Management. All rights reserved.
    </footer>
  );
}
