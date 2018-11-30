import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <style>
            {`
            * {
              margin: 0;
              padding: 0;
              line-height: 1.5;
            }
            body {
              background-color: #fafafa;
              font-family: Inter UI, sans-serif;
              height: 100%;
              margin: 0;
              padding: 0;
              width: 100%;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            `}
          </style>
          {this.props.styleTags}
          <title>
            DU Innovation Map
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link href="https://rsms.me/inter/inter-ui.css" rel="stylesheet" />
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
            rel="stylesheet"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
