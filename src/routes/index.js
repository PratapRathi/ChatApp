import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import AuthLayout from "../layouts/auth/index.js";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";


const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout/>,
      children:[
        { path: "login", element: <LoginPage/>},
        { path: "register", element: <RegisterPage/>},
        { path: "verify-otp", element: <VerifyOTPPage/>},
        { path: "reset-password", element: <ResetPasswordPage/>},
        { path: "new-password", element: <NewPasswordPage/>},
      ]
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
        { path: "app", element: <GeneralApp /> },
        { path: "group", element: <GroupPage /> },
        { path: "call", element: <CallPage /> },
        { path: "settings", element: <Settings /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const GeneralApp = Loadable(lazy(() => import("../pages/dashboard/GeneralApp")));

const LoginPage = Loadable(lazy(() => import("../pages/auth/Login")));

const RegisterPage = Loadable(lazy(() => import("../pages/auth/Register.js")));

const VerifyOTPPage = Loadable(lazy(() => import("../pages/auth/VerifyOTP.js")));

const ResetPasswordPage = Loadable(lazy(() => import("../pages/auth/ResetPassword.js")));

const NewPasswordPage = Loadable(lazy(() => import("../pages/auth/NewPassword.js")));

const Settings = Loadable(lazy(() => import("../pages/dashboard/Settings")));

const CallPage = Loadable(lazy(() => import("../pages/dashboard/Call.js")));

const GroupPage = Loadable(lazy(() => import("../pages/dashboard/Group.js")));

const ProfilePage = Loadable(lazy(() => import("../pages/dashboard/Profile.js")));

const Page404 = Loadable(lazy(() => import("../pages/Page404")));