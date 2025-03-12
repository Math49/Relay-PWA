"use client";

export default function HeadLayout({ children, title }) {
  return (
    <head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />
      <link rel="icon" href="/images/elements/logo-relay.svg" />
      <link rel="manifest" href="/manifest.json" />
      <script src="https://kit.fontawesome.com/3dbf30e8e4.js" crossOrigin="anonymous"></script>
      <title>{title}</title>
      {children}
    </head>
  );
}
