export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
        <title>My App — Static Export</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
