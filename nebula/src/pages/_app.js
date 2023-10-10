import "@/styles/globals.css"
import 'leaflet/dist/leaflet.css';
export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      /> */}

      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap" rel="stylesheet"/>

      <Component {...pageProps} />
    </>
  );
}
