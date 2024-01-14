import "@/styles/globals.css"
import "leaflet/dist/leaflet.css"
import { ClerkProvider } from "@clerk/nextjs"
import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      /> */}
      {/* <SessionProvider session={session}> */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <Component {...pageProps} />
      {/* </SessionProvider> */}
    </>
  )
}
