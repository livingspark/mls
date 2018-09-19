import * as ActionTypes from './ActionTypes'
import * as Services from '@services'
import prospects from '@dummyData/prospects'

export const getProspects = () => {
  return (dispatch, getState) => {
    dispatch({ type: ActionTypes.GET_PROSPECTS_PENDING })

    dispatch({ type: ActionTypes.GET_PROSPECTS_SUCCESS, prospects })

    // Services.getProspects()
    //   .then((categories) => {
    //     dispatch({ type: ActionTypes.GET_PROSPECTS_SUCCESS, prospects })
    //   })
    //   .catch((errMsg) => {
    //     dispatch({ type: ActionTypes.GET_PROSPECTS_FAIL, message: errMsg })
    //   })
  }
}
