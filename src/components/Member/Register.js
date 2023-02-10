import React from 'react'
import axios from 'axios'
import Errors from './Errors'
import {useNavigate} from "react-router-dom";
const Register = () => {

    const [data,setData] = React.useState({})
    const [error,setError] = React.useState({})
    const [avatar,setAvatar] = React.useState('')
    const [file,setFile] = React.useState('')

    const navigate = useNavigate();
    

    const handleInput = (e) => {
        let keyName = e.target.name;
        let valueName = e.target.value;
        setData(state => ({...state, [keyName]: valueName }))
    }

    // Code tham khao mã hoá image filereader viet theo Hook				
    const handleFile = (e) => {
        let files = e.target.files;
        let reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result); //Cái này để gởi qua api
            setFile(files[0]);
        };
        reader.readAsDataURL(files[0]);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        let objErrors = {};
        let formatEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        let fileImg = ["png", "jpg", "jpeg", "PNG", "JPG"];
        let check = 1;  

        if(data.name === "" ){
            check = 2;
            objErrors.name = "Bạn chưa nhập name";
        }
        if(data.email === ""){
            check = 2;
            objErrors.email = "Bạn chưa nhập name";
        }else{
            if(!formatEmail.test(data.email)){
                check = 2 
                objErrors.email = "Bạn không nhập đúng định dạng email"
            }
        }

        if(data.address === ""){
            check = 2;
            objErrors.address = "Bạn chưa nhập address";
        }

        if(data.phone === "" ){
            check = 2;
            objErrors.phone = "Bạn chưa nhập số điện thoại";
        }

        if(data.password === ""){
            check = 2;
            objErrors.password = "Bạn chưa nhập số password";
        }

        if (file) {
            let nameFile = file.name;
            // console.log(nameFile);
            let nameTail = nameFile.split(".");
            // console.log(nameTail);
            if (file.size > (1024 * 1024)) {
                check = 2;
                objErrors.avatar = "Dung lượn file quá lớn"
            }
            if (!fileImg.includes(nameTail[1])) {
                check = 2;
                objErrors.avatar = "File ảnh không tồn tại"
            }
        } else {
            check = 2;
            objErrors.avatar = "Không có tệp nào được chọn "
        }

        if(check === 1){
            data.avatar = avatar;
            data.level = 0;

            axios.post("http://localhost/laravel/laravel/public/api/register", data)
            .then(res => setError(res.data.errors))
            .catch(err => setError(err))

            alert("Ban da dang ki thanh cong")
            navigate('/login')
        }
        else
        {
            setError(objErrors)
        }

        

    }


  return (
    <>
        <div className="col-sm-4" >
            <div className = "signup-form " > 
        <h2 className = "text-center" > Login to your account </h2> 
        <form action = "#" enctype = "multipart/form-data" onSubmit={handleSubmit}>
            <input type = "text"
            placeholder = "Enter Name"
            name = 'name'
            onChange={handleInput}
            />
            <input type = "email"
                placeholder = "Enter Email Address"
                name = 'email'
                onChange={handleInput}
            />
            <input type = "text"
                placeholder = "Password "
                name = 'password'
                onChange={handleInput}
            />
            <input type = "phone"
                placeholder = "Enter Phone "
                name = 'phone'
                onChange={handleInput}
            />
            <input type = "address"
                placeholder = "Enter Address"
                name = 'address'
                onChange={handleInput}
            /> 
            <input type = "file"
                placeholder = "Fhile"
                name = 'avata'
                onChange={handleFile}
            />
            <Errors data = {error}/>
            <button type = "submit" className = "btn btn-default" >Login</button> 
        </form> 
        </div> 
        </div>
    </>
  )
}

export default Register