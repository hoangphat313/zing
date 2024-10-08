import React from 'react'
import logo from '../assets/logo.svg'
import { sidebarMenu } from '../utils/menu'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import path from '../utils/path'

const notActiveStyle = 'py-2 px-[25px] hover:text-[#0F7070] font-bold text-[#32323D] text-[13px] flex gap-3 items-center';
const activeStyle = 'py-2 px-[25px] font-bold text-[#0F7070] text-[13px] flex gap-3 items-center bg-[#E7EDED]';
const SidebarLeft = () => {
    const navigate = useNavigate()
    return (
        <div className=' flex h-full flex-col bg-main-200'>
            <div
                className=' w-full h-[70px] py-[15px] px-[25px] flex justify-start items-center cursor-pointer'
                onClick={() => navigate(path.HOME)}
            >
                <img src={logo} alt='logo' className=' w-[120px] h-10' />
            </div>
            <div className=' flex flex-col'>
                {sidebarMenu.map(item => (
                    <NavLink
                        to={item.path}
                        key={item.path}
                        end={item.end}
                        className={({ isActive }) => isActive ? activeStyle : notActiveStyle}
                    >
                        {item.icons}
                        <span>{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
export default SidebarLeft
