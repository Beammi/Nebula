export interface Place {
  id: number
  name: string
  latitude: number
  longitude: number
}

export interface Waypoint {
  id: number
  name: string
  latitude: number
  longitude: number
  // You can include additional properties specific to waypoints if they differ from places
}

export interface TourData {
  tourName: string
  description: string
  routePlaces: Place[]
  waypoints: Waypoint[] // Specify that waypoints might have the same structure or a different one
  officialTag: string
  openTagModal: boolean
  additionalTags: string[] // Include additionalTags in your TourData
  images: string[]
}

export interface TourContextType {
  tourData: TourData
  setTourData: (tourData: TourData) => void
  addPlace: (place: Place) => void
  addWaypoint: (waypoint: Waypoint) => void // Method for adding a waypoint
  removeWaypoint: (waypointId: number) => void // Method for removing a waypoint by its id
  setOfficialTag: (tag: string) => void // Method to update the official tag
  toggleOpenTagModal: () => void // Method to toggle the openTag modal
  addAdditionalTag: (tag: string) => void // Method to add an additional tag
  updateTags: (officialYag: string, addAdditionalTags: string[]) => void
  setImages: (image: string) => void
}
