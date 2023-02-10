import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const BlogList = () => {

const [blogdata,setBlogdata] = React.useState([])


    React.useEffect(()=>{
        axios.get('http://localhost/laravel/laravel/public/api/blog')
        .then(res=>{
            setBlogdata(res.data.blog.data)
        })
        .catch(error => console.log(error))
    },[])


    
    const renderBlog = () =>{
        if(blogdata.length > 0){
            return blogdata.map((value,key)=>{
                return(
                    <div key={key.id} className="single-blog-post">
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
                        <span>
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star-half-o" />
                        </span>
                    </div>
                    <a href="">
                        <img src={"http://localhost/laravel/laravel/public/upload/Blog/image/" + value.image} alt="" />
                    </a>
                    <p>
                        {value.content}
                    </p>
                    <Link className="btn btn-primary" to={"/blog/detail/" + value.id}>
                        Read More
                    </Link>
        </div> 
                )
            })
        }
    }

  return (
    <>
    <div className='col-sm-9'>
        {renderBlog()}  
    </div>
             
    </>
  )
}

export default BlogList
