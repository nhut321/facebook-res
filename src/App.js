import { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthContext } from './contexts/AuthContext'
import Header from './components/Header'
import Login from './components/Login'
import Home from './components/contents/Home'
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
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/posts/detail/:id' element={<PostItemDetail />}/>
            </Routes>
          </>
        :
          <Login />
      }

    </div>
  );
}

export default App;
