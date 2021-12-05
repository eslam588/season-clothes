import React , { Component } from 'react';
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

class  Products extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
        };
    }

    openModel = (product) => {
        this.setState({ product });
    }; 

    closeModel = () => {
        this.setState({ product:null });
    }
    render() { 
        const { product } = this.state;
        return (
        <div>
          <Fade left cascade>
            <ul className="products">
                {
                    this.props.products.map((product) => (
                        <li key={product._id}>
                            <div className="product">
                                <a href= {"#" + product._id} onClick={() => this.openModel(product)}>
                                    <img src={product.image} alt={product.title}></img>
                                    <p>
                                        {product.title}
                                    </p>
                                </a>
                                <div className="product-price">
                                    <div className="price">
                                        {product.price}$
                                    </div>
                                    <button onClick = {() => this.props.addToCart(product)} className="button primary" >
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))
                }

            </ul>
          </Fade>
          {product && (
               <Modal isOpen={true} onRequestClose={this.closeModel}>
                   <Zoom>
                       <button className="colse-modal" onClick={this.closeModel}>x</button>
                       <div className="product-details">
                           <img src={product.image} alt={product.title}/>
                           <div className="product-details-description">
                               <p className="details-title">
                                   <strong>{product.title}</strong>
                               </p>
                               <p>
                                   {product.description}
                               </p>
                               <p>
                                   Available Sizes : {" "}
                                   {product.availableSizes.map((x) => (
                                       <span>
                                          {" "}
                                          <button className="button">{x}</button> 
                                        </span>
                                   ))}
                               </p>
                               <div className="product-price">
                                   <div>
                                      Price : {product.price}
                                   </div>
                                   <button className="button primary" onClick={() => {
                                       this.props.addToCart(product);
                                       this.closeModel ();
                                   }}
                                   >
                                       Add To Cart
                                   </button>
                                </div>
                           </div>
                       </div>
                   </Zoom>
               </Modal>
          )
          }
        </div>
        )
    }
}
 
export default Products ;