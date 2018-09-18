import { Constants } from '@common'
import WService from './helper/WService'
var wservice = new WService()

export const getShippingMethods = () => {
  return new Promise((resolve, reject) => {

    wservice.getShippingMethods()
      .then((response) => {
        if (response.statusCode == 200) {
          if (response.body.length > 0) {
            resolve(response.body)
          } else {
            reject(__.t("Don't have any shipping methods at your address"))
          }
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const getPaymentMethods = () => {
  return new Promise((resolve, reject) => {

    wservice.getPaymentMethods()
      .then((response) => {
        if (response.statusCode == 200) {
          resolve(response.body)
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const createOrder = (params) => {
  return new Promise((resolve, reject) => {
    wservice.createOrder(params)
      .then((response) => {
        if (response.statusCode == 201) {
          resolve(response.body)
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const getMyOrders = (customer_id, page) => {
  return new Promise((resolve, reject) => {
    wservice.getMyOrders(customer_id, page, Constants.Api.Limit)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve(response.body)
        } else {
          reject(response.body.message)
        }
      })
      .catch(reject)
  })
}

export const paymentStripe = (data) => {
  return new Promise((resolve, reject) => {
    wservice.paymentStripe(data)
      .then((response) => {
        if (response.statusCode == 200) {
          resolve(response)
        } else {
          reject(response.body.message)
        }
      })
      .catch((err) => {
        console.log(err)
        reject(err)
      })
  })
}
