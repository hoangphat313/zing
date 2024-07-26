import React from 'react'
import icons from '../utils/icons'
const { IoIosSearch } = icons


const Search = () => {
    return (
        <div className=' w-full flex items-center '>
            <span className=' h-10 pl-4  bg-[#DDE4E4] text-gray-500 rounded-l-[20px] flex items-center justify-center'>
                <IoIosSearch size={24} />
            </span>
            <input
                type='text'
                className=' outline-none bg-[#DDE4E4] w-full px-4 py-2 rounded-r-[20px] h-10 text-gray-500'
                placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
            />
        </div>
    )
}

export default Search