import './globals.css';

export const metadata = {
  title: 'WearTrack Pro - Clothing Inventory & Courier OS',
  description: 'Apparel inventory, size-wise stock, and courier management system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
