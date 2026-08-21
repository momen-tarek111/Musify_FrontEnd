import { createContext, useEffect, useRef } from "react";
import { useState } from "react";
import { API_BASE_URL, useAuth } from "./AuthContext";
import axios from "axios";
export const PlayerContext=createContext();
export const PlayerContextProvider=({children})=>{
    const [repeat, setRepeat] = useState(false);
    const [songsData, setSongsData] = useState([]);
    const [albumsData, setAlbumsData] = useState([]);
    const [track,setTrack]=useState(songsData[0]);
    const [playStatus,setPlayStatus]=useState(false);
    const [time,setTime]=useState({
        currentTime:{
            second:0,
            minute:0
        },
        totalTime:{
            second:0,
            minute:0
        }
    })
    const {user,token,getAuthHeaders}=useAuth();
    const audioRef=useRef();
    const seekBg=useRef();
    const seekBar=useRef();
    const toggleRepeat = () => {
        setRepeat(prev => !prev);
    };
    const play=()=>{
        if (audioRef.current) {
            audioRef.current.play();
            setPlayStatus(true);
        }
    }
    const pause=()=>{
        if (audioRef.current) {
            audioRef.current.pause();
            setPlayStatus(false);
        }
    }

    const playWithId = async (id) => {
        const song = songsData.find(item => item._id === id);

        if (!song) return;

        await playSong(song);
    };

    const next = async () => {
        if (!track) return;

        const index = songsData.findIndex(
            item => item._id === track._id
        );

        if (index !== -1 && index < songsData.length - 1) {
            await playSong(songsData[index + 1]);
        }
    };

    const previous = async () => {
        if (!track) return;

        const index = songsData.findIndex(
            item => item._id === track._id
        );

        if (index > 0) {
            await playSong(songsData[index - 1]);
        }
    };

    const seekSong=async (e)=>{
        audioRef.current.currentTime=(e.nativeEvent.offsetX /seekBg.current.offsetWidth) * audioRef.current.duration
    }

    const getSongsData=async ()=>{
        try {
           const response=await axios.get(`${API_BASE_URL}/api/songs`,{headers:getAuthHeaders()});
           const songs=response.data.songs||[];
           setSongsData(songs);
           if(songs.length>0){
            setTrack(songs[0]);
           }
        } catch (error) {
            console.error(error)
            setSongsData([])
        }
    }
    
    const getAlbumsData=async()=>{
        try {
           const response=await axios.get(`${API_BASE_URL}/api/albums`,{headers:getAuthHeaders()});
           const albums=response.data.albums||[];
           setAlbumsData(albums);
        } catch (error) {
            console.error(error)
            setAlbumsData([])
        }
    }
    const playSong = async (song) => {
        if (!song || !audioRef.current) return;
        setTrack(song);
        audioRef.current.src = song.file;
        audioRef.current.load();
        try {
            await audioRef.current.play();
            setPlayStatus(true);
        } catch (error) {
            console.error("Error playing song:", error);
            setPlayStatus(false);
        }
    };
    useEffect(()=>{
        if(user&&token){
            getAlbumsData();
            getSongsData();
        }
    },[user,token])

    useEffect(()=>{
        const audio=audioRef.current;
        if(!audio) return;
        const updateSeekBar=()=>{
            if(seekBar.current&&audio.duration){
                const progress=(audio.currentTime/audio.duration)*100;
                seekBar.current.style.width=Math.floor(progress)+"%";
                setTime({
                    currentTime:{
                        second:Math.floor(audio.currentTime%60),
                        minute:Math.floor(audio.currentTime/60)
                    },
                    totalTime:{
                        second:Math.floor(audio.duration%60),
                        minute:Math.floor(audio.duration/60)
                    }
                });
            }
        };
        const handleLoadedMetadata=()=>{
            if(seekBar.current){
                seekBar.current.style.width="0%";
            }
        }
        audio.addEventListener('timeupdate',updateSeekBar)
        audio.addEventListener('loadedmetadata',handleLoadedMetadata)
        return ()=>{
            audio.removeEventListener('timeupdate',updateSeekBar)
            audio.removeEventListener('loadedmetadata',handleLoadedMetadata)
        }
    },[track])

    useEffect(() => {
        const audio = audioRef.current;

        if (!audio) return;

        const handleEnded = async () => {
            if (repeat) {
                audio.currentTime = 0;

                try {
                    await audio.play();
                    setPlayStatus(true);
                } catch (error) {
                    console.error("Error replaying song:", error);
                    setPlayStatus(false);
                }

                return;
            }

            const index = songsData.findIndex(
                item => item._id === track?._id
            );

            if (index !== -1 && index < songsData.length - 1) {
                await playSong(songsData[index + 1]);
            } else {
                // Last song finished
                setPlayStatus(false);
            }
        };

        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("ended", handleEnded);
        };
    }, [track, songsData, repeat]);

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
        playWithId,
        previous,
        next,
        seekSong
    };
    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    )
}
