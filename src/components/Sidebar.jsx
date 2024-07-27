import React from "react";
import { Link, NavLink } from "react-router-dom";
import { navlinks } from "../constants";
import { logo } from "../assets";
const Sidebar = () => {
    const Icon = ({ styles, imgUrl , isActive}) => (
        <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive ? 'bg-[#2c2f32]': ''} flex justify-center items-center ${styles}`}>
            <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
        </div>
      )
      

    return(
        <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
        <Link to="/">
            <Icon styles="w-[70px] h-[70px] bg-[#2c2f32]" imgUrl={logo} />
        </Link>
        <div className="flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12">
            <div className="flex flex-col justify-center items-center gap-3">
                {navlinks.map((links) => (
                    <NavLink
                        to={links.name}
                        className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ?  "active" : ""
                        }
                    >
                        {({ isActive }) => (
                            <Icon imgUrl={links.imgUrl} isActive={isActive} />
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
        </div>
    )
};
export default Sidebar