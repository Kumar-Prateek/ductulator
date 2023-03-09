/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
import ServiceProviderIntegration from "content/ServiceProviderIntegration";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Billing from "layouts/billing";
import Dashboard from "layouts/dashboard";
import Profile from "layouts/profile";
import RTL from "layouts/rtl";
import Tables from "layouts/tables";
import VirtualReality from "layouts/virtual-reality";

// Soft UI Dashboard React icons
import Configuration from "content/Configuration";
import DeliveryStatus from "content/DeliveryStatus";
import Plans from "content/Plans";
import Role from "content/Role";
import SmsTemplateSetting from "content/SmsTemplateSetting";
import TenantIntegration from "content/TenantIntegration";
import TestSms from "content/TestSms";
import Webhook from "content/Webhook";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Document from "examples/Icons/Document";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import SpaceShip from "examples/Icons/SpaceShip";

import {
  AdminPanelSettingsTwoTone,
  DashboardCustomizeTwoTone,
  GridViewTwoTone,
  PortraitTwoTone,
  ReceiptLongTwoTone,
  RocketLaunchTwoTone,
  SendTimeExtensionTwoTone,
  SmsTwoTone,
  TuneTwoTone,
  WebhookTwoTone,
} from "@mui/icons-material";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <DashboardCustomizeTwoTone />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <Office size="12px" />,
    component: <Tables />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <CreditCard size="12px" />,
    component: <Billing />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Virtual Reality",
    key: "virtual-reality",
    route: "/virtual-reality",
    icon: <Cube size="12px" />,
    component: <VirtualReality />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "RTL",
    key: "rtl",
    route: "/rtl",
    icon: <Settings size="12px" />,
    component: <RTL />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Provider Integration",
    key: "provider-integration",
    route: "/provider-integration",
    icon: <RocketLaunchTwoTone />,
    component: <ServiceProviderIntegration />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Template Setting",
    key: "template-setting",
    route: "/template-setting",
    icon: <GridViewTwoTone />,
    component: <SmsTemplateSetting />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Delivery Status",
    key: "delivery-status",
    route: "/delivery-status",
    icon: <SendTimeExtensionTwoTone />,
    component: <DeliveryStatus />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Test SMS",
    key: "test-sms",
    route: "/test-sms",
    icon: <SmsTwoTone />,
    component: <TestSms />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tenant Integration",
    key: "tenant-integration",
    route: "/tenant-integration",
    icon: <PortraitTwoTone />,
    component: <TenantIntegration />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Webhook",
    key: "webhook",
    route: "/webhook",
    icon: <WebhookTwoTone />,
    component: <Webhook />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Configuration",
    key: "configuration",
    route: "/configuration",
    icon: <TuneTwoTone />,
    component: <Configuration />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Plans",
    key: "plans",
    route: "/plans",
    icon: <ReceiptLongTwoTone />,
    component: <Plans />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Role",
    key: "role",
    route: "/role",
    icon: <AdminPanelSettingsTwoTone />,
    component: <Role />,
    noCollapse: true,
  },
];

export default routes;
