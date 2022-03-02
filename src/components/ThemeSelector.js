import { useTheme } from "../hooks/useTheme";
import './ThemeSelector.css'
import modeIcon from '../assest/mode.svg'

const themeColors = ['#58249c', '#249c6b', '#b70233']

export default function ThemeSelector () {
    const {changeColor, changeMode, mode} = useTheme()
    const toggleMode = () => {
        changeMode(mode === 'light' ? 'dark' : 'light')
    }

    return (
        <div className="theme-selector">
        <div className='mode-toggle'>
      <img
       src={modeIcon}
       alt='dark/light toggle icon'
       onClick = {toggleMode}
       style={{filter: mode === 'dark' ? 'invert(100%)' : 'invert(20%)'}}
      />
    </div>
            <div className="theme-buttons">
                {themeColors.map(color => (
                    <div
                        key={color}
                        onClick={() => changeColor(color)}
                        style={{background: color}}
                    />
                ))}
            </div>
        </div>
    )
}