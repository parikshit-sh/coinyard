import './globals.css';

export const metadata = {
  title: 'TokenStats - Crypto Tracker',
  description: 'This is my awesome website',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
          /* Add any other @import rules here */
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
