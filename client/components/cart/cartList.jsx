import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CartProducts from './cartProducts'
import UserForm from '../Checkout/userForm'
import ls from 'local-storage'
// import SecureLS from 'secure-ls'
// const ls = new SecureLS()

export class CartList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1
    }
    this.setPropsToLocalStorage = this.setPropsToLocalStorage.bind(this)
  }

  //set the props in the local window storage & calculate totals
  setPropsToLocalStorage() {
    let subtotal = 0
    if (this.props.cart.products && ls.get('isPending') === true) {
      ls.set('id', this.props.cart.id)
      ls.set('isPending', this.props.cart.isPending)
      ls.set('cartProducts', this.props.cart.products)
      this.props.cart.products.map(product => {
        ls.set(`${product.name}`, product)
        subtotal +=
          product.orderProduct.quantity *
          parseInt(product.price.substring(1), 10)
      })
      ls.set('subtotal', subtotal)
      ls.set('total', subtotal + 6)
    } else {
      ls.set('id', 0)
      ls.set('isPending', true)
      ls.set('cartProducts', [])
      ls.set('subtotal', 0)
      ls.set('total', 6)
    }
  }

  nextStep = () => {
    const {step} = this.state
    this.setState({
      step: step + 1
    })
  }

  //go back to previous step
  prevStep = () => {
    const {step} = this.state
    this.setState({
      step: step - 1
    })
  }

  render() {
    this.setPropsToLocalStorage()
    const {step} = this.state
    switch (step) {
      case 1:
        return (
          <CartProducts
            cart={this.props.cart}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
        )
      case 2:
        return <UserForm cart={this.props.cart} nextStep={this.nextStep} />
      default:
        return 'Loading...'
    }
  }
}

export default connect(null, null)(CartList)
