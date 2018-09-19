import React from 'react'
import {
  View,
  Image
} from 'react-native'
import styles from './style'
import {StyleSheet} from 'react-native'
import {Constants} from '@common'
import {Colors,Icons} from '@common'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'
import {Text,Divider,Button} from '@components'

class NetworkItem extends React.Component {
  static defaultProps = {
    downlines:0,
    gifted:0
  }

  render(){
    let {downlines,gifted} = this.props

    let avatar = "https://media-mmdb.nationalgeographic.com/static-media/images/css_images/nationalGeographic_default_avatar.jpg"

    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image source={{uri:avatar}} style={styles.avatar}/>
        </View>
       
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{"Danerys Targaryen"}</Text>
            <Text style={styles.timeStamp}>{"8/29/2017 @ 4.20 PM"}</Text>
          </View>
          <Divider />
          <View style={styles.buttonContainer}>
            <Button title={`${__.t('Downlines')}`+ downlines} style={styles.downlineBtn} textStyles={styles.btnTxt} onPress={()=>{}}/>
            <Button title={`${__.t('Books Gifted')}`+ gifted} style={styles.giftedBtn} textStyles={styles.btnTxt} onPress={()=>{}}/>
          </View>
        </View>
      </View>
    )
  }

}

function mapStateToProps({authReducers}){
  return {
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(NetworkItem)