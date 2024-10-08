import actionTypes from "../actions/actionType";
const initState = {
    banner: []
}
const appReducer = (state = initState, action) => { //action = data dispatch dua len
    switch (action.type) {
        case actionTypes.GET_HOME:
            console.log(action);
            return {
                ...state,
                banner: action.homeData?.find(item => item.sectionType === 'banner')?.items || null
            }


        default:
            return state
    }
}

export default appReducer