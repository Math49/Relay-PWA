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
        <title>{title}</title>
        {children}
        </head>
          
  );
}
