import './globals.css';

export const metadata = {
  title: 'TokenStats - Crypto Tracker',
  description: 'This is my awesome website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        
          {children}
        
      </body>
    </html>
  );
}
