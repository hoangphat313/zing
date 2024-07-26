import appReducer from "./appReducer";
import { combineReducers } from "redux";
import musicReducer from "./musicReducer";
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

const commonConfig = {
    storage: storage,
    stateReconciler: autoMergeLevel2
}

const musicConfig = {
    ...commonConfig,
    key: 'music',
    whiteList: ['curSongId']
}

const rootReducer = combineReducers({
    app: appReducer,
    music: persistReducer(musicConfig, musicReducer) //co luu state trong storage voi config tuong ung
})
export default rootReducer