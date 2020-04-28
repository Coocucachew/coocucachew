import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateOrderinDb} from '../../store/cartStore'
import ls from 'local-storage'
// import SecureLS from 'secure-ls'
// const ls = new SecureLS()

export class CartCheckout extends React.Component {
  constructor(props) {
    super(props)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  //update the cart
  handleUpdate(e) {
    e.preventDefault()
    // const cartForDb = ls.get('localStorage')
    const {cart, id, updateDbCart} = this.props
    console.log('handle update works')
    updateDbCart(cart, id)
  }

  //begin checkout cart
  handleCheckout(e) {
    e.preventDefault()
    ls.set('isPending', false)
    const {cart, id, updateDbCart} = this.props
    cart.isPending = false
    updateDbCart(cart, id)
  }

  render() {
    return (
      <div>
        {this.props.cart[0].products ? (
          <div>
            <div>
              <h5>Subtotal: </h5>
              <h5>{'$' + ls.get('subtotal')}</h5>
            </div>
            <div>
              <h4>Total: </h4>
              <h4>{'$' + ls.get('total')}</h4>
              <form onSubmit={e => this.handleUpdate(e)}>
                {/* <button type="submit">
                  U P D A T E
                </button> */}
                <Link to="/cart/checkout">
                  <button type="submit" onSubmit={e => this.handleCheckout(e)}>
                    C H E C K O U T
                  </button>
                </Link>
                {/* <button type="submit">
                  S A V E F O R L A T E R
                </button> */}
              </form>
            </div>
          </div>
        ) : (
          'Loading your total...'
        )}
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  updateDbCart: (order, orderId) => dispatch(updateOrderinDb(order, orderId))
})

export default connect(null, mapDispatch)(CartCheckout)
