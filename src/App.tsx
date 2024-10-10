import '@/App.css'

import Layout from '@/layout';
import { Route,Routes,BrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from "react";
import PageNotFound from './components/pageNotFound/pageNotFound';
import CardPage from './components/individualCardPage/individualCardPage';
import Home from '#/home';

const LazyServices = lazy(() => import('./components/services/catalog') );
const LazyContact = lazy(() => import('./components/contact/contact'));
const LazyAbout = lazy(() => import('#/about'));

const App:React.FC = () => {


  return (
    
    <BrowserRouter>
      <Routes>
        <Route  element={<Layout/>}>
        
        <Route  path='/' element={    
          <Suspense fallback={<h1 style={{margin:'Auto',marginTop:'200px',width:'fit-content',fontSize:'6rem'}}>This page is loading</h1>}>
                <Home/>
          </Suspense>}/>
       
          <Route  path='/about' element={
                      <Suspense fallback={<h1 style={{margin:'Auto',marginTop:'200px',width:'fit-content',fontSize:'6rem'}}>This page is loading</h1>}>
            <LazyAbout/>
            </Suspense>
          } />

          <Route  path='/contact' element={
                      <Suspense fallback={<h1 style={{margin:'Auto',marginTop:'200px',width:'fit-content',fontSize:'6rem'}}>This page is loading</h1>}>
            <LazyContact/>
            </Suspense>
          } />

          <Route  path='/services' element={
                      <Suspense fallback={<h1 style={{margin:'Auto',marginTop:'200px',width:'fit-content',fontSize:'6rem'}}>This page is loading</h1>}>
            <LazyServices/>
            </Suspense>
          } />

          <Route
          path='/services/:id'
          element={<CardPage/>}
          />

        </Route>
        <Route path='*' element={<PageNotFound/>}></Route>
      </Routes>
  
      </BrowserRouter>
    
  )
}

export default App
