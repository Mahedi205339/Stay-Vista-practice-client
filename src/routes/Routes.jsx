import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import RoomDetails from '../components/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import { getRoom } from '../api/rooms'
import DashboardLayout from '../layouts/DashboardLayout'
import AddRoom from '../pages/dashboard/AddRoom/AddRoom'
import MyListing from '../pages/dashboard/MyListings/MyListing'
import HostRoute from './HostRoute'
import AdminRoute from './AdminRoute'
import ManageUser from '../pages/dashboard/Admin/ManageUser'
import Profile from '../pages/dashboard/Admin/Common/Profile'
import MyBookings from '../pages/dashboard/Guest/MyBookings'
import ManageBookings from '../pages/dashboard/Host/ManageBookings'
import Statistics from '../pages/dashboard/Admin/Common/Statistics'
import UpdateRoom from '../components/Form/UpdateRoom'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home></Home>,
      },
      {
        path: '/room/:id',
        element: <PrivateRoute><RoomDetails></RoomDetails></PrivateRoute>,
        loader: ({ params }) => getRoom(params.id)
      }
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
    children: [
      {
        path: 'add-room',
        element: <PrivateRoute><HostRoute><AddRoom></AddRoom></HostRoute> </PrivateRoute>
      },
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-listing',
        element: <PrivateRoute> <HostRoute><MyListing></MyListing></HostRoute></PrivateRoute>
      },
      {
        path: 'manage-users',
        element: <PrivateRoute><AdminRoute><ManageUser></ManageUser></AdminRoute></PrivateRoute>
      },
      {
        path: 'profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: 'manage-bookings',
        element: <PrivateRoute><HostRoute><ManageBookings></ManageBookings></HostRoute> </PrivateRoute>
      }
      ,
      {
        path: 'my-bookings',
        element: <PrivateRoute><MyBookings></MyBookings></PrivateRoute>
      }
      ,
      {
        path:'update-room/:id',
        element: <PrivateRoute><HostRoute> <UpdateRoom></UpdateRoom></HostRoute></PrivateRoute>,
        loader:({params})=>fetch(`https://stavista-server.vercel.app/update-room/${params.id}`)
      }
    ]
  }
])
