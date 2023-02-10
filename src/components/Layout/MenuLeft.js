import React from 'react'

const MenuLeft = () => {
  return (
    <>
        <div className="col-sm-3">
            <div className="left-sidebar">
                <h2>Category</h2>
                <div className="panel-group category-products" id="accordian">
                {/*category-productsr*/}
                <div className="panel panel-default">
                    <div className="panel-heading">
                    <h4 className="panel-title">
                        <a
                        data-toggle="collapse"
                        data-parent="#accordian"
                        href="#sportswear"
                        >
                        <span className="badge pull-right">
                            <i className="fa fa-plus" />
                        </span>
                        Sportswear
                        </a>
                    </h4>
                    </div>
                    <div id="sportswear" className="panel-collapse collapse">
                    <div className="panel-body">
                        <ul>
                        <li>
                            <a href="#">Nike </a>
                        </li>
                        <li>
                            <a href="#">Under Armour </a>
                        </li>
                        <li>
                            <a href="#">Adidas </a>
                        </li>
                        <li>
                            <a href="#">Puma</a>
                        </li>
                        <li>
                            <a href="#">ASICS </a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>
                
                </div>
                {/*/category-products*/}
                <div className="brands_products">
                {/*brands_products*/}
                <h2>Brands</h2>
                <div className="brands-name">
                    <ul className="nav nav-pills nav-stacked">
                    <li>
                        <a href="#">
                        {" "}
                        <span className="pull-right">(50)</span>Acne
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        {" "}
                        <span className="pull-right">(56)</span>Grüne Erde
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        {" "}
                        <span className="pull-right">(27)</span>Albiro
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        {" "}
                        <span className="pull-right">(32)</span>Ronhill
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        {" "}
                        <span className="pull-right">(5)</span>Oddmolly
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        {" "}
                        <span className="pull-right">(9)</span>Boudestijn
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        {" "}
                        <span className="pull-right">(4)</span>Rösch creative culture
                        </a>
                    </li>
                    </ul>
                </div>
                </div>
                {/*/brands_products*/}
            </div>
        </div>
    </>
  )
}

export default MenuLeft