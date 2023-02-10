import axios from 'axios';
import React from 'react'
import Errors from './Errors';

const Login = () => {
    const [data,setData] = React.useState({});
    const [error,setErrors] = React.useState({});

    const handleInput = (e) =>{
        let name = e.target.name;
        let value = e.target.value;
        setData(
            state => ({...state, [name]: value }),
        )
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let objErrors = {};
        let check = 1;
        let formatEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

        if(data.email === ""){
            check = 2;
            objErrors.email = "Bạn chưa nhập email";
        }else{
            if(!formatEmail.test(data.email)){
                check = 2 
                objErrors.email = "Bạn không nhập đúng định dạng email"
            }
        }
        
        if(data.password === ""){
            check = 2;
            objErrors.password = "Bạn chưa nhập password";
        }

        if(check === 1){

            data.level = 0;

            axios.post("http://localhost/laravel/laravel/public/api/login",data)
            .then(res => {
                if(res.data.errors){
                    setErrors(res.data.errors)
                }
                else{
                    let flag = true
                    let auth = res.data.Auth;
                    let token = res.data.success.token;

                    localStorage.setItem("auth", JSON.stringify(auth));
                    localStorage.setItem("token", JSON.stringify(token));
                    localStorage.setItem("login", JSON.stringify(flag));

                    alert("Dang nhap thanh cong")
                }
            })
        }
        else{
            setErrors(objErrors)
        }

    }


  return (
    <>
        <div className="col-sm-4" >
            <div className = "signup-form " > 
                <h2 className = "text-center" > Login to your account </h2> 
                <form action = "#" onSubmit={handleSubmit}>
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
                    <Errors data = {error}/>

                    <button type = "submit" className = "btn btn-default" >Login</button> 
                </form>
            </div>
        </div>
    </>
  )
}

export default Login