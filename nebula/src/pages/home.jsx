import SearchBar from "@/components/SearchBar";
import ProfileButton from "@/components/ProfileButton";
import DynamicMap from "@/components/DynamicMap";

export default function Home() {
  return (
    <div className="relative h-screen">
      <div className="absolute z-10 top-0 left-0 right-0 flex items-center justify-between p-4">
        <SearchBar text="Search" />
        <ProfileButton text="NL" />
      </div>
      <div className="absolute z-0 w-full h-full">
        <DynamicMap />
      </div>
    </div>
  );
}
