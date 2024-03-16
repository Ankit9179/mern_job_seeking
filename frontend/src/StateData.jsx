import React, { createContext, useState } from 'react'
import App from './App'

//create conteconext
export const Context = createContext({ isAuthorized: false })

const StateData = () => {
    //state 
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [user, setUser] = useState({})
    return (
        <Context.Provider value={{ isAuthorized, setIsAuthorized, user, setUser }}>
            <App />
        </Context.Provider>
    )
}

export default StateData