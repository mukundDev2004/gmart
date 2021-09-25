import React, { PureComponent } from 'react'
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  I18nManager,
  Platform
} from 'react-native'
import WooComFetch, { getUrl, postHttp, getHttp } from '../common/WooComFetch'
import Toast from 'react-native-easy-toast'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImageLoad from '../common/RnImagePlaceH'
import { connect } from 'react-redux'
import SyncStorage from 'sync-storage'
import Spinner from 'react-native-loading-spinner-overlay'
import FBLoginButton from '../common/FBLoginButton'
import themeStyle from '../common/Theme.style'
const WIDTH = Dimensions.get('window').width
class Login extends PureComponent {
  /// /////////////////////////////////////////////////////////
  static navigationOptions = ({ navigation }) => {
    const headerStyle = navigation.getParam('headerTitle')
    return {
      headerTitle: headerStyle,
      headerRight: null,
      gestureEnabled: false,
      drawerLockMode: 'locked-closed',
      headerTitleAlign: 'center',
      headerTintColor: themeStyle.headerTintColor,
      headerStyle: {
        backgroundColor: themeStyle.primary
      },
      headerTitleStyle: {
        fontWeight: Platform.OS === 'android' ? 'bold' : 'normal'
      },
      headerForceInset: { top: 'never', vertical: 'never' }
    }
  }

  /// /////////////////////////////////////////////////////////
  componentDidMount () {
    this.props.navigation.setParams({
      headerTitle: this.props.isLoading.Config.languageJson.Login
    })
  }

  /// //////////////////////////////////////////////////////////
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      password: '',
      errorMessage: '',
      SpinnerTemp: false,
      colorGren: false
    }
  }

  login = async t => {
    t.setState({ SpinnerTemp: true })
    const formData = new FormData()
    formData.append('email', this.state.userName)
    formData.append('password', this.state.password)

    const data = await postHttp(getUrl() + '/api/' + 'processlogin', formData)
    if (data.success == 1) {
      t.getUserData(data.data[0], 'simple', t)
    }
    if (data.success == 0) {
      t.setState({ errorMessage: data.message, SpinnerTemp: false, colorGren: false })
    }
  }

  /// //////////////////////////////////////////////////////////
  /// /////////////////////////////////////
  getUserData = (data, type, t) => {
    try {
      const customerData = data
      customerData.customers_telephone = data.phone
      customerData.phone = data.phone
      customerData.customers_id = data.id
      customerData.customers_firstname = data.first_name
      customerData.customers_lastname = data.last_name
      customerData.phone = data.phone
      customerData.avatar = data.avatar
      customerData.image_id = data.image_id
      customerData.customers_dob = data.dob
      SyncStorage.set('customerData', customerData)
      this.setState({ spinnerTemp: true })
      this.props.getAllCategories(this.props)
      this.props.getBannersData()
      this.props.getFlashData(this.props)
      this.props.getTopSeller(this.props)
      this.props.getSpecialData(this.props)
      this.props.getMostLikedData(this.props, this)
      this.props.getProductData(this.props, this)
    } catch (e) {
      t.setState({ SpinnerTemp: false })
    }
  }

  /// //////////////////////////////////////
  createAccount = async (info, type, h) => {
    const formData = new FormData()
    formData.append('access_token', info)
    const temp = {}
    temp.access_token = info
    const data2 = await WooComFetch.postHttp(
      getUrl() + '/api/' + 'facebookregistration',
      temp
    )
    this.setState({ SpinnerTemp: true }, () => {
      if (data2.data !== undefined) {
        if (data2.data.data[0] !== undefined) {
          this.getUserData(data2.data.data[0], 'fb', this)
        } else {
          this.setState({ SpinnerTemp: false })
        }
      } else {
        this.setState({ SpinnerTemp: false })
      }
    })
  }

  EmailNumberCheck () {
    const { userName } = this.state
    const reg = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    return (
      (userName.length === 0) || reg.test(userName) === true
    )
  }

  /// //////
  render () {
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: themeStyle.backgroundColor }}>
        <Toast
          ref='toast'
          style={{ backgroundColor: '#c1c1c1' }}
          position='top'
          positionValue={400}
          fadeOutDuration={7000}
          textStyle={{ color: themeStyle.textColor, fontSize: 15 }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: themeStyle.backgroundColor,
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Spinner
            visible={this.state.SpinnerTemp}
            textStyle={{
              backgroundColor: themeStyle.loadingIndicatorColor,
              color: themeStyle.loadingIndicatorColor
            }}
          />
          <View style={{ opacity: 0.2 }}>
            <ImageLoad
              key={1}
              style={{ marginTop: 30, width: 150, height: 150 }}
              loadingStyle={{
                size: 'large',
                color: themeStyle.loadingIndicatorColor
              }}
              placeholder={false}
              ActivityIndicator={true}
              placeholderStyle={{ width: 0, height: 0 }}
              source={require('../images/icons_stripe.png')}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>

            {this.props.isLoading.Config.showLoginForm
              ? <TextInput
                style={{
                  marginTop: 20,
                  height: 38,
                  width: WIDTH * 0.9,
                  borderColor: this.EmailNumberCheck() ? '#c1c1c1' : themeStyle.removeBtnColor,
                  borderBottomWidth: 1,
                  textAlign: I18nManager.isRTL ? 'right' : 'left',
                  paddingLeft: 6,
                  paddingRight: 6,
                  fontSize: themeStyle.mediumSize + 2,
                  color: themeStyle.textColor
                }}
                placeholderTextColor={'#c1c1c1'}
                selectionColor={themeStyle.primaryDark}
                placeholder={this.props.isLoading.Config.languageJson.Email}
                onChangeText={userName =>
                  this.setState({ userName, errorMessage: '' })
                }
                value={this.state.userName}
              />
              : null }

            {!this.EmailNumberCheck() ? (
              <Text
                style={{
                  marginTop: 5,
                  color: 'red',
                  fontSize: themeStyle.mediumSize,
                  alignSelf: 'flex-start'
                }}>
                {this.props.isLoading.Config.languageJson2['The email address is not valid']}
              </Text>
            ) : null}
            {this.props.isLoading.Config.showLoginForm
              ? <TextInput
                style={{
                  marginTop: 15,
                  height: 38,
                  width: WIDTH * 0.9,
                  borderColor: '#c1c1c1',
                  borderBottomWidth: 1,
                  textAlign: I18nManager.isRTL ? 'right' : 'left',
                  paddingLeft: 6,
                  paddingRight: 6,
                  fontSize: themeStyle.mediumSize + 2,
                  color: themeStyle.textColor
                }}
                placeholderTextColor={'#c1c1c1'}
                secureTextEntry
                selectionColor={themeStyle.primaryDark}
                placeholder={this.props.isLoading.Config.languageJson.Password}
                onChangeText={password =>
                  this.setState({ password, errorMessage: '' })
                }
                value={this.state.password}
              />
              : null }
            {this.state.errorMessage !== '' ? (
              <Text
                style={{
                  marginTop: 18,
                  color: this.state.colorGren ? 'green' : 'red'
                }}>
                {this.state.errorMessage}
              </Text>
            ) : null}

            {this.props.isLoading.Config.showLoginForm
              ? <TouchableOpacity
                disabled={
                  !!(this.state.userName === '' || this.state.password === '')
                }
                onPress={() => this.login(this)}>
                <View
                  style={{
                    marginTop: 18,
                    alignItems: 'center',
                    height: 38,
                    width: WIDTH * 0.9,
                    backgroundColor: themeStyle.otherBtnsColor,
                    justifyContent: 'center',
                    opacity:
                    this.state.userName === '' || this.state.password === ''
                      ? 0.4
                      : 0.9
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: themeStyle.otherBtnsText,
                      fontSize: themeStyle.mediumSize,
                      fontWeight: '500'
                    }}>
                    {this.props.isLoading.Config.languageJson.Login}
                  </Text>
                </View>
              </TouchableOpacity>
              : null }

            {this.props.isLoading.Config.enablePhoneLogin
              ? <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('LoginWithPhoneScreen')
                }
                }>
                <View
                  style={{
                    marginTop: 18,
                    alignItems: 'center',
                    height: 38,
                    width: WIDTH * 0.9,
                    backgroundColor: themeStyle.otherBtnsColor,
                    justifyContent: 'center'
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: themeStyle.otherBtnsText,
                      fontSize: themeStyle.mediumSize,
                      fontWeight: '500'
                    }}>
                    {`${this.props.isLoading.Config.languageJson['Login with']} ${this.props.isLoading.Config.languageJson.Mobile}`}
                  </Text>
                </View>
              </TouchableOpacity>
              : null }
            {this.props.isLoading.Config.showLoginForm
              ? <Text
                onPress={() => {
                  this.props.navigation.navigate('ForgotPasswordScreen')
                }}
                style={{
                  marginTop: 18,
                  paddingBottom: 7,
                  fontSize: themeStyle.mediumSize + 1,
                  marginBottom: 6,
                  fontWeight: '500',
                  color: themeStyle.textColor
                }}>
                {
                  this.props.isLoading.Config.languageJson[
                    "I've forgotten my password?"
                  ]
                }
              </Text>
              : null}
            {this.props.isLoading.Config.fbButton === 1 ? (
              <FBLoginButton
                onRef={ref => (this.parentReference = ref)}
                parentReference={(a, s, d) =>
                  this.setState({ SpinnerTemp: true }, () => {
                    this.createAccount(a, s, d)
                  })
                }
              />
            ) : null}
            {this.props.isLoading.Config.showLoginForm
              ? <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('CreateAccountScreen')
                }>
                <View
                  style={{
                    marginTop: 18,
                    borderWidth: 0.6,
                    borderColor: themeStyle.textColor,
                    alignItems: 'center',
                    height: 38,
                    width: WIDTH * 0.9,
                    backgroundColor: themeStyle.backgroundColor,
                    justifyContent: 'center',
                    borderRadius: 4,
                    marginBottom: 2
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: themeStyle.mediumSize + 1,
                      color: themeStyle.textColor,
                      fontWeight: '500'
                    }}>
                    {this.props.isLoading.Config.languageJson.Register}
                  </Text>
                </View>
              </TouchableOpacity>
              : null }
            {SyncStorage.get('cartScreen') === 1 &&
            this.props.isLoading.Config.guestCheckOut ? (
                <TouchableOpacity
                  onPress={() => {
                    const temp = {}
                    temp.id = 0
                    temp.billing = {
                      first_name: '',
                      last_name: '',
                      company: '',
                      address_1: '',
                      address_2: '',
                      city: '',
                      state: '',
                      postcode: '',
                      country: '',
                      email: '',
                      phone: ''
                    }
                    temp.billingCountryName = ''
                    temp.billingStateName = ''
                    temp.shipping = {
                      first_name: '',
                      last_name: '',
                      company: '',
                      address_1: '',
                      address_2: '',
                      city: '',
                      state: '',
                      postcode: '',
                      country: ''
                    }
                    temp.shippingCountryName = ''
                    temp.shippingStateName = ''
                    SyncStorage.set('customerData', temp)
                    SyncStorage.set('gustLogin', true)

                    if (this.props.isLoading.Config.checkOutPage == 1) {
                    } else {
                      this.props.navigation.navigate('ShippingAddressScreen')
                    }
                  }}>
                  <View
                    style={{
                      marginTop: 18,
                      borderWidth: 1,
                      borderColor: themeStyle.primary,
                      alignItems: 'center',
                      height: 38,
                      width: WIDTH * 0.9,
                      backgroundColor: themeStyle.backgroundColor,
                      justifyContent: 'center'
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: themeStyle.mediumSize,
                        color: themeStyle.primary,
                        fontWeight: '500'
                      }}>
                      {
                        this.props.isLoading.Config.languageJson2[
                          'Continue as a Guest'
                        ]
                      }
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : null}
          </View>
        </View>
      </KeyboardAwareScrollView>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  getAllCategories: props => {
    const formData = new FormData()
    formData.append(
      'customers_id',
      SyncStorage.get('customerData').customers_id !== null &&
        SyncStorage.get('customerData').customers_id !== undefined
        ? SyncStorage.get('customerData').customers_id
        : null
    )
    formData.append('page_number', 0)
    formData.append(
      'language_id',
      SyncStorage.get('langId') === undefined ? '1' : SyncStorage.get('langId')
    )
    formData.append(
      'currency_code',
      props.isLoading.Config.productsArguments.currency
    )
    dispatch({
      type: 'GET_ALL_CATEGORIES',
      payload: formData
    })
  },

  getBannersData: () => {
    dispatch(async dispatch => {
      const formData = new FormData()
      formData.append(
        'customers_id',
        SyncStorage.get('customerData').customers_id !== null &&
          SyncStorage.get('customerData').customers_id !== undefined
          ? SyncStorage.get('customerData').customers_id
          : null
      )
      formData.append(
        'language_id',
        SyncStorage.get('langId') === undefined
          ? '1'
          : SyncStorage.get('langId')
      )
      var dat = {}

      dat.languages_id = '1'
      const json = await getHttp(
        getUrl() + '/api/' + 'getbanners?languages_id=1',
        {}
      )
      if (json.data.success === '1') {
        dispatch({
          type: 'ADD_BANNERS',
          payload: json.data.data
        })
      }
    })
  },
  getFlashData: props => {
    dispatch(async dispatch => {
      const formData = new FormData()
      formData.append(
        'customers_id',
        SyncStorage.get('customerData').customers_id !== null &&
          SyncStorage.get('customerData').customers_id !== undefined
          ? SyncStorage.get('customerData').customers_id
          : null
      )
      formData.append('page_number', 0)
      formData.append(
        'language_id',
        SyncStorage.get('langId') === undefined
          ? '1'
          : SyncStorage.get('langId')
      )
      formData.append(
        'currency_code',
        props.isLoading.Config.productsArguments.currency
      )
      formData.append('type', 'flashsale')
      const json = await postHttp(
        getUrl() + '/api/' + 'getallproducts',
        formData
      )
      dispatch({
        type: 'ADD_FLASH_PRODUCTS',
        payload1: json.product_data
      })
    })
  },
  getTopSeller: props => {
    dispatch(async dispatch => {
      const formData = new FormData()
      formData.append(
        'customers_id',
        SyncStorage.get('customerData').customers_id !== null &&
          SyncStorage.get('customerData').customers_id !== undefined
          ? SyncStorage.get('customerData').customers_id
          : null
      )
      formData.append('page_number', 0)
      formData.append(
        'language_id',
        SyncStorage.get('langId') === undefined
          ? '1'
          : SyncStorage.get('langId')
      )
      formData.append(
        'currency_code',
        props.isLoading.Config.productsArguments.currency
      )
      formData.append('type', 'top seller')
      const json = await postHttp(
        getUrl() + '/api/' + 'getallproducts',
        formData
      )
      dispatch({
        type: 'ADD_TOP_SELLER_PRODUCTS',
        payload10: json.product_data
      })
    })
  },
  getSpecialData: props => {
    dispatch(async dispatch => {
      const formData = new FormData()
      formData.append(
        'customers_id',
        SyncStorage.get('customerData').customers_id !== null &&
          SyncStorage.get('customerData').customers_id !== undefined
          ? SyncStorage.get('customerData').customers_id
          : null
      )
      formData.append('page_number', 0)
      formData.append(
        'language_id',
        SyncStorage.get('langId') === undefined
          ? '1'
          : SyncStorage.get('langId')
      )
      formData.append(
        'currency_code',
        props.isLoading.Config.productsArguments.currency
      )
      formData.append('type', 'special')
      const json = await postHttp(
        getUrl() + '/api/' + 'getallproducts',
        formData
      )
      dispatch({
        type: 'ADD_SPECIAL_PRODUCTS',
        payload2: json.product_data
      })
    })
  },
  getMostLikedData: (props2, props) => {
    dispatch(async dispatch => {
      const formData = new FormData()
      formData.append(
        'customers_id',
        SyncStorage.get('customerData').customers_id !== null &&
          SyncStorage.get('customerData').customers_id !== undefined
          ? SyncStorage.get('customerData').customers_id
          : null
      )
      formData.append('page_number', 0)
      formData.append(
        'language_id',
        SyncStorage.get('langId') === undefined
          ? '1'
          : SyncStorage.get('langId')
      )
      formData.append(
        'currency_code',
        props2.isLoading.Config.productsArguments.currency
      )
      formData.append('type', 'most liked')
      const json = await postHttp(
        getUrl() + '/api/' + 'getallproducts',
        formData
      )
      dispatch({
        type: 'ADD_MOST_LIKED_PRODUCTS',
        payload3: json.product_data
      })
    })
  },
  getProductData: (r, t) => {
    dispatch(async dispatch => {
      const formData = new FormData()
      formData.append(
        'customers_id',
        SyncStorage.get('customerData').customers_id !== null &&
          SyncStorage.get('customerData').customers_id !== undefined
          ? SyncStorage.get('customerData').customers_id
          : null
      )
      formData.append('page_number', 0)
      formData.append(
        'language_id',
        SyncStorage.get('langId') === undefined
          ? '1'
          : SyncStorage.get('langId')
      )
      formData.append(
        'currency_code',
        t.props.isLoading.Config.productsArguments.currency
      )
      formData.append('categories_id', 0)
      const json = await postHttp(
        getUrl() + '/api/' + 'getallproducts',
        formData
      )
      SyncStorage.set('gustLogin', false)
      t.setState({ SpinnerTemp: false })
      if (SyncStorage.get('cartScreen') === 1) {
        SyncStorage.set('cartScreen', 0)
        if (t.props.navigation.state.params.updateCart !== undefined) {
          t.props.navigation.state.params.updateCart()
        }
        t.props.navigation.goBack()
      } else {
        if (t.props.navigation.state.params.updateCart !== undefined) {
          t.props.navigation.state.params.updateCart()
        }
        if (SyncStorage.get('drawerLogin')) {
          SyncStorage.set('drawerLogin', false)
          t.props.navigation.navigate('SETTINGS')
        } else {
          t.props.navigation.navigate('SettingsScreen')
        }
      }
      t.refs.toast.show(t.props.isLoading.Config.languageJson2[
        'successfully Login'
      ])
      t.setState({
        userName: '', password: ''
      })
      dispatch({
        type: 'ADD_Products',
        payload6: json.product_data
      })
    })
  }
})
const mapStateToProps = state => ({
  isLoading: state
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
