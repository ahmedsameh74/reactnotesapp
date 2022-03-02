import { createContext, useReducer } from "react";

export const ThemeContext = createContext()

const themeReducer = (state, action) => {
    switch(action.type){
        case 'CHANGE_COLOR':
            return {...state, color: action.payload}
        case 'CHANGE_MODE':
            return {...state, mode: action.payload}
        default:
            return state
    }

}

export function ThemeProvider({children}) {
    let colStyle = localStorage.getItem('color') ?String(localStorage.getItem('color')) : '#58249c';
    let eyeMode = localStorage.getItem('mode') ?localStorage.getItem('mode') : 'light';
    // console.log(colStyle)
    const [state, dispatch] = useReducer(themeReducer, {
        color: colStyle,
        mode: eyeMode
    })
    

    const changeColor = (color) => {
        localStorage.setItem('color', color)
        colStyle =  String(localStorage.getItem('color'))
        dispatch({type: 'CHANGE_COLOR', payload: colStyle})
    }
    const changeMode = (mode) => {
        localStorage.setItem('mode', mode)
        eyeMode = localStorage.getItem('mode')
        dispatch({type: 'CHANGE_MODE', payload: mode})
    }

    return (
        <ThemeContext.Provider value={{...state, changeColor, changeMode}}>
            {children}
        </ThemeContext.Provider>
    )
}