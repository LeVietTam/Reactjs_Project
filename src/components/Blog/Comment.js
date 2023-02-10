import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Comment = ({idBlog,userData,idComment,getComment}) => {

    const navigator = useNavigate()

    const [comment,setComment] = React.useState('');

    

    const handleInput = (e) =>{
        setComment(e.target.value);
    } 


    const handleSubmit = (e) => {
        e.preventDefault();

       let login = JSON.parse(localStorage.getItem('login'));
       if(!login){
        alert('Yeu cau dang nhap');
        navigator('/login')
       }
       else{
            if(!(comment.trim() === "")){

                let url = 'http://localhost/laravel/laravel/public/api/blog/comment/' + idBlog;
                let accessToken = userData.token;
                let config = {
                    headers: {
                        'Authorization': 'Bearer ' + accessToken,
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Accept': 'application/json'
                    }
                }

                const formData = new FormData ();
                formData.append('id_blog', idBlog);
                formData.append('id_user', userData.Auth.id);
                formData.append('id_comment', idComment);
                formData.append('comment', comment);
                formData.append('image_user', userData.Auth.avatar);
                formData.append('name_user', userData.Auth.name);

                axios.post(url, formData, config)
                .then(res => {
                    // console.log(res.data)
                    getComment(res.data.data)
                })
                .catch(err => {
                    console.log(err)
                })
            }
            else{
                alert("Nhap vao binh luan")
            }
       }
    }



  return (
    <div>
        <div className="replay-box">
            <div className="row">
                <div className="col-sm-12">
                <h2>Leave a replay</h2>
                <div className="text-area">
                    <div className="blank-arrow">
                    <label>Your Name</label>
                    </div>
                    <span>*</span>
                    <form action = "#" onSubmit={handleSubmit}>
                        <textarea name="message" onChange={handleInput} rows={11} defaultValue={""} />
                        <button className="btn btn-primary" >
                            post comment
                        </button>
                    </form>
                    
                </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Comment
