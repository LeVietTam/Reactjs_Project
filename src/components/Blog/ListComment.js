import React from 'react'

const ListComment = ({comment,getIdComment,userData}) => {

    const RenderRefly = ({item}) =>{
        
            return comment.map((value,key)=>{
                if(value.id_comment != 0 &&  value.id_comment == item.id){
                    return (
                    <>
                        <li className="media second-media" key={key}>
                            <a className="pull-left" href="#">
                                <img className="media-object" style={{width: "100px"}} src={'http://localhost/laravel/laravel/public/upload/user/avatar/' + value.image_user} alt="" />
                            </a>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                <li>
                                    <i className="fa fa-user" />
                                    {value.name_user}
                                </li>
                                <li>
                                    <i className="fa fa-clock-o" /> 1:33 pm
                                </li>
                                <li>
                                    <i className="fa fa-calendar" /> DEC 5, 2013
                                </li>
                                </ul>
                                <p>
                                  {value.comment}
                                </p>
                                <a className="btn btn-primary" href="">
                                <i className="fa fa-reply" />
                                Replay
                                </a>
                            </div>
                        </li>
                    </>
                )
            }        
        })
        }

    const renderComment = () =>{
            return comment.map((value,key)=>{
                if(value.id_comment === 0){
                    return (
                        <>
                        <li className="media" key={key}>
                            <div className="pull-lef">
                                <img className="media-object" style={{width: "150px"}} src={'http://localhost/laravel/laravel/public/upload/user/avatar/' + value.image_user} />
                            </div>
                            <div className="media-body">
                                <ul className="sinlge-post-meta">
                                <li>
                                    <i className="fa fa-user" />
                                    {value.name_user}
                                </li>
                                <li>
                                    <i className="fa fa-clock-o" /> 
                                    {value.updated_at}
                                </li>
                                <li>
                                    <i className="fa fa-calendar" /> 
                                    {value.created_at}
                                </li>
                                </ul>
                                <p>
                                    {value.comment}
                                </p>
                                <button className="btn btn-primary"
                                            onClick={()=> {
                                                getIdComment(value.id)
                                        }}
                                        >
                                <i className="fa fa-reply" />
                                Replay
                                </button>
                            </div>
                        </li>
                        
                        <RenderRefly item={value}/>
                        
                    </>
                )
                }
            })
        
    }
  return (
    <div>
        <div className="response-area">
            <ul className="media-list">
                {renderComment()}
            </ul>
        </div>
    </div>
  )
}

export default ListComment









