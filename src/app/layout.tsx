export const metadata = {
  title: "Furia ChatBot",
  description: "ChatBot da FURIA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/furia-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
