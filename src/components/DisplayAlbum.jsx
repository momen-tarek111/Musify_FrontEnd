import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from "../assets/assets";
import { Clock } from "lucide-react";
function DisplayAlbum({album}) {
  const {albumsData,songsData,playWithId}=useContext(PlayerContext);
  return albumsData?(
    <>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img src={album?.imageUrl} alt="" className="w-48 rounded" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {album?.name}
          </h2>
          <h4>{album?.desc}</h4>
          <p className="mt-1">
            <img src={assets.logo} alt="logo" className="inline-block w-5 mr-1"/>
            <b>Musify</b> . 1,23,456 likes . <b>6 Songs,</b> about 2 hr 30min
          </p>
        </div>
      </div>

      {/* Scrollable wrapper - only scrolls if content doesn't fit */}
      <div className="overflow-x-auto mt-10">
        <div className="grid grid-cols-[minmax(200px,1fr)_150px_50px] sm:grid-cols-[minmax(250px,1fr)_180px_150px_50px] mb-4 pl-2 text-[#a7a7a7]">
          <p>
            <b className="mr-4">#</b>
          </p>
          <p>Album</p>
          <p className="hidden sm:block">Date Added</p>
          <Clock className="m-auto w-4" />
        </div>
        <hr />
        {
          songsData.filter(song=>song.album===album?.name)
          .map((item,index)=>(
            <div
              onClick={()=>playWithId(item._id)}
              className="grid grid-cols-[minmax(200px,1fr)_150px_50px] sm:grid-cols-[minmax(250px,1fr)_180px_150px_50px] gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
              key={index}>
                <p className="text-white truncate">
                  <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                  <img src={item.imageUrl} alt="" className="inline w-10 mr-5 min-h-[40px]" />
                  {item.name}
                </p>
                <p className="text-[15px] truncate">{album?.name}</p>
                <p className="text-[15px] hidden sm:block">5 days ago</p>
                <p className="text-[15px] m-auto">{item.duration}</p>
            </div>
          ))
        }
      </div>
    </>
  ):null;
}

export default DisplayAlbum