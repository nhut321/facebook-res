import { useContext,useState, useEffect, memo } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import HomeContextProvider from './contexts/HomeContext'
import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/contents/Home'
import Settings from './components/contents/Settings'
import Chat from './components/contents/Chat'
import Me from './components/contents/Me'
import OtherUser from './components/contents/Me/OtherUser'
import PostItemDetail from './components/contents/Home/PostItemDetail'
import './App.css';

function App() {
  const [useOnline, setUserOnline] = useState([])
  const Auth = useContext(AuthContext)
  const [switchLogin, setSwitchLogin] = useState(false)
  return (
    <div className="App">
      {
          Auth.spinner
          ?
          <div className="spinner-border" role="status" style={{position: 'fixed',
    top: '25%'}}>
            <span className="sr-only">Loading...</span>
          </div>
          :
          <></>
      }
      {
        Auth.state.isLogin 
        ? 
          <HomeContextProvider>
            <Header />
            <div className='container' style={{marginTop: '70px'}}>
              <Routes>
                <Route path='/settings' element={<Settings />}/>
                <Route path='/messages' element={<Chat />}/>
                <Route path='/posts/detail/:id' element={<PostItemDetail />}/>
                <Route path='/user/:user-id/*' element={<OtherUser />}/>
                <Route path='/me/*' element={<Me />}/>
                <Route path='/' element={<Home />}/>
              </Routes>
            </div>
          </HomeContextProvider>
        :
          <>
          <Routes>
            <Route path='/login' element={<Login />}>
            </Route>
            <Route path='/register' element={<Register />}>
            </Route>
          </Routes>
          </>
      }

    </div>
  );
}

export default memo(App);
