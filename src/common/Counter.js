import React, { PureComponent } from 'react'
import {
  Text, // Renders text
  TouchableOpacity, // Pressable container
  View // Container PureComponent
} from 'react-native'
import AwesomeAlert from 'react-native-awesome-alerts'
import theme from './Theme.style'
export default class Counter extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      count: this.props.initialValue,
      showAlert: false,
      initialValue: this.props.initialValue
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    return {
      count:
        nextProps.initialValue !== prevState.initialValue
          ? nextProps.initialValue
          : prevState.count
    }
  }


  componentDidMount () {
    if (this.props.innerRef !== undefined && this.props.innerRef !== null) {
      this.props.innerRef(this)
    }
  }

  componentWillUnmount () {
    if (this.props.innerRef !== undefined && this.props.innerRef !== null) {
      this.props.innerRef(null)
    }
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    })
  }

  hideAlert = () => {
    this.setState({
      showAlert: false
    })
  }


  increment () {
    this.setState({
      count: this.state.count + 1
    })
    return this.state.count + 1
  }

  decrement () {
    this.setState({
      count:
        this.props.minimumValue < this.state.count
          ? this.state.count - 1
          : this.state.count
    })
    return this.props.minimumValue < this.state.count
      ? this.state.count - 1
      : this.state.count - 1
  }

  // decrement () {
  //   this.setState({
  //     count:
  //       this.props.minimumValue < this.state.count
  //         ? this.state.count - 1
  //         : this.state.count
  //   })
  //   if(this.props.minimumValue < this.state.count){
  //     alert(this.state.count)
  //     return this.state.count - 1
  //   }
  //   else{
  //     this.showAlert()
  //   }
  // }




  resetValue () {
    this.setState({
      count: this.props.initialValue
    })
  }

  setValue (value) {
    this.setState({
      count: value
    })
  }

  render ({ onIncrement, onDecrement, width, height } = this.props) {
    const {showAlert} = this.state
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{
            width: 30,
            paddingVertical: height,
            paddingTop: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: theme.otherBtnsColor,
            borderRadius: 10 / 2,
            shadowOffset: { width: 1, height: 1 },
            shadowColor: theme.textColor,
            shadowOpacity: 0.3,
            elevation: 3
          }}
          onPress={() => {
            if (this.props.minimumValue < this.state.count) { onDecrement(this.decrement()) }
            else {
              this.showAlert()
            }
          }}>
          <Text
            style={{
              color: theme.otherBtnsText,
              fontSize: theme.largeSize + 1
            }}>
            {'-'}
          </Text>
        </TouchableOpacity>
        {/* //////////////////// */}
        <View
          style={{
            width: width - 6,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.backgroundColor
          }}>
          <Text
            style={{
              color: theme.textColor,
              fontSize: theme.mediumSize
            }}>
            {this.state.count}
          </Text>
        </View>
        {/* /////////////////// */}
        <TouchableOpacity
          style={{
            width: 30,
            paddingVertical: height,
            paddingTop: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            backgroundColor: theme.otherBtnsColor,
            borderRadius: 10 / 2,
            shadowOffset: { width: 1, height: 1 },
            shadowColor: theme.textColor,
            shadowOpacity: 0.3,
            elevation: 3
          }}
          onPress={() => {
            onIncrement(this.increment())
          }}>
          <Text
            style={{
              color: theme.otherBtnsText,
              fontSize: theme.largeSize + 1
            }}>
            {'+'}
          </Text>
        </TouchableOpacity>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          message="Want to remove this Item from Cart ?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Remove"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert()
          }}
          onConfirmPressed={() => {
            this.hideAlert()
            onDecrement(this.decrement())
          }}
        />
      </View>
    )
  }
}
