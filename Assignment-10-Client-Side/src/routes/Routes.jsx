import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import AllCampaign from "../pages/campaign/AllCampaign";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateCampaignForm from "../pages/newCampaign/CreateCampaignForm";
import PrivateRoutes from "./PrivateRoutes";
import Home from "../pages/home/Home";
import CampaignDetails from "../pages/campaign/CampaignDetails";
import UpdateCampaign from "../pages/updateCampaign/UpdateCampaign";
import PickYourPerk from "../components/pickYourPerk/PickYourPerk";
import ErrorPage from "../components/errorPage/ErrorPage";
import MyProfile from "../components/myProfile/MyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "campaigns",
        element: <AllCampaign />,
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "create-campaign/:id",
        element: (
          <PrivateRoutes>
            <CreateCampaignForm />
          </PrivateRoutes>
        ),
      },
      {
        path: "campaign-details/:id",
        element: (
          <PrivateRoutes>
            <CampaignDetails/>
          </PrivateRoutes>
        ),
      },
      {
        path: "update-campaign/:id",
        element: (
          <PrivateRoutes>
            <UpdateCampaign/>
          </PrivateRoutes>
        ),
      },
      {
        path: "pick-your-perk/:id",
        element: (
          <PrivateRoutes>
            <PickYourPerk/>
          </PrivateRoutes>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoutes>
            <MyProfile/>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
