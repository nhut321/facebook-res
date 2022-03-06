import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import Header from './components/Header'
import Login from './components/Login'
import Home from './components/contents/Home'
import Me from './components/contents/Me'
import OtherUser from './components/contents/Me/OtherUser'
import PostItemDetail from './components/contents/Home/PostItemDetail'
import './App.css';

function App() {
  const Auth = useContext(AuthContext)
  return (
    <div className="App">
      {
        Auth.state.isLogin 
        ? 
          <>
            <Header />
            <div style={{marginTop: '70px'}}>
              <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/posts/detail/:id' element={<PostItemDetail />}/>
                <Route path='/me/*' element={<Me />}/>
                <Route path='/user/:id/*' element={<OtherUser />}/>
              </Routes>
            </div>
          </>
        :
          <Login />
      }

    </div>
  );
}

export default App;
