import {StyleSheet} from 'react-native'
import {Colors,Constants} from '@common'

export default StyleSheet.create({
  container:{
    flexDirection: 'row',
    margin:10,
    padding:10,
    backgroundColor: Colors.White,
    borderWidth:0.5,
    borderRadius:10,
    borderColor:Colors.Gray,
  },
  avatarContainer:{
    alignContent:'center'
  },
  contentContainer:{
    flex:1,
    marginLeft:10,
  },
  avatar:{
    width:80,
    height:80,
    borderRadius:10,
    borderWidth:0.5,
    borderColor:Colors.White
  },
  titleContainer: {
    flexDirection: 'row',
  },
  name:{
    flex:1,
    fontSize:Constants.FontSize.tiny
  },
  timeStamp:{
    flex:1,
    fontSize:Constants.FontSize.tiny,
    textAlign:'right'
  },
  buttonContainer:{
    flex:1,
    marginTop:10,
    flexDirection:'row',
    alignContent:'center',
    flexWrap:'wrap',
    alignItems:'flex-start',
    justifyContent:'flex-start'
  },
  downlineBtn:{
    flex:1,
    borderRadius:5,
    backgroundColor:Colors.LighterGray,
    paddingHorizontal:10,
    paddingVertical:10
  },
  giftedBtn:{
    flex:1,
    borderRadius:5,
    backgroundColor:Colors.LighterGray,
    marginHorizontal:5,
    paddingHorizontal:10,
    paddingVertical:10,
  },
  btnTxt: {
    color:Colors.DarkGray,
    fontSize:Constants.FontSize.tiny
  }
})
