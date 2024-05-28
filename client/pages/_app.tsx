import "@/styles/globals.css";
import {AppProps} from 'next/app';
import {useEffect, useState} from 'react';
import {AuthProvider} from "@/components/authContext";

function App({Component, pageProps}: AppProps) {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);

  return (
      <AuthProvider>
          {render ? <Component {...pageProps} /> : null}
      </AuthProvider>
  )
}
export default App;