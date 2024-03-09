import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/login/Login.jsx'
import { auth } from './config/firebase.jsx'
import ErrorPage from './components/ErrorPage/ErrorPage.jsx'
import AdminPage from './components/AdminPage/AdminPage.jsx'
import { ProtectedRoute } from './components/ProtectedRoutes.jsx'
import Welcome from './components/Welcome/Welcome.jsx'

const App = () => {
    const [user, setUser] = useState({})
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {unSubscribe();}

    }, [])

    return (
        <Router>
            <Routes>
                <Route path='/FACIO-admin/' element={<Welcome />} />
                <Route path='/FACIO-admin/sign-in' element={<Login user={user}/>} />
                <Route path='/FACIO-admin/admin' element={<ProtectedRoute user={user} > <AdminPage user={user} /> </ProtectedRoute>} />
                <Route path='/FACIO-admin/*' element={<ErrorPage />} />
            </Routes>
        </Router>
    )
}

export default App
