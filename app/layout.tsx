import './globals.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-gray-100">
        {/* Header / Navbar */}
        <Header />

        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            {children}
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
