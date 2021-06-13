import { DocumentInitialProps } from "next/document";
import Document, {Html, Head, Main, NextScript, DocumentContext} from "next/document";

class MyDocument extends Document { 

  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render(): JSX.Element {
    return (
      <Html lang="ru">
        <Head/>
          <body>
            <Main/>
            <NextScript></NextScript>
          </body>
      </Html>
    );
  }
}

export default MyDocument;