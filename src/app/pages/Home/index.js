import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  LayoutAnimation,
  ActivityIndicator
} from "react-native";
import styles from "./style";
import {
  SearchBar,
  Promotions,
  BrowserByCategory,
  Brands,
  Products
} from "@components";

import { connect } from "react-redux";
import { ActionCreators } from "@actions";
import { bindActionCreators } from "redux";
import * as ActionTypes from "@actions/ActionTypes";

import { Config, Constants, Global } from "@common";

class Home extends React.Component {
  state = {
    loading: true
  };

  render() {
    let {
      categories,
      homeProducts,
      showDetail,
      openProductsByCategory
    } = this.props;

    if (this.state.loading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <Promotions
            promotions={Config.Promotions}
            onPress={openProductsByCategory}
          />
          <Brands brands={Config.Brands} />
          {categories.length > 0 && (
            <BrowserByCategory
              categories={categories}
              onPress={openProductsByCategory}
            />
          )}
          {homeProducts.length > 0 &&
            homeProducts.map((item, index) => (
              <Products
                key={index}
                seeAll={item.products.length == Constants.Api.Limit}
                sectionTitle={item.categoryName}
                category={item.category}
                products={item.products}
                onPress={showDetail}
                onClickSeeAll={openProductsByCategory}
              />
            ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  componentDidMount() {
    if (this.props.categories.length > 0) {
      this.props.getProductsForHome(this.props.categories);
    } else {
      this.syncing = false;
    }
    this.props.getCategories();
    this.onLogout = Global.EventEmitter.addListener(
      Constants.EventEmitterName.onLogout,
      this.signOut
    );
  }

  signOut = () => {
    this.props.signOut();
  };

  componentWillUnmount = () => {
    this.onLogout.remove();
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.homeProducts.length == 0 &&
      nextProps.categoriesType == ActionTypes.GET_CATEGORIES_SUCCESS &&
      this.syncing == false
    ) {
      this.syncing = true;
      this.props.getProductsForHome(nextProps.categories);
    }

    if (nextProps.productsType == ActionTypes.GET_PRODUCTS_FOR_HOME_SUCCESS) {
      this.setState({ loading: false });

      if (this.syncing != true) {
        this.syncing = true;
        this.props.getCategories();
      }
    }
  }
}

Home.defaultProps = {
  categories: [],
  products: [],
  homeProducts: []
};

function mapStateToProps({ categoriesReducers, productsReducers }) {
  return {
    categories: categoriesReducers.categories,
    products: productsReducers.products,
    categoriesType: categoriesReducers.type,
    homeProducts: productsReducers.homeProducts,
    productsType: productsReducers.type
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
