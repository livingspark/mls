import React from 'react'
import {NavButton,NavTitle,Button,SendGiftsModal} from '@components'
import {Icons,Constants,Global} from '@common'
import {createMaterialTopTabNavigator} from 'react-navigation'
import {View, StyleSheet} from 'react-native';
import {Colors} from '@common'
import {Prospects, MyNetwork, LeaderBoard} from '@pages'

const styles= StyleSheet.create({
  container:{
    flex:1
  },
  tabContainer: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor:Colors.LightGray
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent:'center',
    margin:10
  },
  btnBuyGifts:{
    flex:1,
    borderRadius:5,
    backgroundColor:Colors.Orange,
    paddingHorizontal:10,
    paddingVertical:10
  },
  btnSendGifts:{
    flex:1,
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    borderRadius:5,
    backgroundColor:Colors.Malibu,
    marginHorizontal:5,
    paddingHorizontal:10,
    paddingVertical:10,
  },
  btnTxt:{
    fontSize:Constants.FontSize.small,
    marginHorizontal:10,
    marginTop:2
  }
})

const tabNavigatorConfiguration = {
  initialRouteName: Constants.Screen.Prospects,
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: true,
  tabBarOptions: {
    labelStyle: {
      color: Colors.DarkGray,
      fontSize: 12,
    },
    indicatorStyle: {
      borderBottomColor:Colors.DarkBlue,
      borderBottomWidth: 3,
    },
    style: {
      borderBottomWidth: 1,
      borderBottomColor:Colors.DarkBlue,
      backgroundColor: Colors.LighterGray,
    },
  }
}

const RouteConfig = {
  [Constants.Screen.Prospects] : Prospects,
  [Constants.Screen.MyNetwork]: MyNetwork,
  [Constants.Screen.LeaderBoard]: LeaderBoard,
}

const TopTabs = createMaterialTopTabNavigator(
  RouteConfig,
  tabNavigatorConfiguration
);


class NetworkNavigator extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      showSendGiftModal:false,
    }
  }

  static router = TopTabs.router;

  static navigationOptions = ({navigation}) => ({
    headerTitle: <NavTitle />,
    headerLeft: <NavButton icon={Icons.Drawer} style={{marginLeft:10}} onPress={()=>Global.EventEmitter.emit(Constants.EventEmitterName.OpenDrawer)}/>
  })

  openSenddGiftModal = () => {
    this.setState({
      showSendGiftModal: !this.state.showSendGiftModal
    })
  }

  hideSendGiftsModal = () => {
    this.setState({
      showSendGiftModal: !this.state.showSendGiftModal
    })
  }

  render(){
    const {navigation} = this.props
    
    return (
      <View style={styles.container}>
        <TopTabs navigation={navigation}/>
        <View style={styles.btnContainer}>
          <Button title={__.t('By Books for Gifting')} style={styles.btnBuyGifts} textStyles={styles.btnTxt} onPress={()=>{}}/>
          <Button title={__.t('Send Gift')} 
            style={styles.btnSendGifts} 
            textStyles={styles.btnTxt} 
            showBadge={true}
            badgeValue={5}
            onPress={this.openSenddGiftModal}/>
        </View>
        <SendGiftsModal isShow={this.state.showSendGiftModal} hideModal={this.hideSendGiftsModal}/>
      </View>
      
    )
  }
}

export default NetworkNavigator
