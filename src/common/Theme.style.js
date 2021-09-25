import { Dimensions } from 'react-native'
import uuid from 'react-native-uuid'
WIDTH = Dimensions.get('window').width
// set card width according to your requirement
const cardWidth = WIDTH * 0.3991
// cardWidth= WIDTH * 0.4191 // card width for two and half card
// cardWidth= WIDTH * 0.6191 // one and half
// cardWidth= WIDTH * 0.42
const cIp = '192.168.1.' + Math.floor(Math.random() * 99) + 1 // default
const cDid = uuid.v4()
export default {

  url: 'https://gmart.3ilogics.org', //your site URL
  consumerKey: 'dadb7a7c1557917902724bbbf5', // Your consumer secret
  consumerSecret: '3ba77f821557917902b1d57373', // Your consumer secret

  /// //// navigation
  homeTitle: 'Gmart',
  bottomNavigation: false,
  // please reset app cache after changing these five values
  defaultCurrencySymbol: '&#8377;',
  defaultCurrencyCode: 'INR',
  priceDecimals: 2,
  // by default language for ltr
  ltrlanguageCode: 'en',
  // by default language for rtl
  rtllanguageCode: 'ar',

  // Banners props
  autoplay: true,
  autoplayDelay: 2,
  autoplayLoop: true,
  StatusBarColor: '#ff7600',

  barStyle: 'light-content', // dark-content, default

  headerTintColor: '#fff',
  headerIconsColor: '#fff',

  primaryDark: '#ff7600',
  primary: '#ff7600',
  primaryContrast: '#ffffff',
  // backgroundColor: '#F2F2F2',// color for card style 11
  backgroundColor: '#e8feff',
  textColor: '#000',
  textContrast: '#000',

  google: '#dd4b39',
  facebook: '#3b5998',

  // Button Colors
  addToCartBtnColor: '#ff4f4f',
  addToCartBtnTextColor: '#fff',
  addToCartBagBtnColor: '#ff4f4f',

  outOfStockBtnColor: '#D81800',
  outOfStockBtnTextColor: '#fff',

  detailsBtnColor: '#3e5902',
  detailsBtnTextColor: '#fff',
  removeBtnColor: '#D81800',
  removeBtnTextColor: '#fff',
  wishHeartBtnColor: '#3e5902',
  otherBtnsColor: '#ff7600',
  otherBtnsText: '#fff',

  saleBackgroundColor: '#3e5902',
  saleTextColor: '#fff',
  featuredBackgroundColor: '#3e5902',
  featuredTextColor: '#fff',
  newBackgroundColor: '#333',
  newTextColor: '#fff',

  priceColor: '#000',

  /// ///////// font size

  largeSize: 16,
  mediumSize: 14,
  smallSize: 12,

  /// //////// cartWidth
  singleRowCardWidth: cardWidth,
  twoRowCardWIdth: 0.465,
  loadingIndicatorColor: '#3e5902',
  ipAdress: cIp,
  deviceId: cDid,

////////////// castom


  cardBg:'#fff',
  catagRibbon: '#fff4ce',


}




