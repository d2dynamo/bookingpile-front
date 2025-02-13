import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
        // dangerouslySetInnerHTML={{
        //   __html: `
        //     (function() {
        //       try {
        //         if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        //           document.documentElement.classList.add('dark');
        //         }
        //       } catch (e) {}
        //     })();
        //   `,
        // }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
