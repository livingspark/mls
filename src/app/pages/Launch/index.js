import React from 'react'
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  AsyncStorage,
  I18nManager
} from 'react-native'
import styles from './style'
import {Text} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import OneSignal from 'react-native-onesignal';
import {Config} from '@common'

class Launch extends React.Component {
  state = {
    errMsg:''
  }
  render(){
    let {errMsg} = this.state

    return (
      <SafeAreaView style={styles.container}>
        {errMsg.length == 0 && <ActivityIndicator size="large" color="white"/>}
        {errMsg.length > 0 && <Text style={styles.message}>{errMsg}</Text>}
      </SafeAreaView>
    )
  }

  componentDidMount(){
    OneSignal.init(Config.OneSignalAppId);

    let lang = this.props.lang
    if (lang) {
      __.locale = lang
      this.props.showHome()
    }else{
      this.props.setLanguage()
    }
  }
}

Launch.defaultProps = {
  lang:false
}

function mapStateToProps({authReducers,settingsReducers}){
  return {
    type:authReducers.type,
    message:authReducers.message,
    lang:settingsReducers.lang
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Launch)
