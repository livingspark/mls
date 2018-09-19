import {StyleSheet} from 'react-native'
import {Constants} from '@common'
import {Colors} from '@common'

export default StyleSheet.create({
  container:{ 
    flex: 1,
  },
  list:{
  },
  colContainer:{
    backgroundColor:Colors.Malibu,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 2
  },
  colRow: {
    backgroundColor:Colors.Malibu,
    alignItems: 'flex-start', 
    justifyContent: 'flex-start', 
    paddingVertical: 8,
  },
  dataRow:{
    flexDirection:'row',
    alignItems: 'flex-start', 
    justifyContent: 'flex-start', 
    paddingVertical: 10,
  },
  cell:{
    color:'black',
    alignSelf: 'flex-start'
  },
  text:{
    color:Colors.White,
    fontFamily: Constants.FontFamily,
    fontSize:Constants.FontSize.tiny,
  }
})
