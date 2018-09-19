import React from 'react'
import {
  View,
} from 'react-native'
import styles from './style'

//TODO: replace with actual import of react native
import Svg,{
  Text,
  Polygon,
} from 'react-native-svg';
// import { Svg } from 'expo';
// const {
//   Polygon,
  
// } = Svg;

class StatusArrowItem extends React.Component {
  

  render(){
    const {fill, textFill, text} = this.props;
    
    return (
      <View >
        <Svg height="40" width="110">
          <Polygon
            points="0,0 100,0 110,18 100,36 0,36 10,18"
            fill={fill}
          />
          <Text
            fontSize="10"
            x="55"
            y="22"
            textAnchor="middle"
            fill={textFill}
          >
            {text}
          </Text>
        </Svg>
      </View>
    )
  }
}

export default StatusArrowItem
