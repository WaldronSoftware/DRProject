import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { UserProvider } from "../context/userContext";
import { MarkersProvider } from "../context/markersContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <MarkersProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MarkersProvider>
    </UserProvider>
  );
}

export default MyApp;
