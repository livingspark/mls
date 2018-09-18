import React from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native'
import styles from './style'
import {Icons,Utils} from '@common'
import {Text} from '@components'

class OrderItem extends React.Component {
  render(){
    let {item} = this.props
    return (
      <View style={styles.container}>
          <Text style={styles.code} >{item.number}</Text>
          <Text style={styles.text} >{item.total} {item.currency}</Text>
          <Text style={styles.text} >{__.t('Status')}: {item.status}</Text>
          <Text style={styles.text} >{__.t('Created')}: {item.date_created}</Text>
      </View>
    )
  }
}

export default OrderItem
