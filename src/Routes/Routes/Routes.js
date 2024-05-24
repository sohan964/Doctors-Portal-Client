import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Home from '../../Pages/Home/Home/Home';
import Login from "../../Pages/Login/Login";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import SignUp from "../../Pages/SignUp/SignUp";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import DashboardLayout from "../../Layout/DashboardLayout";
import MyAppointment from "../../Pages/Dashboard/MyAppointment/MyAppointment";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddDoctor from "../../Pages/Dashboard/AddDoctor/AddDoctor";
import ManageDoctors from "../../Pages/Dashboard/ManageDoctors/ManageDoctors";
import Payment from "../../Pages/Dashboard/Payment/Payment";
import DisplayError from "../../Pages/Shared/DisplayError/DisplayError";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element:<Login></Login>
            },
            {
                path: '/signup',
                element:<SignUp></SignUp>
            },
            {
                path: '/appointment',
                element: <PrivateRoute><Appointment></Appointment></PrivateRoute>

            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
            {
                path:'/dashboard',
                element: <MyAppointment></MyAppointment>
            },
            {
                path: '/dashboard/allusers',
                element: <AllUsers></AllUsers>
            },
            // {
            //     path: '/dashboard/adddoctor',
            //     element: <AddDoctor></AddDoctor>
            // },
            // {
            //     path: '/dashboard/managedoctors',
            //     element: <ManageDoctors></ManageDoctors>
            // },
            {
                path: '/dashboard/payment/:id',
                element: <Payment></Payment>,
                loader: ({params})=> fetch(`https://localhost:44333/api/Bookings/${params.id}`,{
                    headers:{
                        authorization: `bearer ${localStorage.getItem('Token')}`
                    }
                })
            },
        ]
    }
]);

export default router;