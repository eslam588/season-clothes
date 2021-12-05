import React , {Component} from 'react';
import data from './data.json';
import Products from './components/Products';
import Filter from './components/Filter';
import Cart from './components/Cart';
class App extends Component {
  constructor(){
    super();
    this.state = {
      products: data.products,
      size: "",
      sort: "",
      cartItems : localStorage.getItem("cartItems") 
                ? JSON.parse(localStorage.getItem("cartItems"))
                : []
    };
  }

  createOrder = (order) => {
    alert("Nedd to save order for" + order.name);
  };

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item)=> {
      if(item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart) {
      cartItems.push( {...product , count: 1} );
    }
    this.setState({cartItems});
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems : cartItems.filter(x => x._id !== product._id)
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x => x._id !== product._id)));

  }

  filterProducts = (e) => {

      if(e.target.value === ""){
        this.setState({ size: e.target.value , products : data.products});
      }
      else
      {
        this.setState({ size: e.target.value , products : data.products.filter(
          (product) => product.availableSizes.indexOf(e.target.value) >=0 ),

        });

      }
  };

  sortProducts = (e) => {
      const sort = e.target.value;
      this.setState((state)=>({
        sort:sort,
        products: this.state.products
        .slice()
        .sort((a,b) =>
         sort === "lowest"
           ? a.price > b.price
             ? 1 
             : -1
        : sort === "highest"
        ? a.price < b.price
          ? 1 
          : -1
        :a._id < b._id
        ? 1 
        : -1
        ),
      }));
  };
  render(){
  return (
      <div className="grid-container">
        <header>
          <a href="/">| Season Shopping |</a>
        </header>
        <main>
          <div className="content">
             <div className="main">
               <Filter 
               count={this.state.products.length}
               size={this.state.size}
               sort={this.state.sort}
               filterProducts={this.filterProducts}
               sortProducts ={this.sortProducts}
              />
               <Products products={this.state.products}  addToCart={this.addToCart} />
             </div>
             <div className="sidebar">
                <Cart  cartItems={this.state.cartItems} removeFromCart={this.removeFromCart} createOrder={this.createOrder} />
             </div>
          </div> 
        </main>
        <footer>
          All Right is reserved for eslam dawoud
        </footer>
      </div>
  );
}
}

export default App;
