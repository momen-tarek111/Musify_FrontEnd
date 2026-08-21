import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
function SongItem({image,name,desc,id}) {
  const { playWithId } = useContext(PlayerContext);
  return (
    <div onClick={()=>playWithId(id)} className='min-w-[180px] max-w-[200px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img src={image} alt='song image' className='rounded min-h-[176px]'/>
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-200 text-sm'>{desc}</p>
    </div>
  )
}

export default SongItem