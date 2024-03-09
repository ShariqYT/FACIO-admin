import React, { useState, useEffect } from 'react'
import { auth } from '../../config/firebase';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { RingLoader } from 'react-spinners'
import Styles from './AdminPage.module.css'



const AdminPage = ({user}) => {

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)

    return
  }, [])

  const history = useNavigate()

  const handleSignout = () => {
    signOut(auth).then(val => {
      // console.log(val, "val")
      history('/FACIO/sign-in')
    })
  }

  const handleStart = () => {
    history('/FACIO/admin/start')
  }

  const handleManage = () => {
    history('/FACIO/admin/manage-users')
  }

  const handleAttendance = () => {
    history('/FACIO/admin/attendance')
  }

  document.title = "Admin - FACIO";
  return (
    <>{loading ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }} > <RingLoader
      color="#000"
      loading={loading}
      size={200}
      speedMultiplier={2.1}
    /></div > :
      <div className={Styles.container}>
        <div className={Styles.admin_card}>
          <h1>Welcome, {user.email}</h1>
          <div className={Styles.btn_container}>
            <div>
              <div className={Styles.btn}><button onClick={handleStart}>Start Attendance</button></div>
              <div className={Styles.btn}><button onClick={handleManage}>Manage Users</button></div>
            </div>
            <div>
              <div className={Styles.btn}><button onClick={handleAttendance}>Attendance</button></div>
              <div className={Styles.btn}><button onClick={handleSignout}>Exit</button></div>
            </div>
          </div>
        </div>
      </div>
    }
    </>
  )
}

export default AdminPage
