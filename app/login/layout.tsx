export default function LoginLayout({ children }: { children: React.ReactNode }) {
  // Layout khusus login → tanpa header/sidebar/footer
  return (
    <html lang="en">
      <body className="bg-gray-100 flex items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  );
}
