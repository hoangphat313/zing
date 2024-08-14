import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import * as apis from "../apis"
import icons from '../utils/icons'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'
import moment from 'moment'
import { toast } from 'react-toastify'

const { AiFillHeart, BsThreeDots, AiOutlineHeart,
    MdSkipNext, MdSkipPrevious, CiRepeat, CiShuffle,
    BsFillPlayFill, BsFillPauseFill
} = icons
var intervalId
const Player = () => {
    const [audio, setAudio] = useState(new Audio())
    const { curSongId, isPlaying, atAlbum } = useSelector(state => state.music)
    const [songInfo, setSongInfo] = useState(null)
    const [curSeconds, setCurSeconds] = useState(0)
    const dispatch = useDispatch()
    const thumbRef = useRef()
    const trackRef = useRef()

    useEffect(() => {
        const fetchDetailSong = async () => {
            const [res1, res2] = await Promise.all([
                apis.apiGetDetailSong(curSongId),
                apis.apiGetSong(curSongId)
            ])
            if (res1.data.err === 0) {
                setSongInfo(res1.data.data)
            }
            if (res2.data.err === 0) {
                audio.pause()
                setAudio(new Audio(res2.data.data['128']))
            } else {
                setAudio(new Audio())
                dispatch(actions.play(false))
                toast.warn(res2.data.msg)
                setCurSeconds(0)
                thumbRef.current.style.cssText = `right: 100%`;
            }
        }
        fetchDetailSong()
    }, [curSongId])

    useEffect(() => {
        intervalId && clearInterval(intervalId)
        audio.pause()
        audio.load()
        if (isPlaying) {
            audio.play()
            intervalId = setInterval(() => {
                let percent = Math.round(audio.currentTime * 10000 / songInfo?.duration) / 100
                thumbRef.current.style.cssText = `right: ${100 - percent}%`;
                setCurSeconds(Math.round(audio.currentTime))
            }, 200)
        }
    }, [audio])

    const handleTogglePlayMusic = () => {
        if (isPlaying) {
            audio.pause()
            dispatch(actions.play(false))
        }
        else {
            audio.play().catch(error => {
                console.error('Error playing audio:', error)
            })
            dispatch(actions.play(true))
        }
    }
    const handleClickProgressBar = (e) => {
        const trackRect = trackRef.current.getBoundingClientRect()
        const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
        audio.currentTime = percent * songInfo.duration / 100
        setCurSeconds(Math.round(percent * songInfo.duration / 100))
    }
    const handleNextSong = () => {
        if (atAlbum) {
            console.log(1);
        }
    }
    return (
        <div className=' bg-main-400 px-5 h-full flex  '>
            <div className=' w-[30%] flex-auto flex gap-3 items-center'>
                <img src={songInfo?.thumbnail} alt='thumbnail' className=' w-16 h-16 object-cover rounded-md' />
                <div className=' flex flex-col'>
                    <span className=' font-semibold text-gray-700 text-sm]'>{songInfo?.title}</span>
                    <span className=' text-xs text-gray-500'>{songInfo?.artistNames}</span>
                </div>
                <div className=' flex gap-4 pl-2'>
                    <span>
                        <AiOutlineHeart size={16} />
                    </span>
                    <span>
                        <BsThreeDots size={16} />
                    </span>
                </div>
            </div>
            <div className=' w-[40%] flex-auto flex items-center justify-center gap-2 flex-col border border-red-500 py-2'>
                <div className=' flex gap-8 justify-center items-center'>
                    <span className=' cursor-pointer' title='Bật phát ngẫu nhiên'><CiShuffle size={24} /></span>
                    <span className=' cursor-pointer'  ><MdSkipPrevious size={24} /></span>
                    <span
                        className=' p-1 border border-gray-700 rounded-full hover:text-main-500 cursor-pointer'
                        onClick={handleTogglePlayMusic}
                    >
                        {isPlaying ? <BsFillPauseFill size={30} /> : <BsFillPlayFill size={30} />}

                    </span>
                    <span onClick={handleNextSong} className={`${!atAlbum ? 'text-gray-500' : 'cursor-pointer'}`} ><MdSkipNext size={24} /></span>
                    <span className=' cursor-pointer' title='Bật phát lại tất cả'><CiRepeat size={24} /></span>
                </div>
                <div className=' w-full flex items-center justify-center gap-3 text-xs'>
                    <span className=' text-[#737477]'>{moment.utc(curSeconds * 1000).format('mm:ss')}</span>
                    <div
                        ref={trackRef}
                        onClick={handleClickProgressBar}
                        className=' w-3/4 h-[3px] hover:h-[8px] cursor-pointer rounded-l-full rounded-r-full relative bg-[rgba(0,0,0,0.1)]'>
                        <div ref={thumbRef} className='absolute top-0 left-0 bottom-0 rounded-l-full rounded-r-full bg-[#0e8080]'></div>
                    </div>
                    <span>{moment.utc(songInfo?.duration * 1000).format('mm:ss')}</span>
                </div>
            </div>
            <div className=' w-[30%] flex-auto border border-red-500'>
                volume
            </div>

        </div>
    )
}

export default Player
