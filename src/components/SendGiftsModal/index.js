import React from 'react'
import {
  View,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native'
import styles from './style'
import {} from '@common'
import {Text,Button,Input} from '@components'

class SendGiftsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '' };
  }

  render(){
    let {isShow,hideModal} = this.props

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShow}
        onRequestClose={()=>{}}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Text style={styles.title}>{'Send Gifts'}</Text>
            <View style={styles.content}>
              <Input
                placeholder={'Name'}
                value={this.state.firstname}
                onChangeText={(firstname)=>this.setState({firstname})}
                />
              <View style={styles.separator}/>
              <Input
                placeholder={'Email'}
                value={this.state.email}
                onChangeText={(email)=>this.setState({email})}
                />
            </View>
            <View style={styles.footerContainer}>
              <View style={styles.buttonContainer}>
                <Button title={'Cancel'} style={[styles.button, styles.cancelBtn]} textStyles={styles.btnTxt} onPress={hideModal}/>
                <Button title={'Send'} style={[styles.button, styles.sendBtn]} textStyles={styles.btnTxt} onPress={this.signIn}/>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

export default SendGiftsModal
