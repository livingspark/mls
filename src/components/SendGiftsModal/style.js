import {StyleSheet} from 'react-native'
import {Colors,Constants} from '@common'

export default StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  innerContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  content:{
    backgroundColor:'white',
    marginHorizontal:10,
    paddingHorizontal:10,
    alignSelf:'stretch',
    paddingVertical:5,
    borderRadius:3
  },
  footerContainer: {
    alignSelf:'stretch',
    borderTopColor: Colors.Gray,
    borderTopWidth: 1,
  },
  buttonContainer: {
    alignSelf:'center',
    flexDirection: 'row',
    paddingHorizontal:5,
    paddingVertical:5
  },
  button:{
    borderRadius:5,
    paddingHorizontal:10,
    paddingVertical:10,
    marginHorizontal:10,
  },
  cancelBtn: {
    backgroundColor:Colors.Malibu,
  },
  sendBtn: {
    backgroundColor:Colors.Orange,
  },
  btnTxt:{
    fontSize:Constants.FontSize.small,
    marginHorizontal:10,
    marginTop:2
  },
  separator:{
    height:0.5,
    backgroundColor:Colors.LightGray
  },
})
