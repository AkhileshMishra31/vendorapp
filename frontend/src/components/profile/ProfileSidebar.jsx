import React from 'react'

import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import {
    MdOutlineAdminPanelSettings,
    MdOutlinePassword,
    MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi';
import { RxPerson } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
import { server } from '../../server';


const ProfileSidebar = ({ active, setActive }) => {
    const navigate = useNavigate();

    const logouthandler = async () => {
        try {
            const response = await axios.get(`${server}/user/logout`, {
                withCredentials: true,
            });

            console.log("Logout response:", response.data); // Add logging for visibility

            const { success, message } = response.data;

            if (success) {
                toast.success(message);
                window.location.reload(true); // Comment out for now
                navigate("/login"); // Attempt navigation
                console.log("Attempting to navigate to login"); // Add logging
            } else {
                toast.error("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("An error occurred during logout. Please try again.");
        }
    };



    return (
        <div className='w-full shadow-sm bg-white rounded-[10px] p-4 pt-8'>
            <div className="flex items-center cursor cursor-pointer w-full mb-8"
                onClick={() => setActive(1)}
            >
                <RxPerson size={20} color={active === 1 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 1 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Profile
                </span>

            </div>
            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(2)}
            >
                <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 2 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Orders
                </span>
            </div>
            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(3)}
            >
                <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 3 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Refunds
                </span>
            </div>
            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(4) || navigate("/inbox")}
            >
                <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 4 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Inbox
                </span>
            </div>
            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(5)}
            >
                <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 5 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Track Order
                </span>
            </div>
            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(6)}
            >
                <RiLockPasswordLine size={20} color={active === 6 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 6 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Payment Methods
                </span>
            </div>

            <div
                className="flex items-center cursor-pointer w-full mb-8"
                onClick={() => setActive(7)}
            >
                <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 7 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Address
                </span>
            </div>
            <div
                className="single_item flex items-center cursor-pointer w-full mb-8"
                onClick={() => logouthandler()}
            >
                <AiOutlineLogin size={20} color={active === 8 ? "red" : ""} />
                <span
                    className={`pl-3 ${active === 8 ? "text-[red]" : ""
                        } 800px:block hidden`}
                >
                    Log out
                </span>
            </div>
        </div>
    )
}

export default ProfileSidebar