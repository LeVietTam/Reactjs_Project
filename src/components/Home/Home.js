import axios from 'axios';
import React from 'react'
import {qtyDecrement, qtyIncrement} from '../../actions/cartQty'
import { useDispatch } from 'react-redux';
const Home = () => {
    const [data,setData] = React.useState('');
    const dispatch = useDispatch()

    React.useEffect(()=>{
        axios.get('http://localhost/laravel/laravel/public/api/product')
        .then(res=>{
            setData(res.data.data)
        })
    },[])

    const handleCart = (e) => {
        e.preventDefault();
        const idProduct = e.target.id;
        let check = 1;
        let prdCart = {};
        let productCart = localStorage.getItem("Cart")
        if(productCart){
            prdCart = JSON.parse(productCart)
            Object.keys(prdCart).map((key,index)=>{
                if(idProduct == key){
                    check = 2
                    prdCart[key] += 1   
                }
            })
        }

        if(check == 1){
            prdCart[idProduct] = 1
        }

        let action = qtyIncrement()
        dispatch(action)
        
        localStorage.setItem("Cart",JSON.stringify(prdCart))
    }



    const renderData = () => {
        return Object.keys(data).map((value,index)=>{
            let image = JSON.parse(data[value].image)
            return (
                <div className="col-sm-4" key={index}>
                    <div className="product-image-wrapper">
                        <div className="single-products">
                        <div className="productinfo text-center">
                            <img src={'http://localhost/laravel/laravel/public/upload/user/product/' + data[value].id_user + '/' + image[0]} alt="" />
                            <h2>{data[value].price}</h2>
                            <p>{data[value].name}</p>
                            <a href="#" className="btn btn-default add-to-cart">
                            <i className="fa fa-shopping-cart" />
                            Add to cart
                            </a>
                        </div>
                        <div className="product-overlay">
                            <div className="overlay-content">
                            <h2>{value.price}</h2>
                            <p>{value.name}</p>
                            <a  className="btn btn-default add-to-cart" id={data[value].id} onClick={handleCart}>
                                <i className="fa fa-shopping-cart" />
                                Add to cart
                            </a>
                            </div>
                        </div>
                        </div>
                        <div className="choose">
                        <ul className="nav nav-pills nav-justified">
                            <li>
                            <a href="#">
                                <i className="fa fa-plus-square" />
                                Add to wishlist
                            </a>
                            </li>
                            <li>
                            <a href='' >
                                <i className="fa fa-plus-square" />
                                Add to compare
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            )
        })
    }


  return (
        <div className="col-sm-9 padding-right">
            <div className="features_items">
                {/*features_items*/}
                <h2 className="title text-center">Features Items</h2>
                {renderData()}
            </div>
        </div>

  )
}

export default Home
