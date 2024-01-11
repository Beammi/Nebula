import "@/styles/globals.css"
import "leaflet/dist/leaflet.css"
import { ClerkProvider } from "@clerk/nextjs"

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      /> */}
      <ClerkProvider {...pageProps} afterSignInUrl="/home" afterSignUpUrl="/home">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <Component {...pageProps} />
      </ClerkProvider>
    </>
  )
}
