import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import ProfileSidebar from "../components/profile/ProfileSidebar.jsx"
import ProfileContent from "../components/profile/ProfileContent.jsx"
import styles from '../style/style'

const ProfilePage = () => {
    const [active,setActive]=useState(1)
    return (
        <div>
            <Header />
            <div className={`${styles.section} py-10 flex bg-[#f5f5f5]`}>
                <div className='800px:w-[335px] w-[50px] '>
                    <ProfileSidebar active={active} setActive={setActive} />
                </div>
                <ProfileContent active={active}/>
            </div>

        </div>
    )
}

export default ProfilePage