import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext'
import { ListMusic, Maximize2, Mic, Minimize2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Speaker, Volume2 } from 'lucide-react';

function Player() {

    const {
        track,
        audioRef,
        seekBar,
        seekBg,
        playStatus,
        play,
        pause,
        time,
        previous,
        next,
        seekSong,
        repeat,
        toggleRepeat,
        songsData
    } = useContext(PlayerContext);

    const currentIndex = songsData.findIndex(
        item => item._id === track?._id
    );

    const isFirstSong = currentIndex === 0;
    const isLastSong = currentIndex === songsData.length - 1;
  return track?(
    <>
        <audio ref={audioRef} />
            <div className='h-[80px] w-full shrink-0 bg-black flex justify-between items-center text-white px-4'>            <div className='hidden lg:flex items-center gap-4'>
                <img src={track.imageUrl} alt='' className='w-12'/>
                <div>
                    <p>{track.name}</p>
                    <p>{track.desc}</p>
                </div>
            </div>
            <div className='flex flex-col items-center gap-1 m-auto'>
                <div className='flex gap-4'>
                    <Shuffle className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
                    <SkipBack
                        onClick={!isFirstSong ? previous : undefined}
                        className={`w-4 h-4 transition-colors ${
                            isFirstSong
                                ? "text-gray-600 cursor-not-allowed"
                                : "text-white cursor-pointer hover:text-green-500"
                        }`}
                    />
                    {playStatus?(
                        <Pause onClick={pause} className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
                    ):(
                        <Play onClick={play} className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
                    )}
                    <SkipForward
                        onClick={!isLastSong ? next : undefined}
                        className={`w-4 h-4 transition-colors ${
                            isLastSong
                                ? "text-gray-600 cursor-not-allowed"
                                : "text-white cursor-pointer hover:text-green-500"
                        }`}
                    />
                    <Repeat
                        onClick={toggleRepeat}
                        className={`w-4 h-4 cursor-pointer transition-colors ${
                            repeat
                                ? "text-green-500"
                                : "text-white hover:text-green-500"
                        }`}
                    />
                </div>
                <div className='flex items-center gap-5'>
                    <p>
                        {time.currentTime.minute}:{time.currentTime.second}
                    </p>
                    <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
                        <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'/>
                    </div>
                    <p>{track.duration}</p>
                </div>
            </div>
            <div className='hidden lg:flex items-center gap-2 opacity-75'>
                <ListMusic className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
                <Mic className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
                <Speaker className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
                <Volume2 className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
                <Minimize2 className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
                <Maximize2 className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
            </div>
        </div>
    </>
  ):null
}

export default Player