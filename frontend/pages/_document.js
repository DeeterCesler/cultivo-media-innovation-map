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
              font-family: Cerebri Sans, sans-serif;
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
            Innovation Map
          </title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
