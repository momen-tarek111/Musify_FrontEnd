import { Toaster } from "react-hot-toast"
import Login from "./components/Login"
import Register from "./components/Register"
import Display from "./components/Display"
import AuthWrapper from "./components/AuthWrapper"
import Sidebar from "./components/Sidebar"
import { useContext } from "react"
import { PlayerContext } from "./context/PlayerContext"
import Player from "./components/Player"

function App() {
  const {audioRef,track}=useContext(PlayerContext)
  return (
    <>
      <Toaster/>
      <AuthWrapper>
          {/* Changed h-screen to h-[100dvh] (Dynamic Viewport Height) and added flex-col */}
          <div className="h-[100dvh] bg-black flex flex-col">
            
            {/* Replaced h-[90%] with flex-1 so it dynamically fills space above the player.
                Added overflow-hidden so scrolling happens inside the Display component, not the whole page. */}
            <div className="flex-1 flex overflow-hidden">
              <Sidebar/>
              <Display/>
            </div>
            
            <Player />
            
            <audio 
              ref={audioRef}
              src={track?track.file:""}
              preload="auto"
            ></audio>
          </div>
      </AuthWrapper>
    </>
  )
}

export default App