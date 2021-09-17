import { Provider } from "react-redux";

import "../styles/globals.css";
import "../assets/i18n/i18n";
import Layout from "../components/Layout/Layout";
import store from "../store/index";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <div id="modal"></div>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </CookiesProvider>
    </Provider>
  );
}

export default MyApp;
