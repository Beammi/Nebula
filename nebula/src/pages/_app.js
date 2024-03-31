import "@/styles/globals.css"
import "leaflet/dist/leaflet.css"
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import { LocationProvider } from "@/contexts/LocationContext" // Assuming LocationProvider is exported from LocationContext
import { TourProvider } from "@/contexts/TourContext"
export default function App({ Component, pageProps }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      {/* Wrap your Component with LocationProvider */}
      <LocationProvider>
        <TourProvider>
          <Component {...pageProps} />
        </TourProvider>
      </LocationProvider>
    </>
  )
}
