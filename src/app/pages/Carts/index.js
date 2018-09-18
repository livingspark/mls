import React from 'react'
import {
  View,
  SafeAreaView,
  FlatList
} from 'react-native'
import styles from './style'
import { Text, CartItem, Button } from '@components'
import { Config, Constants, Global } from '@common'

import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class Carts extends React.Component {
  render() {
    let { carts, isRequesting } = this.props
    let total = this.getPriceTotal()
    return (
      <SafeAreaView style={styles.container}>
        {carts.length == 0 && this.renderEmptyList()}
        {carts.length > 0 && (
          <FlatList
            contentContainerStyle={styles.list}
            keyExtractor={(item, index) => `${index}`}
            data={carts}
            renderItem={({ item }) => <CartItem item={item} onRemove={this.removeToCart} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
        {total > 0 && (
          <View>
            <Text style={styles.total}>{__.t('Total')}: {Config.Currency.symbol}{total}</Text>
            <Button title={__.t('Checkout')} loading={isRequesting} style={styles.btnCheckout} onPress={this.checkout} />
          </View>
        )}

      </SafeAreaView>
    )
  }

  renderEmptyList = () => {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.message}>{__.t('Empty List')}</Text>
      </View>
    )
  }

  removeToCart = (item) => {
    this.props.removeToCart(item)
  }

  getPriceTotal = () => {
    var total = 0
    this.props.carts.forEach((item) => {
      total += item.price * item.qty
    })
    return total
  }

  checkout = () => {
    if (this.props.customerInfo) {
      this.props.showShippingAddress()
    }else{
      this.isLogin = true
      this.props.signIn()
    }
  }

  componentWillReceiveProps(props) {

    if (props.type == ActionTypes.SIGN_IN_SUCCESS && this.isLogin == true) {
      this.isLogin = false
      this.props.showShippingAddress()
    }
  }

  signOut = () => {
    this.props.signOut()
  }

  componentDidMount = () => {
    this.onLogout = Global.EventEmitter.addListener(Constants.EventEmitterName.onLogout, this.signOut)
  }

  componentWillUnmount = () => {
    this.onLogout.remove()
  }

}

Carts.defaultProps = {
  carts: [],
  type: false,
  customerInfo: null
}

function mapStateToProps({ cartsReducers, authReducers }) {
  return {
    carts: cartsReducers.carts,
    reload: cartsReducers.reload,
    type: authReducers.type,
    customerInfo: authReducers.customerInfo,
    isRequesting: authReducers.type == ActionTypes.GET_CUSTOMER_INFO_PENDING
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Carts)
