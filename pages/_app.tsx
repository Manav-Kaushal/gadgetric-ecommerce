import ErrorBoundary from "@components/ErrorBoundary";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <GoogleAnalytics trackPageViews />
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
