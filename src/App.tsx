import '@/App.css'
import Home from '#/home';
import Layout from '@/layout';
import Hero from '#/home/hero';
import Catalog from '#/home/catalog';

const App:React.FC = () => {


  return (
    <>
      <Layout>
        <Home>
          <Hero/>
          <Catalog/>
        </Home>
      </Layout>
    </>
  )
}

export default App
