import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter,Route,Router,Routes} from 'react-router-dom';
import Login from './components/Member/Login';
import Register from './components/Member/Register';
import BlogList from './components/Blog/BlogList';
import BlogId from './components/Blog/BlogId';
import Update from './components/Account/Update';
import MyProduct from './components/Account/MyProduct';
import Add from './components/Account/Add';
import Edit from './components/Account/Edit';
import Home from './components/Home/Home';
import store from './store';
import { Provider } from 'react-redux';
import Cart from './components/Cart/Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <App>
            <Routes>

              <Route path='/home' element={<Home/>}/>
              <Route path='/' element={<Home/>}/>

              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              
              <Route path='/blog/list' element={<BlogList/>}/>
              <Route path='/blog/detail/:id' element={<BlogId/>}/>

              <Route path='/account/update' element={<Update/>}/>
              <Route path='/account/list' element={<MyProduct/>}/>
              <Route path='/account/add' element={<Add/>}/>
              <Route path='/account/edit' element={<Edit/>}/>

              <Route path='/cart' element={<Cart/>}/>
              

            </Routes>
          </App>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
