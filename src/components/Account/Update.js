import axios from 'axios'
import React from 'react'

const Update = () => {
    const Auth = JSON.parse(localStorage.getItem('auth'))
    const token = JSON.parse(localStorage.getItem('token'))
    const userData = {
        name: Auth.name,
        email: Auth.email,
        phone: Auth.phone,
        address: Auth.address,
        country: Auth.country,
        avatar: Auth.avatar
    }

    const [input,setInput] = React.useState(userData);
    const [file,setFile] = React.useState("");
    const [avatar,setAvatar] = React.useState("");

    const handleInputs = (e) => {
        let name = e.target.name
        let value = e.target.value
        setInput(state => ({...state,[name]:value}))
    }

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
        let check = 1;
        let fileImg = ["png", "jpg", "jpeg", "PNG", "JPG"];
        e.preventDefault();
        let objErrors = {};
        let formatEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if(input.name === ""){
            check = 2;
            objErrors.name = "Bạn chưa nhập name";
        }
        if(input.email === ""){
            check = 2;
            objErrors.email = "Bạn chưa nhập email";
        }else{
            if(!formatEmail.test(input.email)){
                check = 2 
                objErrors.email = "Bạn không nhập đúng định dạng email"
            }
        }
        if(input.address === ""){
            check = 2;
            objErrors.address = "Bạn chưa nhập address";
        }
        if(input.phone === ""){
            check = 2;
            objErrors.phone = "Bạn chưa nhập phone";
        }
        if (file) {
            let nameFile = file.name;
            let nameTail = nameFile.split(".");
            if (file.size > (1024 * 1024)) {
                check = 2;
                objErrors.avatar = "Dung lượng file quá lớn"
            }
            if (!fileImg.includes(nameTail[1])) {
                check = 2;
                objErrors.avatar = "File ảnh không tồn tại"
            }
        } else {
            check = 2;
            objErrors.avatar = "Không có tệp nào được chọn "
        }

        if(check = 1){
            let url = "http://localhost/laravel/laravel/public/api/user/update/" + Auth.id;
            let accessToken = token;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };

            const formData = new FormData();

            formData.append('name' , input.name)
            formData.append('email' , input.email) 
            formData.append('password' , input.password)
            formData.append('phone', input.phone)
            formData.append('address' , input.address)
            formData.append('avatar' , avatar)

            axios.post(url, formData, config)
            .then(res=>{
                console.log(res);
                alert('Update thanh cong')
            })
            .catch()

        }else{

        }

        

    }

    return (
        <>
            <div className="col-sm-4" >
                <div className = "signup-form " > 
            <h2 className = "text-center" > Login to your account </h2> 
            <form action = "#" onSubmit={handleSubmit} enctype = "multipart/form-data" >
                <input type = "text"
                placeholder = "Enter Name"
                name = 'name'
                value={input.name}
                onChange={handleInputs}
                />

                <input type = "email"
                    placeholder = "Enter Email Address"
                    readOnly
                    name = 'email'
                    value={input.email}
                    onChange={handleInputs}
                />

                <input type = "text"
                    placeholder = "Password "
                    name = 'password'
                    value={input.password}
                    onChange={handleInputs}
                />

                <input type = "phone"
                    placeholder = "Enter Phone "
                    name = 'phone'
                    value={input.phone}
                    onChange={handleInputs}
                />

                <input type = "address"
                    placeholder = "Enter Address"
                    name = 'address'
                    value={input.address}
                    onChange={handleInputs}
                /> 

                <input type = "file"
                    placeholder = "Fhile"
                    name = 'avata'
                    onChange={handleFile}
                />
                {/* <Errors data = {error}/> */}
                <button type = "submit" className = "btn btn-default" >Login</button> 
            </form> 
            </div> 
            </div>
            
        </>
      )
}

export default Update