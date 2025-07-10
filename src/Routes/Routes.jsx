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
import UpdateMyPet from "../Pages/UserDashboard/MyAddedPets/UpdateMyPet";
import CreateDonationCampaign from "../Pages/UserDashboard/CreateDonationCampaign/CreateDonationCampaign";
import AdoptionRequests from "../Pages/UserDashboard/AdoptionRequests/AdoptionRequests";
import MyDonationCampaigns from "../Pages/UserDashboard/MyDonationCampaigns/MyDonationCampaigns";
import MyDonations from "../Pages/UserDashboard/MyDonations/MyDonations";
import PetListing from "../Pages/PetListing/PetsListing";
import Volunteer from "../Pages/Volunteer/Volunteer";
import Contact from "../Pages/Contact/Contact";

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
        path:'pets',
        Component: PetListing
      },
      {
        path:'donate'
      },
      {
        path:'volunteer',
        Component: Volunteer
      },
      {
        path:'contact',
        Component: Contact
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
        path:'update-pet/:id',
        element:<PrivateRoute>
          <UpdateMyPet></UpdateMyPet>
        </PrivateRoute>
      },
      {
        path:'adoption-requests',
        element: <PrivateRoute>
          <AdoptionRequests></AdoptionRequests>
        </PrivateRoute>
      },
      {
        path:'create-campaign',
      },
      {
        path:'my-campaigns',
        element:<PrivateRoute>
          <MyDonationCampaigns></MyDonationCampaigns>
        </PrivateRoute>
      },
      {
        path:'my-donations',
        element:<PrivateRoute>
          <MyDonations></MyDonations>
        </PrivateRoute>
      },
    ]
  }
]);

