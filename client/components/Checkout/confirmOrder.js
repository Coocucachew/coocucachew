//needs to be passed props from '../cart and userForm', bc props should access userid, item name, price, qty of items in cart and confirm a calculated total
//clicking 'Confirm&Checkout' button should send user's address, cart, and payment to db
import React, {Component} from 'react'
import {updateOrderHistory, updateUserAddresses} from '../../store/saveOrder'
import {connect} from 'react-redux'

export class ConfirmOrder extends Component {
  continue = evt => {
    evt.preventDefault()
    this.props.nextStep()
  }

  goBack = evt => {
    evt.preventDefault()
    this.props.prevStep()
  }

  checkoutSubTotal = cartItemsArr => {
    let subTotal = 0
    cartItemsArr.forEach(item => {
      subTotal += item.price * item.qty
    })
    return subTotal
  }

  checkoutTotal = subTotal => {
    return subTotal + 6
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const subTotal = checkoutSubTotal(this.props.cart) //not sure if the user's cart prop is an arr named cart
    const total = checkoutTotal(subTotal)
    this.props.addOrder(subTotal, total, this.props.cart.userId) //not sure if user's id is named userId and located in cart
    this.props.addAddress(
      this.state.streetAddress,
      this.state.zipCode,
      this.state.state
    )
    this.setState({
      name: '',
      email: '',
      streetAddress: '',
      zipCode: '',
      state: ''
    })
  }

  render() {
    const {values: {name, email, streetAddress, zipCode, state}} = this.props
    return (
      <div>
        <br />
        <button type="submit" onClick={this.goBack} className="buttonC">
          Return to Payment Details
        </button>
        <h1 className="header">Confirm Order Details</h1>
        <br />
        <h2>Shipping Address</h2>
        <ul>
          <ol>
            <h3>Name:</h3> <br /> {name}
          </ol>
          <ol>
            <h3>Email:</h3> <br /> {email}
          </ol>
          <ol>
            <h3>Street Address:</h3> <br /> {streetAddress}
          </ol>
          <ol>
            <h3>ZIP code:</h3> <br /> {zipCode}
          </ol>
          <ol>
            <h3>State:</h3> <br /> {state}
          </ol>
        </ul>
        <h2>Payment Method</h2>
        <ul>
          <ol>
            <p>Stripe</p>
          </ol>
        </ul>
        <br />
        <h2>Review Items</h2>
        <br />
        <br />
        {/* <ul>
          {this.props.cartItems.map(item => (
            <div key={item.id}>
              <ol>
                <h3>{item.name}</h3> <br />
              </ol>
              <ol>
                <h3>{item.description}</h3> <br />
              </ol>
              <ol>
                <h3>{item.qty}</h3> <br />
              </ol>
              <ol>
                <h3>{item.price}</h3> <br />
              </ol>
            </div>
          ))}
        </ul> */}
        <h2>Order Total</h2>
        <br />
        {/* {total} */}
        9.99
        <br />
        <button
          type="submit"
          onClick={this.continue}
          onSubmit={this.handleSubmit}
          className="buttonC"
        >
          Confirm & Checkout
        </button>
      </div>
    )
  }
}

const mapState = state => {
  console.log('confirmation order State=>', state)
}

const mapDispatch = dispatch => ({
  addOrder: (orderSubTotal, orderTotal, orderUserID) =>
    dispatch(updateOrderHistory(orderSubTotal, orderTotal, orderUserID)),
  addAddress: (newAddress, newZip, newState) =>
    dispatch(updateUserAddresses(newAddress, newZip, newState))
})

export default connect(mapState, mapDispatch)(ConfirmOrder)
