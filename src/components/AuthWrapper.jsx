import {useState} from 'react'
import { useAuth } from '../context/AuthContext'
import Register from './Register';
import Login from './Login';

function AuthWrapper({children}) {
    const {isAuthenticated}=useAuth();
    const [showRegister, setShowRegister] = useState(false);
    if(!isAuthenticated()){
        return showRegister ?(
            <Register onSwitchToLogin={()=> setShowRegister(false)}/>
        ):(
            <Login onSwitchToRegister={()=> setShowRegister(true)}/>
        )
    }
    return children;
}

export default AuthWrapper