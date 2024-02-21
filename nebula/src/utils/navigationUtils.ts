// navigationUtils.ts
export const getCurrentLocation = (): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      console.log("Geolocation is supported")
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve([position.coords.latitude, position.coords.longitude])
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message)
          reject(error) // Reject the promise with the error
        },
        {
          enableHighAccuracy: true,
          timeout: 60000,
          maximumAge: 0,
        }
      )
    } else {
      console.log("Geolocation is not supported by your browser")
      reject(new Error("Geolocation is not supported by your browser"))
    }
  })
}

export const getPlaceName = async (
  latitude: number,
  longitude: number
): Promise<string> => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`

  try {
    const response = await fetch(url)
    const data = await response.json()
    console.log("Place name: ", data.display_name)
    return data.display_name // Ensure this returns a string as declared
  } catch (error) {
    console.error("Error fetching place name: ", error)
    throw error // Rethrow or handle error appropriately
  }
}
