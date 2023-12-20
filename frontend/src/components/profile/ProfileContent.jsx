import React, { useState } from 'react'
import {
    AiOutlineArrowRight,
    AiOutlineCamera,
    AiOutlineDelete,
} from "react-icons/ai";
import styles from '../../style/style';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import { MdTrackChanges } from 'react-icons/md';
const ProfileContent = ({ active }) => {
    const { user } = useSelector(state => state.user);
    console.log(user)
    const [name, setName] = useState(user && user.name);
    const [email, setEmail] = useState(user && user.email);
    const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(null);
    return (
        <div className='w-full'>
            {
                active == 1 ? (
                    <>
                        <div className="flex justify-center w-full">
                            <div className="relative">
                                <img
                                    src='#'
                                    className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                                    alt=""
                                />
                                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                                    <input
                                        type="file"
                                        id="image"
                                        className="hidden"
                                        onChange={() => { }}
                                    />
                                    <label htmlFor="image">
                                        <AiOutlineCamera />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-5">
                            <form onSubmit={() => { }} aria-required={true}>
                                <div className="w-full 800px:flex block pb-3">
                                    <div className='w-[100%] 800px:w-[50%]'>
                                        <label className="block pb-2">Full Name</label>
                                        <input
                                            type="text"
                                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className=" w-[100%] 800px:w-[50%]">
                                        <label className="block pb-2">Email Address</label>
                                        <input
                                            type="text"
                                            className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full 800px:flex block pb-3">
                                    <div className=" w-[100%] 800px:w-[50%]">
                                        <label className="block pb-2">Phone Number</label>
                                        <input
                                            type="number"
                                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                            required
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>

                                    <div className=" w-[100%] 800px:w-[50%]">
                                        <label className="block pb-2">Enter your password</label>
                                        <input
                                            type="password"
                                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="w-full 800px:flex block pb-3">
                                    <div className=" w-[100%] 800px:w-[50%]">
                                        <label className="block pb-2">Phone Number</label>
                                        <input
                                            type="number"
                                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                            required
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className=" w-[100%] 800px:w-[50%]">
                                        <label className="block pb-2">Enter your password</label>
                                        <input
                                            type="password"
                                            className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <input
                                    className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                                    required
                                    value="Update"
                                    type="submit"
                                />
                            </form>
                        </div>
                    </>
                ) : null
            }
            {
                active == 2 ? (
                    <AllOrders />
                ) : null
            }
            {
                active == 3 ? (
                    <AllRefundPage />
                ) : null
            }
            {
                active == 5 ? (
                    <TrackOrder />
                ) : null
            }
            {
                active == 6 ? (
                    <PaymentMethod />
                ) : null
            }
            {
                active == 7 ? (
                    <Address />
                ) : null
            }
        </div>
    )
}

const AllOrders = () => {
    const orders = [
        {
            _id: "5252393936936936398",
            orderItems: [
                {
                    name: "iphone 14 pro max"
                }
            ],
            totalPrice: 120,
            orderStatus: "Processing"
        },
    ];

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/user/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const rows = orders.map((item) => ({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
    }));

    return (
        <div className='pl-8 pt-1'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    )
}

const AllRefundPage = () => {
    const orders = [
        {
            _id: "5252393936936936398",
            orderItems: [
                {
                    name: "iphone 14 pro max"
                }
            ],
            totalPrice: 120,
            orderStatus: "Processing"
        },
    ];

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },
        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },
        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/user/order/${params.id}`}>
                            <Button>
                                <AiOutlineArrowRight size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const rows = orders.map((item) => ({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
    }));

    return (
        <div className='pl-8 pt-1'>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    )
}

const TrackOrder = () => {
    const orders = [
        {
            _id: "5252393936936936398",
            orderItems: [
                {
                    name: "iphone 14 pro max"
                }
            ],
            totalPrice: 120,
            orderStatus: "Processing"
        },
    ];
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

        {
            field: "status",
            headerName: "Status",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 130,
            flex: 0.7,
        },

        {
            field: "total",
            headerName: "Total",
            type: "number",
            minWidth: 130,
            flex: 0.8,
        },

        {
            field: " ",
            flex: 1,
            minWidth: 150,
            headerName: "",
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/user/track/order/${params.id}`}>
                            <Button>
                                <MdTrackChanges size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];


    const row = orders.map((item) => ({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
    }));
    return (
        <div className="pl-8 pt-1">
            <DataGrid
                rows={row}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                autoHeight
            />
        </div>
    )
}

const PaymentMethod = () => {
    return (
        <div className='w-full px-5'>
            <div className="flex w-full items-center justify-between">
                <h1 className='text-[25px] font-[600] text-[#000000ba]'>
                    Payment Methods
                </h1>
                <div className={`${styles.button} !rounded-md`}>
                    <span className='text-[#fff]'>
                        Add New
                    </span>
                </div>
            </div>

            <div className='w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10'>
                <div className='flex items-center'>
                    <img src='https://www.svgrepo.com/show/333620/visa.svg' className='h-[50px]' />
                    <h5 className='font-[500] pl-5'>Akhilesh Mishra</h5>
                </div>
                <div className='pl-8 flex items-center'>
                    <h6>255 **** **** ****</h6>
                    <h5 className='pl-6'>08/2022</h5>
                </div>
                <div className='min-w-[10%] flex items-center justify-between pl-8 cursor-pointer'>
                    <AiOutlineDelete size={24} />
                </div>
            </div>
        </div>
    )
}

const Address = () => {
    return (
        <div className='w-full px-5'>
            <div className="flex w-full items-center justify-between">
                <h1 className='text-[25px] font-[600] text-[#000000ba]'>
                    Address
                </h1>
                <div className={`${styles.button} !rounded-md`}>
                    <span className='text-[#fff]'>
                        Add New
                    </span>
                </div>
            </div>

            <div className='w-full bg-white h-[70px] rounded-[4px] flex items-center px-3 shadow justify-between pr-10'>
                <div className='flex items-center'>
                    <h5 className='font-[500] pl-5'>Default</h5>
                </div>
                <div className='pl-8 flex items-center'>
                    <h6>494,satna,madhyapradesh</h6>
                </div>
                <div className='min-w-[10%] flex items-center justify-between pl-8 cursor-pointer'>
                    <AiOutlineDelete size={24} />
                </div>
            </div>
        </div>
    )
}













export default ProfileContent