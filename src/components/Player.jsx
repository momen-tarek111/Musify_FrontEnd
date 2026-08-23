import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import {
    ListMusic,
    Maximize2,
    Mic,
    Minimize2,
    Pause,
    Play,
    Repeat,
    Shuffle,
    SkipBack,
    SkipForward,
    Speaker,
    Volume2
} from "lucide-react";

function Player() {

    const {
        track,
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

    const isFirstSong =
        currentIndex === 0;

    const isLastSong =
        currentIndex === songsData.length - 1;

    return track ? (
        <div className="h-[80px] w-full shrink-0 bg-black flex justify-between items-center text-white px-2 sm:px-4">

            {/* LEFT */}
            <div className="flex items-center gap-3 sm:gap-4 shrink-0">

                <img
                    src={track.imageUrl}
                    alt=""
                    className="w-14 h-14 sm:w-16 sm:h-16 lg:w-12 lg:h-12 object-cover rounded-md shadow-lg shrink-0"
                />

                <div className="hidden lg:block">
                    <p>{track.name}</p>

                    <p className="text-sm text-gray-400">
                        {track.desc}
                    </p>
                </div>

            </div>

            {/* CENTER */}
            <div className="flex flex-col items-center gap-1 flex-1 px-3 max-w-[500px]">

                {/* CONTROLS */}
                <div className="flex gap-4">

                    <Shuffle
                        className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
                    />

                    {/* PREVIOUS */}
                    <SkipBack
                        onClick={
                            !isFirstSong
                                ? previous
                                : undefined
                        }
                        className={`w-4 h-4 transition-colors ${
                            isFirstSong
                                ? "text-gray-600 cursor-not-allowed"
                                : "text-white cursor-pointer hover:text-green-500"
                        }`}
                    />

                    {/* PLAY / PAUSE */}
                    {playStatus ? (
                        <Pause
                            onClick={pause}
                            className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
                        />
                    ) : (
                        <Play
                            onClick={play}
                            className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
                        />
                    )}

                    {/* NEXT */}
                    <SkipForward
                        onClick={
                            !isLastSong
                                ? next
                                : undefined
                        }
                        className={`w-4 h-4 transition-colors ${
                            isLastSong
                                ? "text-gray-600 cursor-not-allowed"
                                : "text-white cursor-pointer hover:text-green-500"
                        }`}
                    />

                    {/* REPEAT */}
                    <Repeat
                        onClick={toggleRepeat}
                        className={`w-4 h-4 cursor-pointer transition-colors ${
                            repeat
                                ? "text-green-500"
                                : "text-white hover:text-green-500"
                        }`}
                    />

                </div>

                {/* PROGRESS */}
                <div className="flex items-center gap-2 sm:gap-4 w-full">

                    <p className="text-xs sm:text-sm min-w-[30px]">
                        {time.currentTime.minute}:
                        {String(
                            time.currentTime.second
                        ).padStart(2, "0")}
                    </p>

                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        className="w-full bg-gray-300 rounded-full cursor-pointer"
                    >
                        <hr
                            ref={seekBar}
                            className="h-1 border-none w-0 bg-green-800 rounded-full"
                        />
                    </div>

                    <p className="text-xs sm:text-sm min-w-[35px]">
                        {track.duration}
                    </p>

                </div>

            </div>

            {/* RIGHT */}
            <div className="hidden lg:flex items-center gap-2 opacity-75 shrink-0">

                <ListMusic
                    className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
                />

                <Mic
                    className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
                />

                <Speaker
                    className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
                />

                <Volume2
                    className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
                />

                <Minimize2
                    className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
                />

                <Maximize2
                    className="w-4 h-4 cursor-pointer text-white hover:text-green-500 transition-colors"
                />

            </div>

        </div>
    ) : null;
}

export default Player;