import '@/App.css'
import Home from '#/home';
import Layout from '@/layout';
import About from '#/about';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import { Suspense } from "react";
import PageNotFound from './components/pageNotFound/pageNotFound';

const App:React.FC = () => {


  return (
    
    <BrowserRouter>
    <Suspense fallback={<h1 style={{margin:'Auto',marginTop:'200px',width:'fit-content',fontSize:'6rem'}}>This page is loading</h1>}>
      <Routes>
        <Route  element={<Layout/>}>
          <Route  path='/' element={<Home/>} />
          <Route  path='/about' element={<About/>} />
        </Route>
        <Route path='*' element={<PageNotFound/>}></Route>
      </Routes>
    </Suspense>
      </BrowserRouter>
    
  )
}

export default App
