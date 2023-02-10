import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import Comment from './Comment';
import ListComment from './ListComment';
import Rate from './Rate';
const BlogId = () => {

    const [idComment, setIdComment] = React.useState(0);
    const [comment,setComment] = React.useState([]);
    const {id} = useParams();
    
    let Auth = JSON.parse(localStorage.getItem('auth'))
    let token = JSON.parse(localStorage.getItem('token'))

    let userData = {
        Auth: Auth,
        token: token
    }

    const [data,setData] = React.useState({});
    
    
    React.useEffect(()=>{
        axios.get("http://localhost/laravel/laravel/public/api/blog/detail/" + id)
        .then(res=>{
            setData(res.data.data)
            setComment(res.data.data.comment)
        })
        .catch(err => console.log(err))
    },[])

    const renderData = () =>{
            return(
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    <div className="single-blog-post">
                        <h3>Girls Pink T Shirt arrived in store</h3>
                        <div className="post-meta">
                        <ul>
                            <li>
                            <i className="fa fa-user" /> Mac Doe
                            </li>
                            <li>
                            <i className="fa fa-clock-o" /> 1:33 pm
                            </li>
                            <li>
                            <i className="fa fa-calendar" /> DEC 5, 2013
                            </li>
                        </ul>
                        </div>
                        <a href="">
                        <img src={"http://localhost/laravel/laravel/public/upload/Blog/image/" + data.image} alt="" />
                        </a>
                        <p>
                            {data.content}
                        </p>
                        <br />
                        <p>
                            {data.description}
                        </p>
                        <br />
                        <p>
                            {data.title}
                        </p>
                        <br />
                        <p>
                        </p>
                        <div className="pager-area">
                        <ul className="pager pull-right">
                            <li>
                            <a href="#">Pre</a>
                            </li>
                            <li>
                            <a href="#">Next</a>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            )
    }

    const getComment = (newComment) =>{
        let itemComment = comment.concat(newComment);
        setComment(itemComment)
    }

    const getIdComment = (newIdComment) =>{
        setIdComment(newIdComment);
    }

    
  return (
    <div className='col-sm-9'>
        
      {renderData()}
      <Rate idBlog={id} userData={userData}/>
      
      <ListComment  comment={comment} userData={userData} getIdComment={getIdComment}/>
      <Comment getComment={getComment} idBlog={id} userData={userData} idComment={idComment} />
    </div>
  )
}

export default BlogId
