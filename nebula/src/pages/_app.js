import "@/styles/globals.css"
import 'leaflet/dist/leaflet.css';
export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      /> */}
      <Component {...pageProps} />
    </>
  );
}
