import { Constants } from '@common'
import WService from './helper/WService'
var wservice = new WService()


export const getProspects = () => {
  return new Promise((resolve, reject) => {
    wservice.getProspects()
    .then((response) => {
      if (response.statusCode == 200) {
        resolve({ items: response.body })
      } else {
        reject(response.body.message)
      }
    })
    .catch(reject)
  })
}