import React, { Component } from 'react';

import Auxi from '../../hoc/Auxi/Auxi.js';
import Products from '../../components/Shop/Products/Products';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Shop/OrderSummary/OrderSummary';
import FinishOrder from '../../components/Shop/FinishOrderNotification/FinishOrderNotification';
import CancelOrder from '../../components/Shop/CancelOrderNotification/CancelOrderNotification';
import CreateAccountBox from '../../components/Login/CreateAccountBox/CreateAccountBox';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';


//Product page that contains a products where users can Select a product and the quantity they want to buy. 
// Shows an order summary when the 'Order now' button is clicked
// Notification shows when 
// 1. Order is successfully receieved by the server
// 2. Order is cancelled successfully. 

class ProductPage extends Component {
    // for example:

    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }
    state = {
        productsPrices: {},
        products: null,
        totalPrice: 0.0,
        purchasable: true,
        purchasing: false,
        loading: false,
        error: false,
        purchased: false,
        cancelled: false, 
        account: null,
        controls: []
    }
    // Gets the account from LoginPage 
    componentWillMount () {
        this.state.account = this.props.location.state.account
      }
    // Gets product names and their prices from the database.
    componentDidMount () {
        axios.get( 'https://fruit-website.firebaseio.com/product_quantities.json' )
            .then( response => {
                this.setState( { products: response.data } );
                //Setting the List of fruits here. 
                let arr = []
                for(let key of Object.keys(this.state.products)) { 
                    let firstKeyLetterUppercase = key.charAt(0).toUpperCase() + key.slice(1)
                    arr.push({label: firstKeyLetterUppercase, type: key})
                }
                this.setState({controls: arr})
            } )
            .catch( error => {
                this.setState( { error: true } );
            } );
        axios.get( 'https://fruit-website.firebaseio.com/product_prices.json' )
            .then( response => {
                console.log(response.data)
                this.setState( { productsPrices: response.data } );
            } )
            .catch( error => {
                this.setState( { error: true } );
        } );
        
    }
    // Updates the price of 'Current Price' whenever the desired quantity is updated.
    updatePurchaseState ( products ) {
        const sum = Object.keys( products )
            .map( igKey => {
                return products[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
    }
    // Updates the price of 'Current Price' whenever the desired quantity increases
    addProductHandler = ( type ) => {
        console.log(this.state.products)
        const oldCount = this.state.products[type];
        const updatedCount = oldCount + 1;
        const updatedproducts = {
            ...this.state.products
        };
        updatedproducts[type] = updatedCount;
        const priceAddition = this.state.productsPrices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState( { totalPrice: newPrice, products: updatedproducts } );
        this.updatePurchaseState( updatedproducts );
    }
    // Updates the price of 'Current Price' whenever the desired quantity decreases
    removeProductHandler = ( type ) => {
        const oldCount = this.state.products[type];
        if ( oldCount <= 0 ) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedproducts = {
            ...this.state.products
        };
        updatedproducts[type] = updatedCount;
        const priceDeduction = this.state.productsPrices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState( { totalPrice: newPrice, products: updatedproducts } );
        this.updatePurchaseState( updatedproducts );
    }
    // Updates the state of 'purchasing' whenever when the user confirms the checkout. 
    // By doing so runs the loading gif
    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    }
    // Updates the state of 'purchasing' whenever when the user cancels the checkout while the server is still processing the request. 
    // By doing so removes the loading gif.
    purchaseCancelHandler = () => {
        this.setState( { purchasing: false, cancelled: true } );
    }
    
    // Sends the customer's shipping and order data to the server when the 'Continue' button in the OrderSummary popup is clicked. 
    purchaseContinueHandler = () => {
        this.setState( { loading: true } );
        const order = {
            products: this.state.products,
            price: this.state.totalPrice.toFixed( 2 ),
            customer: {
                name: this.state.account.name + " " + this.state.account.lastName,
                address: this.state.account.address
            }
            
        }
        axios.post( '/orders.json', order )
            .then( response => {
                this.setState( { loading: false, purchasing: false,purchased: true } );

            } )
            .catch( error => {
                this.setState( { loading: false, purchasing: false } );
            } );
    }
    // Closes the 'Order has been processed' popup
    verifyFinishOrderNotification = () => {
        this.setState( { purchased : false } );
    }
    // Closes the 'Order has been cancelled' popup
    verifyCancelledOrderNotification = () => {
        this.setState( { cancelled: false  } );
    }

    render () {
        const disabledInfo = {
            ...this.state.products
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let finishOrderNotification = null;
        let cancelOrderNotification = null; 
        let order = this.state.error ? <p>products can't be loaded!</p> : <Spinner />;
        if ( this.state.products ) {
            order = (
                <Auxi>
                    <Products
                        productAdded={this.addProductHandler}
                        productRemoved={this.removeProductHandler}
                        disabled={disabledInfo}
                        purchasable={false}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice} 
                        products = {this.state.products}
                        productsPrices = {this.state.productsPrices}
                        controls = {this.state.controls}
                        />
                        
                </Auxi>
            );
            orderSummary = <OrderSummary
                products={this.state.products}
                account={this.state.account}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} 
                />;
            finishOrderNotification = <FinishOrder 
                purchaseContinued={this.verifyFinishOrderNotification}
            ></FinishOrder>
            cancelOrderNotification = <CancelOrder 
                purchaseCancelled={this.verifyCancelledOrderNotification}
            ></CancelOrder>
            
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        {
        /* LoginPage returns a list of products from the server with popups that show up when specific conditions are met i.e. user clicks 'Order Now' button*/}
        return (
            <Auxi>
                {/* Shows summary when clicking continue closes when you clicked ok, and immediately opens the finishOrderNotification*/}
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Modal show={this.state.purchased} modalClosed={this.verifyFinishOrderNotification}>
                    {finishOrderNotification}
                </Modal>
                <Modal show={this.state.cancelled} modalClosed={this.verifyCancelledOrderNotification}>
                    {cancelOrderNotification}
                </Modal>
                {order}
            </Auxi>
        );
    }
}

export default withErrorHandler(ProductPage, axios );