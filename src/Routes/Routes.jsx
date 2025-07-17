import { createBrowserRouter } from "react-router";
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
import DonationCampaigns from "../Pages/DonationCampaigns/DonationCampaigns";
import PetDetails from "../Pages/PetListing/PetDetails";
import DonationDetails from "../Pages/DonationCampaigns/DonationDetails";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import AdminRoute from "./AdminRoute/AdminRoute";
import AllPets from "../Pages/AdminDashboard/AllPets/AllPets";
import AccessDenied from "../Pages/AdminDashboard/AccessDenied/AccessDenied";
import AllUsers from "../Pages/AdminDashboard/AllUsers/AllUsers";
import DashboardHome from "../Layout/DashboardLayout/DashboardHome";
import UpdateDonationsCampaign from "../Pages/UserDashboard/MyDonationCampaigns/EditDonationsCampaign";
import AllDonations from "../Pages/AdminDashboard/AllDonations/AllDonations";
import NotFound from "../Pages/Error/NotFound";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: HomeLayout,
      },
      {
        path: "pets",
        Component: PetListing,
      },
      {
        path: "pet/:id",
        element: <PrivateRoute>
          <PetDetails></PetDetails>
        </PrivateRoute>
      },
      {
        path: "donate",
        Component: DonationCampaigns,
      },
      {
        path: "donations/:id",
        element: (
          <Elements stripe={stripePromise}>
            <PrivateRoute><DonationDetails /></PrivateRoute>
          </Elements>
        ),
      },
      {
        path: "volunteer",
        Component: Volunteer,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path:'access-denied',
        Component:AccessDenied
      }
    ],
  },
  {
    path: "dashboard",
    element:<PrivateRoute>
     <DashboardHome></DashboardHome>
    </PrivateRoute>,
    children: [
      {
        path: "add-pet",
        element: (
          <PrivateRoute>
            <AddPet></AddPet>
          </PrivateRoute>
        ),
      },
      {
        path: "my-pets",
        element: (
          <PrivateRoute>
            <MyAddedPets></MyAddedPets>
          </PrivateRoute>
        ),
      },
      {
        path: "update-pet/:id",
        element: (
          <PrivateRoute>
            <UpdateMyPet></UpdateMyPet>
          </PrivateRoute>
        ),
      },
      {
        path: "adoption-requests",
        element: (
          <PrivateRoute>
            <AdoptionRequests></AdoptionRequests>
          </PrivateRoute>
        ),
      },
      {
        path: "create-campaign",
        element: (
          <PrivateRoute>
            <CreateDonationCampaign></CreateDonationCampaign>
          </PrivateRoute>
        ),
      },
      {
        path: "my-campaigns",
        element: (
          <PrivateRoute>
            <MyDonationCampaigns></MyDonationCampaigns>
          </PrivateRoute>
        ),
      },
      {
        path: "my-donations",
        element: (
          <PrivateRoute>
            <MyDonations></MyDonations>
          </PrivateRoute>
        ),
      },
      {
        path:'edit-donation/:id',
        element:<PrivateRoute>
          <UpdateDonationsCampaign></UpdateDonationsCampaign>
        </PrivateRoute>
      },
      // Admin Route
      {
        path:'all-pets',
        element: 
          <AdminRoute>
            <AllPets></AllPets>
          </AdminRoute>
      },
      {
        path:'all-users',
        element: <AdminRoute>
          <AllUsers></AllUsers>
        </AdminRoute>
      },
      {
        path:'all-donations',
        element:<AdminRoute>
          <AllDonations></AllDonations>
        </AdminRoute>
       
      }
    ],
  },
  {
    path:'/*',
    Component: NotFound
  }
]);
