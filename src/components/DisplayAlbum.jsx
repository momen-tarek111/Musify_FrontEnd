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
        <table className="w-full border-collapse text-[#a7a7a7]">
          <thead>
            <tr className="text-left border-b border-[#ffffff33]">
              <th className="font-normal pl-2 pb-4 whitespace-nowrap"><b className="mr-4">#</b></th>
              <th className="font-normal pb-4 px-2 whitespace-nowrap">Album</th>
              <th className="font-normal pb-4 px-2 whitespace-nowrap hidden sm:table-cell">Date Added</th>
              <th className="font-normal pb-4 px-2 text-center">
                <Clock className="inline-block w-4" />
              </th>
            </tr>
          </thead>
          <tbody>
            {
              songsData.filter(song=>song.album===album?.name)
              .map((item,index)=>(
                <tr
                  onClick={()=>playWithId(item._id)}
                  className="hover:bg-[#ffffff2b] odd:bg-[#ffffff08] cursor-pointer"
                  key={index}>
                    <td className="text-white pl-2 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                        <img src={item.imageUrl} alt="" className="inline w-10 mr-5 min-h-[40px]" />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="text-[15px] px-2 py-2 whitespace-nowrap">{album?.name}</td>
                    <td className="text-[15px] px-2 py-2 whitespace-nowrap hidden sm:table-cell">5 days ago</td>
                    <td className="text-[15px] px-2 py-2 text-center whitespace-nowrap">{item.duration}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>
  ):null;
}

export default DisplayAlbum