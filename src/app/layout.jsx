import "./globals.css";

export const metadata = {
  title: "Rick & Morty App",
  description: "Solo una app de Rick & Morty",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="">{children}</body>
    </html>
  );
}
