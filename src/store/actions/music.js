import actionType from "./actionType";
import * as apis from '../../apis'

export const setCurSongId = (sid) => ({
    type: actionType.SET_CUR_SONG_ID,
    sid
})

export const play = (flag) => ({
    type: actionType.PLAY,
    flag
})
export const playAlbum = (flag) => ({
    type: actionType.SET_ALBUM,
    flag
})
