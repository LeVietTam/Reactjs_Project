import axios from 'axios';
import React from 'react'
import Errors from '../Member/Errors';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [input,setInput] = React.useState({});
    const [showStatus,setShowStatus] = React.useState(1);
    const [category,setCategory] = React.useState([]);
    const [brand,setBrand] = React.useState([]);
    const [categoryId,setCategoryId] = React.useState('');
    const [brandId,setBrandId] = React.useState('');
    const [file,setFile] = React.useState({});
    const [error,setError] = React.useState([]);

    console.log(typeof file);

    let navigate = useNavigate();


    React.useEffect(()=>{
        axios.get('http://localhost/laravel/laravel/public/api/category-brand')
        .then(res=>{
            setCategory(res.data.category)
            setBrand(res.data.brand)
        })
    },[])


    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setInput(state => ({...state,[name]:value}))
    }

    const renderCategory = () => {
        return category.map((value,index)=>{
            return (
                <option key={value.id} value={value.id}>
                    {value.category}
                </option>
            )
        })
    }

    const handleStatus = (e) => {
        showStatus === 0 ? setShowStatus(1) : setShowStatus(0)
    }

    const renderStatus = () => {
        if(showStatus === 0){
            return (<input name='sale' type="text" placeholder="0%" onChange={handleInput}/>)
        }
    }

    const renderBrand = () => {
        return brand.map((value,index)=>{
            return (
                <option key={value.id} value={value.id}>
                    {value.brand}
                </option>
            )
        })
    }

    const handleCategory = (e) =>{
        let value = e.target.value;
        setCategoryId(value)
    }

    const handleBrand = (e) =>{
        let value = e.target.value;
        setBrandId(value)
    }

    const handleFile = (e)=>{
        let nameFile = e.target.files;
        setFile(nameFile);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let objErrors = {};
        let check = 1;
        let fileImg = ["png", "jpg", "jpeg", "PNG", "JPG"];

        if(input.name == ""){
            check = 2 ;
            objErrors.name = "Bạn chưa nhập name";
        }
        if(input.price == ""){
            check = 2 ;
            objErrors.price = "Bạn chưa nhập price";
        }
        if(input.categoryId == ""){
            check = 2 ;
            objErrors.categoryId = "Bạn chưa chon category";
        }
        if(input.brandId == ""){
            check = 2 ;
            objErrors.brandId = "Bạn chưa chon brand";
        }

        if(input.sale == ""){
            check = 2 ;
            objErrors.sale = "Bạn chưa chon sale";
        }
        
        if(input.company == ""){
            check = 2 ;
            objErrors.sale = "Bạn chưa chon sale";
        }

        if(Object.keys(file).length > 0){
            Object.keys(file).map((value)=>{

                let name = file[value].name;
                let duoiFile = name.split('.')[1];

                if(file.length > 4){
                    check = 2 ;
                    objErrors.file = "Upload toi da 3 file";
                }

                if(!fileImg.includes(duoiFile)){
                    check = 2 ;
                    objErrors.file = "File khong hop le";
                }

                if(Object.keys(file).size > (1024 * 1024)){
                    check = 2 ;
                    objErrors.file = "Dung luong file qua lon";
                }
            }) 
        }else{
            check = 2 ;
            objErrors.file = "Khong co file nao duoc chon";
        }

        if(check === 2){
            setError(objErrors)
        }
        else{
            if(showStatus === 1)
            {
                input.sale = 0;
            }
            setError({})
            let token = JSON.parse(localStorage.getItem('token'))

            let url = 'http://localhost/laravel/laravel/public/api/user/add-product'
            let config = {
                headers: {
                'Authorization': 'Bearer '+ token,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
                }
            }

            let formData = new FormData();
            formData.append('name' , input.name)
            formData.append('price', input.price)
            formData.append('category' , categoryId)
            formData.append('brand' , brandId)
            formData.append('company' , input.company)
            formData.append('detail' , input.detail)
            formData.append('status' , showStatus)
            formData.append('sale' , input.sale)
            Object.keys(file).map((key) => {
                formData.append("file[]", file[key])
            })


            axios.post(url, formData, config)
            .then(res=>{
                console.log(res);
                alert("Them thanh cong")
                navigate('/account/list')
            })


        }
  
    }

  return (
    <>
        <div className="col-sm-4" >
            <div className = "signup-form " > 
        <h2 className = "text-center" > Create product </h2> 
        <form action = "#" enctype = "multipart/form-data" onSubmit={handleSubmit}>
            <input type = "text"
            placeholder = "Enter Name"
            name = 'name'
            onChange={handleInput}
            />
            <input type = "price"
                placeholder = "Enter Price"
                name = 'price'
                onChange={handleInput}
            />
            <select name='category' onChange={handleCategory}>
                <option>Please category</option>
                {renderCategory()}
            </select>
            <select name='brand' onChange={handleBrand}>
                <option>Please brand</option>    
                {renderBrand()}
            </select>

            <select name='status' value={showStatus} onChange={handleStatus }>
                <option value="1"> New </option>
                <option value="0"> Sale </option>
            </select>
            {renderStatus()}

                        
            <input type="file" placeholder="Fhile" name='file' multiple onChange={handleFile}/>           
        
            <input type = "text"
                placeholder = "Company profile"
                name = 'company'
                onChange={handleInput}
            />

            <input type = "text"
                placeholder = "Detail"
                name = 'detail'
                onChange={handleInput}
            />

            <Errors data={error}/>


            
            <button type = "submit" className = "btn btn-default" >Login</button> 
        </form> 
        </div> 
        </div>
    </>
  )
}

export default Add