import React from 'react'
import {
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import styles from './style'
import {ProspectItem} from '@components'

import {connect} from 'react-redux'
import {ActionCreators} from '@actions'
import {bindActionCreators} from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

class Prospects extends React.Component {

    
  componentDidMount(){
    this.props.getProspects()
  }

  // componentWillReceiveProps(nextProps){

  
  // }

  render(){
    let {prospects} = this.props
    console.log(prospects);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.tabContainer}>
            {
              prospects.map((prospect, index)=>{
                return <ProspectItem key={index} prospect={prospect}/>
              })
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }

}

Prospects.defaultProps = {
  prospects:[],
}

function mapStateToProps({networkReducers}){
  return {
    prospects:networkReducers.prospects,
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators,dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Prospects)
