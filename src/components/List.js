import React from 'react'
import * as actions from '../store/actions'
import icons from '../utils/icons'
import { useDispatch } from 'react-redux'
import moment from 'moment'

const { BsMusicNoteBeamed } = icons

const List = ({ songData }) => {
    const dispatch = useDispatch()
    return (
        <div
            className=' flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)]  hover:bg-[#DDE4E4] cursor-pointer'
            onClick={() => {
                dispatch(actions.setCurSongId(songData?.encodeId))
                dispatch(actions.play(true))
            }}
        >
            <div className=' flex items-center gap-3 flex-1'>
                <span><BsMusicNoteBeamed /></span>
                <img src={songData?.thumbnail} alt='thumbnail' className=' w-10 h-10 object-cover rounded-md' />
                <span className=' flex flex-col w-full'>
                    <span className=' text-sm font-semibold'>
                        {songData?.title?.length > 30 ? `${songData?.title?.slice(0, 30)}...` : `${songData?.title}`}
                    </span>
                    <span>{songData?.artistsNames}</span>
                </span>
            </div>
            <div className=' flex-1  flex items-center justify-center'>
                {songData?.album?.title?.length > 30 ? `${songData?.album?.title?.slice(0, 30)}...` : `${songData?.album?.title}`}
            </div>
            <div className=' flex-1 flex justify-end'>
                {moment.utc(songData?.duration * 1000).format('mm:ss')}
            </div>
        </div>
    )
}

export default List