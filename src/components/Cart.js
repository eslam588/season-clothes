    import React, { Component } from 'react';
    import Fade from 'react-reveal/Fade';


    class Cart extends Component {
        constructor(props) {
            super(props);
            this.state = {
                name: "",
                email: "",
                address: "",
                showCheckout : false
            };
        }

        handleInput = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        }

        createOrder = (e) => {
            e.preventDefault();
            const order = {
                name: this.state.name,
                email:this.state.email,
                address: this.state.address,
                cartItems: this.state.cartItems
            }
            this.props.createOrder(order);
        }
        render() { 
            const {cartItems} = this.props;
            return (
            <div>
                {cartItems.length === 0 ? (
                       <>
                        <div className="cart cart-header"> Cart is empty </div>
                         <div className="nocart">
                             <img src="/images/noproduct1.png" />
                         </div>
                       </>
                         )
                                    : (
                                        <div className="cart cart-header">
                                                you have {cartItems.length} products in the cart{" "}
                                        </div>
                                      )
                }

                <div>
                    <div className="cart">
                      <Fade left cascade>
                        <ul className="cart-items">
                            {cartItems.map((item) => (
                                <li key={item._id}>
                                    <div>
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div>
                                        <div className="item-title">{item.title}</div>
                                        <div className="right">
                                            <div className="price-qty">
                                                <p>Price : {item.price * item.count}$</p>
                                                <p>Qty : {item.count}</p>
                                            </div>
                                            <button className="cart-button" onClick={() => this.props.removeFromCart(item)}>Remove</button>
                                        </div>   
                                    </div>
                                    
                                </li>
                            ))}
                        </ul>
                       </Fade>
                    </div>
                    {cartItems.length !== 0 && (
                       <div> 
                        <div className="cart">
                            <div className="total">
                                <div>
                                    Total : {""}
                                    {cartItems.reduce((a,c) => a + c.price * c.count , 0 )}$
                                </div>
                                <button className="button primary" onClick={() => this.setState({showCheckout:true})}>
                                    Proceed
                                </button>
                            </div>
                        </div> 
 
                        {this.state.showCheckout && (
                           <Fade right cascade>
                            <div className="cart">
                                <form onSubmit={this.createOrder}>
                                   <ul className="form-container">
                                      <li>
                                          <label>Email</label>
                                          <input type="email" name="email" required onChange={this.handleInput}></input>
                                      </li>
                                      <li>
                                          <label>Name</label>
                                          <input type="text" name="name" required onChange={this.handleInput}></input>
                                      </li>
                                      <li>
                                          <label >Address</label>
                                          <input type="text" name="address" required onChange={this.handleInput}></input>
                                      </li>
                                      <li>
                                        <button className="button primary" type="submit">
                                            Checkout
                                        </button>
                                     </li>
                                   </ul>
                                </form>
                            </div>
                            </Fade>
                        )}
                        </div>
                    )}
                </div>
            </div>
            
            );
        }
    }
     
    export default Cart;