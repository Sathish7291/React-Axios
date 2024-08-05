import React from 'react'
import Create from '../Components/Create'
import Dashboard from '../Components/Dashboard'
import { Navigate } from 'react-router-dom'

export default [
    {
        path:'/',
        element:<Dashboard/>
    },
    {
        path:'/dashboard',
        element:<Dashboard/>
    },
    {
        path:'/create',
        element:<Create/>
    },
    {
        path:'/edit/:id',
        element:<Create/>
    },
    {
        path:'*',
        element:<Navigate to='/'/>
    }

]