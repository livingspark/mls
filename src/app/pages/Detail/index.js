import React from 'react'
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native'
import styles from './style'
import { Text, Products, Attributes, Divider, StockItem, VendorItem, SpecificationItem, ProductImageSlider } from '@components'
import { connect } from 'react-redux'
import { ActionCreators } from '@actions'
import { bindActionCreators } from 'redux'
import * as ActionTypes from '@actions/ActionTypes'

import { Utils, Config } from '@common'
import HTML from 'react-native-render-html'

class Detail extends React.Component {
  render() {
    let { products, navigation, showDetail, vendorInfo, showSpecification, showVendor } = this.props
    let product = navigation.state.params.product
    let vendor = {}
    if (vendorInfo && product) {
      vendor = vendorInfo
      if (product.store) {
        vendor.nameStore = product.store.name
      }
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <ProductImageSlider images={product.images} />
          {/* <Image source={{ uri: Utils.getProductImageUrl(product, "image") }} style={styles.image} /> */}
          <View style={styles.separator} />
          <Text style={styles.name}>{product.name}</Text>
          {
            Utils.isNotEmpty(product.price) &&
            <Text style={styles.price}>{Config.Currency.symbol}{product.price}</Text>
          }
          <View style={styles.productRow}>
            <StockItem product={product} />
            <SpecificationItem onPress={() => showSpecification(this._getObjSpecification())} />
          </View>
          <TouchableOpacity style={[styles.addCart, !product.in_stock && styles.disabledCart]} onPress={this.addToCart} disabled={!product.in_stock}>
            <Text style={styles.addCartText}>{__.t('Add to Cart')}</Text>
          </TouchableOpacity>
          {
            (product.attributes && product.attributes.length > 0) &&
            <View>
              <Divider />
              <View style={styles.attributes}>
                <Text style={styles.titleAttributes}>{__.t('Attributes')}</Text>
                <Attributes attributes={product.attributes} />
              </View>
            </View>
          }
          {
            (Config.EnabledDoken && product) &&
            <View>
              <Divider />
              <View style={styles.attributes}>
                <VendorItem item={vendorInfo} name={product.store ? product.store.name : ''} onPress={() => showVendor(vendor)} />
              </View>
              <Divider />
            </View>
          }
          {products.length > 0 && <Products sectionTitle={__.t('Sponsored')} products={products} seeAll={false} onPress={showDetail} />}
          <HTML html={product.description} containerStyle={styles.description} imagesMaxWidth={Dimensions.get('window').width} />
        </ScrollView>
      </SafeAreaView>
    )
  }

  _getObjSpecification = () => {
    let product = this.props.navigation.state.params.product
    let metaData = product.meta_data
    for (let i = 0; i < metaData.length; i++) {
      let data = metaData[i]
      if (data.key === '_specifications') {
        return data.value
      }
    }
    return null
  }

  addToCart = () => {
    let product = this.props.navigation.state.params.product
    this.props.addToCart(product)
  }

  componentDidMount() {
    let product = this.props.navigation.state.params.product
    let category_ids = Utils.getCustomAttribute(product.custom_attributes, "category_ids")
    if (category_ids && category_ids.length > 0) {
      this.props.getProductsByCategory(category_ids[0], "", 0)
    }
    if (Config.EnabledDoken) {
      this.props.getVendorInfo(product.store.id)
    }
  }

  componentWillReceiveProps = (nextProps) => {
  }
}

Detail.defaultProps = {
  products: [],
  vendorInfo: null
}

function mapStateToProps({ productsByCategoryReducers, vendorReducers }) {
  return {
    products: typeof productsByCategoryReducers.productsByCategory != "undefined" ? productsByCategoryReducers.productsByCategory.products : [],
    vendorInfo: typeof vendorReducers.vendorInfo !== "undefined" ? vendorReducers.vendorInfo : null,
    typeVendor: vendorReducers.type
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
