import axios from 'axios';
import React from 'react'
import {Link , useNavigate} from 'react-router-dom';

const MyProduct = () => {
    const [data,setData] = React.useState('');
    let navigation = useNavigate();

    let token = JSON.parse(localStorage.getItem('token'))
    let Auth = JSON.parse(localStorage.getItem('Auth'))
    let url = 'http://localhost/laravel/laravel/public/api/user/my-product'
    let config = { 
      headers: { 
      'Authorization': 'Bearer '+ token,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
      } 
  };	
    React.useEffect(()=>{
        axios.get(url,config)
        .then(res=>{
            setData(res.data.data)
        })
    },[])


    const handleDeleteProduct = (id) =>{
      let url = 'http://localhost/laravel/laravel/public/api/user/delete-product/' + id;
      axios.get(url,config)
      .then(res=>{
        setData(res.data.data)
      })
      
    }

    const handleEditProduct = (arrProduct) =>{
      localStorage.setItem('arrProduct', JSON.stringify(arrProduct))
      navigation('/account/edit');
    }
    const renderData = () =>{
        return Object.keys(data).map((value,index)=>{
          let json = JSON.parse(data[value].image)[0]
          return (
            <tr key={index}>
							<td>
								{data[value].id}
							</td>
							<td>
								{data[value].name}
							</td>
							<td>
								<img style={{'width':'100px'}} src={"http://localhost/laravel/laravel/public/upload/user/product/" + data[value].id_user + '/' + json }/>
							</td>
              <td>
								{data[value].price} <b>$</b>
							</td>
              <td>
								<button onClick={()=>handleEditProduct(data[value])}>Edit</button>
                <button onClick={()=>handleDeleteProduct(data[value].id)}>Delete</button>
							</td>
						</tr>
          )
        })
    }

  return (
  <div className='col-sm-9'>
      <div className="table-responsive cart_info">
				<table className="table table-condensed">
					<thead>
						<tr>
              <td>Id</td>
              <td>Name</td>
							<td>Image</td>
							<td>Price</td>
							<td>Action</td>
						</tr>
					</thead>
					<tbody>
						{renderData()}
					</tbody>
				</table>
			</div>
      <Link className='btn btn-warning' style={{"margin": "0 0 50px 600px"}} to="/account/add">Add New</Link>
    </div>
    
  )
}

export default MyProduct