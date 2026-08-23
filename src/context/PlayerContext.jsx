import { createContext, useContext, useEffect, useRef, useState } from "react";
import { API_BASE_URL, useAuth } from "./AuthContext";
import axios from "axios";

export const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
    const [repeat, setRepeat] = useState(false);

    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);

    const [track, setTrack] = useState(null);
    const [playStatus, setPlayStatus] = useState(false);

    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });

    const { user, token, getAuthHeaders } = useAuth();

    const audioRef = useRef(null);
    const seekBg = useRef(null);
    const seekBar = useRef(null);

    // =========================
    // Repeat
    // =========================

    const toggleRepeat = () => {
        setRepeat(prev => !prev);
    };

    // =========================
    // Play
    // =========================

    const play = async () => {
        const audio = audioRef.current;

        if (!audio || !track) {
            return;
        }

        try {
            /*
             * Make sure the audio element has the current track.
             * This fixes the problem where the first song exists
             * but audio has no source yet.
             */
            if (audio.src !== track.file) {
                audio.src = track.file;
                audio.load();
            }

            await audio.play();

            setPlayStatus(true);
        } catch (error) {
            console.error("Error playing song:", error);
            setPlayStatus(false);
        }
    };

    // =========================
    // Pause
    // =========================

    const pause = () => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        audio.pause();
        setPlayStatus(false);
    };

    // =========================
    // Play Song
    // =========================

    const playSong = async (song) => {
        const audio = audioRef.current;
        if (!song || !audio) {
            return;
        }

        try {
            // Stop current song
            audio.pause();

            // Change the current track
            setTrack(song);

            // Set the new audio source
            audio.src = song.file;

            // Start from beginning
            audio.currentTime = 0;

            // Load the new song
            audio.load();

            // Play immediately
            await audio.play();

            setPlayStatus(true);

        } catch (error) {
            console.error("Error playing song:", error);
            setPlayStatus(false);
        }
    };

    // =========================
    // Play Song By ID
    // =========================

    const playWithId = async (id) => {
        const song = songsData.find(item => item._id === id);

        if (!song) {
            return;
        }

        await playSong(song);
    };

    // =========================
    // Next
    // =========================

    const next = async () => {
        if (!track || songsData.length === 0) {
            return;
        }

        const index = songsData.findIndex(
            item => item._id === track._id
        );

        if (index !== -1 && index < songsData.length - 1) {
            await playSong(songsData[index + 1]);
        }
    };

    // =========================
    // Previous
    // =========================

    const previous = async () => {
        if (!track || songsData.length === 0) {
            return;
        }

        const index = songsData.findIndex(
            item => item._id === track._id
        );

        if (index > 0) {
            await playSong(songsData[index - 1]);
        }
    };

    // =========================
    // Seek
    // =========================

    const seekSong = (e) => {
        const audio = audioRef.current;

        if (!audio || !seekBg.current || !audio.duration) {
            return;
        }

        const clickPosition =
            e.nativeEvent.offsetX / seekBg.current.offsetWidth;

        audio.currentTime =
            clickPosition * audio.duration;
    };

    // =========================
    // Get Songs
    // =========================

    const getSongsData = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/songs`,
                {
                    headers: getAuthHeaders()
                }
            );

            const songs = response.data.songs || [];

            setSongsData(songs);

            if (songs.length > 0) {
                setTrack(songs[0]);
            } else {
                setTrack(null);
            }

        } catch (error) {
            console.error("Error loading songs:", error);

            setSongsData([]);
            setTrack(null);
        }
    };

    // =========================
    // Get Albums
    // =========================

    const getAlbumsData = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/api/albums`,
                {
                    headers: getAuthHeaders()
                }
            );

            const albums = response.data.albums || [];

            setAlbumsData(albums);

        } catch (error) {
            console.error("Error loading albums:", error);

            setAlbumsData([]);
        }
    };

    // =========================
    // Load Data
    // =========================

    useEffect(() => {
        if (user && token) {
            getAlbumsData();
            getSongsData();
        }
    }, [user, token]);

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const updateSeekBar = () => {
            if (
                seekBar.current &&
                audio.duration &&
                !isNaN(audio.duration)
            ) {
                const progress =
                    (audio.currentTime / audio.duration) * 100;

                seekBar.current.style.width =
                    Math.floor(progress) + "%";

                setTime({
                    currentTime: {
                        second: Math.floor(audio.currentTime % 60),
                        minute: Math.floor(audio.currentTime / 60)
                    },

                    totalTime: {
                        second: Math.floor(audio.duration % 60),
                        minute: Math.floor(audio.duration / 60)
                    }
                });
            }
        };

        const handleLoadedMetadata = () => {
            if (seekBar.current) {
                seekBar.current.style.width = "0%";
            }

            if (audio.duration && !isNaN(audio.duration)) {
                setTime(prev => ({
                    ...prev,

                    totalTime: {
                        second: Math.floor(audio.duration % 60),
                        minute: Math.floor(audio.duration / 60)
                    }
                }));
            }
        };

        audio.addEventListener(
            "timeupdate",
            updateSeekBar
        );

        audio.addEventListener(
            "loadedmetadata",
            handleLoadedMetadata
        );

        return () => {
            audio.removeEventListener(
                "timeupdate",
                updateSeekBar
            );

            audio.removeEventListener(
                "loadedmetadata",
                handleLoadedMetadata
            );
        };

    }, [track]);

    // =========================
    // Song Ended
    // =========================

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) {
            return;
        }

        const handleEnded = async () => {

            // Repeat current song
            if (repeat) {
                audio.currentTime = 0;

                try {
                    await audio.play();
                    setPlayStatus(true);
                } catch (error) {
                    console.error(
                        "Error replaying song:",
                        error
                    );

                    setPlayStatus(false);
                }

                return;
            }

            // Find current song
            const index = songsData.findIndex(
                item => item._id === track?._id
            );

            // Play next song
            if (
                index !== -1 &&
                index < songsData.length - 1
            ) {
                await playSong(
                    songsData[index + 1]
                );
            }

            // Last song
            else {
                setPlayStatus(false);

                audio.currentTime = 0;

                if (seekBar.current) {
                    seekBar.current.style.width = "0%";
                }
            }
        };

        audio.addEventListener(
            "ended",
            handleEnded
        );

        return () => {
            audio.removeEventListener(
                "ended",
                handleEnded
            );
        };

    }, [track, songsData, repeat]);

    // =========================
    // Context
    // =========================

    const contextValue = {
        getAlbumsData,
        getSongsData,

        songsData,
        albumsData,

        audioRef,
        seekBar,
        seekBg,

        track,
        setTrack,

        playStatus,
        setPlayStatus,

        repeat,
        toggleRepeat,

        time,
        setTime,

        play,
        pause,
        playSong,
        playWithId,
        previous,
        next,
        seekSong
    };

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};