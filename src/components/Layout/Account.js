import React from 'react'
import { Link } from 'react-router-dom'
const Account = () => {
  return (
    <>
        <div className="col-sm-3">
            <div className="left-sidebar">
                <h2>Account</h2>
                <div className="panel-group category-products" id="accordian">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <Link
                                data-toggle="collapse"
                                data-parent="#accordian"
                                to=""
                                >
                                <span className="badge pull-right">
                                    <i className="fa fa-plus" />
                                </span>
                                Sportswear
                                </Link>
                            </h4>
                            </div>
                            <div id="sportswear" className="panel-collapse collapse">
                        </div>
                        <div className="panel-heading">
                            <h4 className="panel-title">
                                <Link
                                data-toggle="collapse"
                                data-parent="#accordian"
                                to="/account/list"
                                >
                                <span className="badge pull-right">
                                    <i className="fa fa-plus" />
                                </span>
                                    My Product
                                </Link>
                            </h4>
                            </div>
                            <div id="sportswear" className="panel-collapse collapse">
                        </div>
                    </div>
                </div>  
                
            </div>
        </div>
    </>
  )
}

export default Account