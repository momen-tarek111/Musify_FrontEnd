import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Register from "./components/Register";
import Display from "./components/Display";
import AuthWrapper from "./components/AuthWrapper";
import Sidebar from "./components/Sidebar";
import { useContext } from "react";
import { PlayerContext } from "./context/PlayerContext";
import Player from "./components/Player";

function App() {

    const {
        audioRef,
        track
    } = useContext(PlayerContext);

    return (
        <>
            <Toaster />

            <AuthWrapper>

                <div className="h-[100dvh] bg-black flex flex-col">

                    {/* MAIN CONTENT */}
                    <div className="flex-1 flex overflow-hidden">

                        <Sidebar />

                        <Display />

                    </div>

                    {/* PLAYER */}
                    <Player />

                    {/* ONE AUDIO ELEMENT ONLY */}
                    <audio
                        ref={audioRef}
                        preload="auto"
                    />

                </div>

            </AuthWrapper>
        </>
    );
}

export default App;