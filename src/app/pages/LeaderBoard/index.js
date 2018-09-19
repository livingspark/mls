import React from 'react'
import {
  View,
  SafeAreaView,
  ScrollView
} from 'react-native'
import styles from './style'
import {LeaderboardTable} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class LeaderBoard extends React.Component {
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.tableContainer}>
          <LeaderboardTable/>
        </View>
      </SafeAreaView>
    )
  }

}

LeaderBoard.defaultProps = {
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

export default connect(mapStateToProps,mapDispatchToProps)(LeaderBoard)
