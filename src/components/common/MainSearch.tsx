import { IoIosSearch } from "react-icons/io";

export default function MainSearch() {
  return (
    <div className="flex bg-bl1 w-3/6 px-3 py-2 rounded-lg gap-2 items-center">
        <IoIosSearch className="text-2xl text-gray-500 font-extrabold"/>
        <input type="text" placeholder="محصول را سرچ کنید ..." className="bg-inherit grow text-lg focus:outline-none"/>
    </div>
  )
}
