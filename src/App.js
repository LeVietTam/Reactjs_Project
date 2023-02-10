import logo from './logo.svg';
import './App.css';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MenuLeft from './components/Layout/MenuLeft';
import { useLocation } from 'react-router-dom';
import Account from './components/Layout/Account';
function App(props) {
  let param = useLocation();

  return (
    <>
      <Header/>
        <section>
          <div className='container'>
            <div className='row'>
              {param['pathname'].includes('/account/') ? <Account/> : <MenuLeft/> &&  param['pathname'].includes('/cart') ? '' : ''}
              {props.children}
            </div>
          </div>
        </section>
      <Footer/>
    </>
    
  );
}

export default App;
