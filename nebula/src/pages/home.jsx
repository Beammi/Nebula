import SearchBar from "@/components/SearchBar"
import ProfileButton from "@/components/ProfileButton"
export default function Home() {
  return (
    <div className="flex items-center justify-between p-4">
      <SearchBar text="Search"></SearchBar>
      <ProfileButton text="NL"></ProfileButton>
    </div>
  )
}
