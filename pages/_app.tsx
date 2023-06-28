import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { store } from '../src/redux/store';



function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Provider store={store}>
      <Component {...pageProps} />
      <ToastContainer />
    </Provider>
  </>
}

export default MyApp
