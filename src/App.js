import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './pages/home/Home';
import Signup from './pages/signup/Signup';
import Login from './pages/login/Login';
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import Create from './pages/create/Create';
import Note from './pages/note/Note';
import ThemeSelector from './components/ThemeSelector';
import { useTheme } from './hooks/useTheme';
import './App.css'
import { useEffect } from 'react';

function App() {
  const {authIsReady, user, verify} = useAuthContext()
  const {mode} = useTheme()
  useEffect(() => {
    document.body.style.background = mode === 'light'? '#dfdfdf' : '#333'
  },[mode])

  return (
    <div className={`App ${mode}`}>
    {authIsReady && (
      <BrowserRouter>
      <Navbar/>
      <ThemeSelector/>
        <Switch>
          <Route exact path='/'>
            {user ? <Home/> : <Redirect to='/login'/>}
          </Route>
          <Route path='/create'>
            {user ? <Create uid={user.uid}/> : <Redirect to='/login'/>}
          </Route>
          <Route path='/note/:id'>
            {user ? <Note/> : <Redirect to='/login'/>}
          </Route>
          <Route path='/signup'>
            {!user ? <Signup/> : <Redirect to='/'/>}
          </Route>
          <Route path='/login'>
            {!user ? <Login/> : <Redirect to='/'/>}
          </Route>
        </Switch>
      </BrowserRouter>
    )}
      
    </div>
  );
}

export default App;
