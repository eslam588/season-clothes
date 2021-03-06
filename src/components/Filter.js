import React, { Component } from 'react';

class  Filter  extends Component {
    render() { 
        return (
        <div className="filter">
            <div className="filter-resualt">Products : {this.props.count}</div>
            <div className="filter-sort">
                Order
                <select value={this.props.sort} onChange={this.props.sortProducts}>
                    <option>Latest</option>
                    <option value="lowest">Lowest</option>
                    <option value="highest">Highest</option>
                </select>
            </div>
            <div className="filter-size">
                Size
                <select value={this.props.size} onChange={this.props.filterProducts}>
                    <option value="">All</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>
            </div>
        </div>
        )
    }
}
 
export default Filter ;