import React from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  Text
} from 'react-native'
import styles from './style'
import {NetworkItem} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class MyNetwork extends React.Component {
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.tabContainer}>
            <NetworkItem/>
            <NetworkItem/>
            <NetworkItem/>
            <NetworkItem/>
            <NetworkItem/>
            <NetworkItem/>
            <NetworkItem/>
            <NetworkItem/>
            <NetworkItem/>
            <NetworkItem/>
            <NetworkItem/>
            <NetworkItem/>
            <NetworkItem/>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

}

MyNetwork.defaultProps = {
  categories:[],
}

function mapStateToProps({categoriesReducers}){
  return {
    categories:categoriesReducers.categories,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(MyNetwork)
