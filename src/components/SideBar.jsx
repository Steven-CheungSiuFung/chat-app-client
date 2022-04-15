import React from 'react'
import Cookies from 'universal-cookie';


import { RiTeamFill } from "react-icons/ri";
import { MdOutlineLogout, MdSettings } from "react-icons/md";

const cookies = new Cookies();

const SideBar = ({ setIsChannelActive, setIsCreating, setIsEditing, setToggleContainer }) => {
    const logout = () => {
        cookies.remove("token");
        cookies.remove("username");
        cookies.remove("fullName");
        cookies.remove("userId");
        cookies.remove("email");
        cookies.remove("avatarURL");
        cookies.remove("hashedPassword");

        window.location.reload();
    }

    const setting = () => {
        setIsChannelActive(false);
        setIsCreating(false);
        setIsEditing(false);
        if (setToggleContainer) {
            setToggleContainer((prevState) => !prevState)
        }
    }

    return (
    <div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <RiTeamFill />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={setting}>
                <MdSettings />
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <MdOutlineLogout />
            </div>
        </div>
    </div> 
)}

export default SideBar;