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
    
  return track ? (
    <>
        <audio ref={audioRef} />
        {/* Adjusted padding on very small screens (px-2) and larger (sm:px-4) */}
        <div className='h-[80px] w-full shrink-0 bg-black flex justify-between items-center text-white px-2 sm:px-4'>
            
            {/* 1. LEFT SECTION: Image & Text */}
            <div className='flex items-center gap-3 sm:gap-4 shrink-0'>
                {/* 
                  - Increased size on mobile (w-14/h-14 & sm:w-16/h-16) 
                  - Added object-cover and rounded-md for a cleaner look
                  - Added shrink-0 so the progress bar doesn't squash the image 
                */}
                <img 
                    src={track.imageUrl} 
                    alt='' 
                    className='w-14 h-14 sm:w-16 sm:h-16 lg:w-12 lg:h-12 object-cover rounded-md shadow-lg shrink-0'
                />
                
                <div className='hidden lg:block'>
                    <p>{track.name}</p>
                    <p className='text-sm text-gray-400'>{track.desc}</p>
                </div>
            </div>

            {/* 2. MIDDLE SECTION: Controls & Progress Bar */}
            {/* Added flex-1 so it takes up available middle space without crowding the left/right sections */}
            <div className='flex flex-col items-center gap-1 flex-1 px-3 max-w-[500px]'>
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
                    {playStatus ? (
                        <Pause onClick={pause} className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
                    ) : (
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
                
                <div className='flex items-center gap-2 sm:gap-4 w-full'>
                    <p className='text-xs sm:text-sm'>
                        {time.currentTime.minute}:{time.currentTime.second}
                    </p>
                    {/* Changed w-[60vw] to w-full so it flexes properly inside its parent */}
                    <div ref={seekBg} onClick={seekSong} className='w-full bg-gray-300 rounded-full cursor-pointer'>
                        <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'/>
                    </div>
                    <p className='text-xs sm:text-sm'>{track.duration}</p>
                </div>
            </div>
            
            {/* 3. RIGHT SECTION: Extra Controls */}
            {/* Added shrink-0 to prevent these from collapsing if screen is tight */}
            <div className='hidden lg:flex items-center gap-2 opacity-75 shrink-0'>
                <ListMusic className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
                <Mic className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
                <Speaker className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
                <Volume2 className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
                <Minimize2 className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
                <Maximize2 className='w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors'/>
            </div>
        </div>
    </>
  ) : null
}

export default Player