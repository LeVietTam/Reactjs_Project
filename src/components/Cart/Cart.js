import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { qtyDecrement, qtyIncrement } from '../../actions/cartQty'

const Cart = () => {
  const [data,setData] = React.useState('')
  let local = JSON.parse(localStorage.getItem('Cart'))
  const dispatch = useDispatch()


  React.useEffect(()=>{
    axios.post("http://localhost/laravel/laravel/public/api/product/cart" , local)
    .then(res=>{setData(res.data.data)})
    .catch(err => console.log(err))
  },[])

  const RenderImage = ({img,idUser}) => {
    const style = {
      "width": "100px",
      "objectFit": "fit",
      "margin": "10px 15px"
    }
    let image = JSON.parse(img)
    return <img style={style} src={'http://localhost/laravel/laravel/public/upload/user/product/' + idUser + '/' + image[0]} alt="" />
  }

  const clickIncrease = (e,product) => {
    e.preventDefault();
    let idProduct = product.id;
    let newData = [...data]

    if(idProduct){
      Object.keys(newData).map((value,key)=>{
        if(idProduct === newData[value].id){
          newData[value].qty += 1
        }
      })
    }
    
    Object.keys(local).map((value)=>{
      if(idProduct === parseInt(value)){
        local[value] += 1
      }
    })

    setData(newData)
    localStorage.setItem("Cart",JSON.stringify(local))

    const action = qtyIncrement()
    dispatch(action)
  }

  const clickDiminish = (e,product) => {
    e.preventDefault();
    let idProduct = product.id;
    let newData = [...data]

    if(idProduct){
      Object.keys(newData).map((value,key)=>{
        if(idProduct === newData[value].id){
          if(newData[value].qty > 1){
            newData[value].qty -= 1
          }
          else{
            delete newData[key]
          }
        }
      })
    }

    Object.keys(local).map((value)=>{
      if(idProduct === parseInt(value)){
        local[value] -=1
      }
    })

    Object.keys(local).map((value)=>{
      if(local[value] < 1 ){
        delete local[value]
      }
    })
    
    setData(newData)
    localStorage.setItem("Cart",JSON.stringify(local))

    const action = qtyDecrement()
    dispatch(action)
  }

  const clickDelete = (e,product) => {
    e.preventDefault();
    
    let idProduct = product.id;
    let newData = [...data]
    if(idProduct){
      Object.keys(newData).map((value,key)=>{
          if(idProduct === newData[value].id){
            delete newData[key]
          }
        })
    }

    Object.keys(local).map((key)=>{
      if(parseInt(key) === idProduct){
        delete local[key] 
      }
    })

    newData = newData.filter(n => n)
    setData(newData)
    localStorage.setItem("Cart",JSON.stringify(local))
  }

  const renderCart = () =>{
      return Object.keys(data).map((value)=>{
      return <tr key={data[value].id}>
              <td className="cart_product">
                <a href="">
                  <RenderImage img={data[value].image} idUser={data[value].id_user}/>
                </a>
              </td>
              <td className="cart_description">
                <h4>
                  <a href="">{data[value].name}</a>
                </h4>
                <p>Web ID: {data[value].id}</p>
              </td>
              <td className="cart_price">
                <p>{data[value].price}</p>
              </td>
              <td className="cart_quantity">
                <div className="cart_quantity_button">
                  <a onClick={(e) => clickIncrease(e,data[value])} className="cart_quantity_up">
                    +
                  </a>
                  <input
                    className="cart_quantity_input"
                    type="text"
                    name="quantity"
                    defaultValue={1}
                    autoComplete="off"
                    value={data[value].qty}
                    size={2}
                  />
                  <a onClick={(e) => clickDiminish(e,data[value])} className="cart_quantity_down">
                    -
                  </a>
                </div>
              </td>
              <td className="cart_total">
                <p className="cart_total_price">{data[value].price * data[value].qty}</p>
              </td>
              <td className="cart_delete">
                <a onClick={(e) => clickDelete(e,data[value])} className="cart_quantity_delete">
                  <i className="fa fa-times" />
                </a>
              </td>
            </tr>
    })

    
  }


  return (
    <section id="cart_items">
      <div className="container">
        <div className="breadcrumbs">
          <ol className="breadcrumb">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="active">Shopping Cart</li>
          </ol>
        </div>
        <div className="table-responsive cart_info">
          <table className="table table-condensed">
            <thead>
              <tr className="cart_menu">
                <td className="image">Item</td>
                <td className="description" />
                <td className="price">Price</td>
                <td className="quantity">Quantity</td>
                <td className="total">Total</td>
                <td />
              </tr>
            </thead>
            <tbody>
              {renderCart()}
            </tbody>
          </table>
        </div>
      </div>
  </section>

  )
}

export default Cart