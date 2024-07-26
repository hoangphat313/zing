import actionTypes from "../actions/actionType";
const initState = {
    curSongId: null,
    isPlaying: false
}
const musicReducer = (state = initState, action) => { //action = data action dua len
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.sid || null
            }
        case actionTypes.PLAY:
            return {
                ...state,
                isPlaying: action.flag
            }
        default:
            return state
    }
}

export default musicReducer