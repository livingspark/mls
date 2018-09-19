import React from 'react'
import { Image } from 'react-native'
import { TabBarItem } from '@components'

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { Constants, Colors, Icons } from '@common'
import HomeScreen from './screens/HomeScreen'
import DealsScreen from './screens/DealsScreen'
import SearchScreen from './screens/SearchScreen'
import CartsScreen from './screens/CartsScreen'
import MyProfileScreen from './screens/MyProfileScreen'
import MyWishListScreen from './screens/MyWishListScreen'
import LanguagesScreen from './screens/LanguagesScreen'
import MyAddressScreen from './screens/MyAddressScreen'
import LaunchScreen from './screens/LaunchScreen'
import DetailScreen from './screens/DetailScreen'
import ProductsByCategoryScreen from './screens/ProductsByCategoryScreen'
import SetLanguageScreen from './screens/SetLanguageScreen'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import FeedbackScreen from './screens/FeedbackScreen'
import ShippingInfoScreen from './screens/ShippingInfoScreen'
import ShippingAddressScreen from './screens/ShippingAddressScreen'
import PaymentInfoScreen from './screens/PaymentInfoScreen'
import AddAddressScreen from './screens/AddAddressScreen'
import MyOrdersScreen from './screens/MyOrdersScreen'
import FilterScreen from './screens/FilterScreen'
import AttributeDetailScreen from './screens/AttributeDetailScreen'
import SpecificationScreen from './screens/SpecificationScreen'
import VendorScreen from './screens/VendorScreen'
import NetworkNavigator from './screens/NetworkNavigator'

const stackNavigatorConfiguration = {
  mode: 'card',
  navigationOptions: {
    headerStyle: { backgroundColor: Colors.AppColor, borderBottomWidth: 0 },
    headerTintColor: 'white',
    headerTitleStyle: { fontSize: 16, fontFamily: Constants.FontFamily, fontWeight: 'bold' },
    headerBackground: (<Image style={{ flex: 1, width: Constants.ScreenSize.width }} source={Icons.MenuBg} />)
  }
}

const homeTabScreens = {}
homeTabScreens[Constants.Screen.Home] = { screen: HomeScreen }
homeTabScreens[Constants.Screen.Detail] = { screen: DetailScreen }
homeTabScreens[Constants.Screen.ProductsByCategory] = { screen: ProductsByCategoryScreen }
homeTabScreens[Constants.Screen.Specification] = { screen: SpecificationScreen }
homeTabScreens[Constants.Screen.Vendor] = { screen: VendorScreen }
const homeStack = createStackNavigator(homeTabScreens, stackNavigatorConfiguration)

const dealsTabScreens = {}
dealsTabScreens[Constants.Screen.Deals] = { screen: DealsScreen }
dealsTabScreens[Constants.Screen.Detail] = { screen: DetailScreen }
dealsTabScreens[Constants.Screen.ProductsByCategory] = { screen: ProductsByCategoryScreen }
dealsTabScreens[Constants.Screen.Specification] = { screen: SpecificationScreen }
dealsTabScreens[Constants.Screen.AttributeDetail] = { screen: AttributeDetailScreen }
dealsTabScreens[Constants.Screen.Vendor] = { screen: VendorScreen }
const dealsStack = createStackNavigator(dealsTabScreens, stackNavigatorConfiguration)

const searchTabScreens = {}
searchTabScreens[Constants.Screen.Search] = { screen: SearchScreen }
searchTabScreens[Constants.Screen.Detail] = { screen: DetailScreen }
searchTabScreens[Constants.Screen.Filter] = { screen: FilterScreen }
searchTabScreens[Constants.Screen.Specification] = { screen: SpecificationScreen }
searchTabScreens[Constants.Screen.AttributeDetail] = { screen: AttributeDetailScreen }
searchTabScreens[Constants.Screen.Vendor] = { screen: VendorScreen }
const searchStack = createStackNavigator(searchTabScreens, stackNavigatorConfiguration)

const cartsTabScreens = {}
cartsTabScreens[Constants.Screen.Carts] = { screen: CartsScreen }
cartsTabScreens[Constants.Screen.ShippingAddress] = { screen: ShippingAddressScreen }
cartsTabScreens[Constants.Screen.ShippingInfo] = { screen: ShippingInfoScreen }
cartsTabScreens[Constants.Screen.PaymentInfo] = { screen: PaymentInfoScreen }
const cartsStack = createStackNavigator(cartsTabScreens, stackNavigatorConfiguration)

const profileTabScreens = {}
profileTabScreens[Constants.Screen.MyProfile] = { screen: MyProfileScreen }
profileTabScreens[Constants.Screen.MyWishList] = { screen: MyWishListScreen }
profileTabScreens[Constants.Screen.Languages] = { screen: LanguagesScreen }
profileTabScreens[Constants.Screen.MyAddress] = { screen: MyAddressScreen }
profileTabScreens[Constants.Screen.Feedback] = { screen: FeedbackScreen }
profileTabScreens[Constants.Screen.AddAddress] = { screen: AddAddressScreen }
profileTabScreens[Constants.Screen.MyOrders] = { screen: MyOrdersScreen }
const profileStack = createStackNavigator(profileTabScreens, stackNavigatorConfiguration)

const networkScreen = {}
networkScreen[Constants.Screen.Network] = { screen: NetworkNavigator}
const networkStack = createStackNavigator(networkScreen, stackNavigatorConfiguration)

const tabScreens = {}
tabScreens[Constants.Screen.Home] = { screen: homeStack }
tabScreens[Constants.Screen.Deals] = { screen: dealsStack }
tabScreens[Constants.Screen.Search] = { screen: searchStack }
tabScreens[Constants.Screen.Carts] = { screen: cartsStack }
tabScreens[Constants.Screen.Network] = { screen: networkStack }
tabScreens[Constants.Screen.MyProfile] = { screen: profileStack }

const screens = {}
screens[Constants.Screen.Launch] = { screen: LaunchScreen }
screens[Constants.Screen.SignIn] = { screen: SignInScreen }
screens[Constants.Screen.SignUp] = { screen: SignUpScreen }
screens[Constants.Screen.SetLanguage] = { screen: SetLanguageScreen }

const mainTab = createBottomTabNavigator(tabScreens, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state
      var icon = null
      switch (routeName) {
        case Constants.Screen.Home:
          icon = Icons.Home
          break;
        case Constants.Screen.Deals:
          icon = Icons.Deals
          break;
        case Constants.Screen.Search:
          icon = Icons.Search
          break;
        case Constants.Screen.Carts:
          icon = Icons.Cart
          break;
        case Constants.Screen.MyProfile:
          icon = Icons.User
          break;
        default:
          return null
      }

      return <TabBarItem icon={icon} tintColor={tintColor} routeName={routeName} />
    }
  }),
  tabBarOptions: {
    showLabel: false,
    activeTintColor: Colors.AppColor,
  }
})

export default createStackNavigator({
  ...screens,
  default: {
    screen: mainTab
  }
}, {
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
  })
