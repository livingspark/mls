import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  Platform,
  findNodeHandle
} from 'react-native'
import styles from './style'
import {StyleSheet} from 'react-native'
import {Constants} from '@common'
import {Colors,Icons} from '@common'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import {Text,Divider,StatusArrowItem,Button} from '@components'

class ProspectItem extends React.Component {
  render(){
    const {prospect} = this.props

    let avatar = prospect.avatarUrl ? prospect.avatarUrl  
                :"https://media-mmdb.nationalgeographic.com/static-media/images/css_images/nationalGeographic_default_avatar.jpg"

    return (
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <Image source={{uri:avatar}} style={styles.avatar}/>
        </View>
       
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{prospect.name}</Text>
            <Text style={styles.timeStamp}>{"8/29/2017 @ 4.20 PM"}</Text>
          </View>
          <Divider />
          <View style={styles.buttonContainer}>
            
            <StatusArrowItem
              fill={Colors.LighterGreen}
              textFill={Colors.LightGreen}
              text={__.t('Gift Accepted')}
            />
            {
              prospect.inviteAccepted ? 
              <StatusArrowItem
                fill={Colors.LighterGreen}
                textFill={Colors.LightGreen}
                text={__.t('Invite Accepted')}
              />
              :
              <StatusArrowItem
                fill={Colors.LighterRed}
                textFill={Colors.LightRed}
                text={__.t('Invite Declined')}
              />
            }
            
          </View>
          <View style={styles.buttonContainer}>
            <Button title={__.t('Track Package')} style={styles.btnTrack} textStyles={styles.btnTxt} onPress={this.signIn}/>  
            <Button title={__.t('Resend Invite')} style={styles.btnResend} textStyles={styles.btnTxt} onPress={this.signIn}/>
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

export default connect(mapStateToProps,mapDispatchToProps)(ProspectItem)