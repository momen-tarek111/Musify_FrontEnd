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
          <div className="h-screen bg-black">
            <div className="h-[90%] flex">
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