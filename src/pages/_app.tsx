import { AppProps } from "next/app";
import "semantic-ui-css/semantic.min.css";
import "../styles/globals.css";
import Layout from "@/components/layout";
import Context from "@/context/appContext";
import { SnackbarProvider } from "notistack";

const MyApp = ({ Component, pageProps, ...appProps }: AppProps) => {
  if (appProps.router.pathname.includes("/dashboard")) {
    return (
      <Context>
        <SnackbarProvider>
          <Layout>
            <Component {...pageProps} />;
          </Layout>
        </SnackbarProvider>
      </Context>
    );
  }
  return (
    <Context>
      <SnackbarProvider>
        <Component {...pageProps} />
      </SnackbarProvider>
    </Context>
  );
};

export default MyApp;
