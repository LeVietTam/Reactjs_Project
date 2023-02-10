import axios from 'axios';
import React from 'react'
import { useNavigate } from 'react-router-dom';

import StarRatings from 'react-star-ratings';

const Rate = ({idBlog,userData}) => {
    const navigator = useNavigate();
    const [rating,setRating] = React.useState(0);


    React.useEffect(()=>{
        axios.get('http://localhost/laravel/laravel/public/api/blog/rate/' + idBlog)
        .then(res=>{
            setRating(res.data.data)


            let rateSum = res.data.data
            let sum = 0;
            rateSum.map((value)=>{
                sum += value.rate;
            })
            
            setRating(sum/rateSum.length)
        })
    },[])

   

      const changeRating = ( newRating ) => {

        const login = JSON.parse(localStorage.getItem('login'));

        if(login){
            
            let url = 'http://localhost/laravel/laravel/public/api/blog/rate/' + idBlog;
            let accessToken = userData.token;
            let config = {
            headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                    }
                }

            const formData = new FormData ();
                    formData.append('blog_id', idBlog);
                    formData.append('user_id', userData.Auth.id);
                    formData.append('rate', newRating);
                
                    setRating(newRating)
                
                    axios.post(url, formData, config)
                    .then(res => {
                    console.log(res.data)
                    })

        }
        else{
            alert('Ban chua dang nhap')
            navigator("/login")
        }   
    
      }
      
    
    
        
   
    

        return (
            <StarRatings
                rating={rating}
                starRatedColor="blue"
                changeRating={changeRating}
                numberOfStars={5}
                name='rating'
            />
        )
      
}

export default Rate
