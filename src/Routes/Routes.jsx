import {
  createBrowserRouter
} from "react-router";
import Root from "../Layout/Root/Root";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AddPet from "../Pages/UserDashboard/AddPets/AddPets";
import MyAddedPets from "../Pages/UserDashboard/MyAddedPets/MyAddedPets";

export const router = createBrowserRouter([
  {
    path: "/",
    Component:Root,
    children:[
      {
        index:true,
        Component: HomeLayout
      },
      {
        path:'login',
        Component: Login
      },
      {
        path:'register',
        Component: Register
      }
    ]
  },
  {
    path:'dashboard',
    Component:DashboardLayout,
    children:[
      {
        path:'add-pet',
        element: <PrivateRoute>
          <AddPet></AddPet>
        </PrivateRoute>
      },
      {
        path:'my-pets',
        element:<PrivateRoute>
          <MyAddedPets></MyAddedPets>
        </PrivateRoute>
      },
      {
        path:'adoption-requests'
      },
      {
        path:'create-campaign'
      },
      {
        path:'my-campaigns'
      },
      {
        path:'my-donations'
      },
    ]
  }
]);

