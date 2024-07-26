import actionType from "./actionType";
import * as apis from '../../apis'

export const getHome = () => async (dispatch) => { //ham goi ve ham
    try {
        const response = await apis.getHome()
        if (response?.data.err === 0) {
            dispatch({
                type: actionType.GET_HOME,
                homeData: response.data.data.items
            })
        } else {
            dispatch({
                type: actionType.GET_HOME,
                homeData: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionType.GET_HOME,
            homeData: null
        })
    }
}
