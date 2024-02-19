import React, { lazy, Suspense, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ColorModeContext, tokens, useMode } from "../assets/color/theme";
import PrivateRoutes from "./PrivateRoutes";
import { MyProSidebarProvider } from "../components/layout/sideBar/sidebarContext";
import Topbar from "../components/layout/navBar/Topbar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Loader from "../components/Loader/Loader";
import { isAuthorizedFunc } from "../utility/utilty";
import {
  GET_BUYER,
  GET_CAMPAIGN,
  GET_CARRIER,
  GET_COMPANY,
  GET_NUMBER,
  GET_PUBLISHER,
  GET_ROLE,
  GET_ROLE_PERMISSION,
  GET_SERVERIP,
  GET_TARGET,
  GET_USER,
} from "../utility/constant";

const Dashboard = lazy(() =>
  import("../pages/app/dashboard/component/Dasboard")
);
const Campaign = lazy(() =>
  import("../pages/app/campaign/component/Campaigns")
);
const UpdateCampaign = lazy(() =>
  import("../pages/app/campaign/component/ManageCampaign")
);
const AuthUser = lazy(() => import("../pages/auth/users/component/users"));

const AuthCompany = lazy(() =>
  import("../pages/auth/companies/component/companies")
);
const AuthBuyer = lazy(() => import("../pages/auth/buyer/component/buyer"));
const AuthPublisher = lazy(() =>
  import("../pages/auth/publisher/component/publisher")
);

const RoleFunctionMapping = lazy(() =>
  import("../pages/auth/roleFunctions/component/roleFunction")
);
const ManageTarget = lazy(() =>
  import("../pages/app/target/component/ManageTarget")
);
const ServerIp = lazy(() => import("../pages/app/serverIp/component/ServerIp"));
const Carriers = lazy(() => import("../pages/app/carriers/component/Carriers"));

const ManageNumber = lazy(() =>
  import("../pages/app/number/component/ManageNumber")
);

const ManageGroup = lazy(() =>
  import("../pages/app/group/component/ManageGroup")
);

const ManageBlkNumber = lazy(() =>
  import("../pages/app/blockNumber/component/ManageBlockNumber")
);

const WalletHistoryPage = lazy(() =>
  import("../pages/app/wallet/comonent/WalletContainer")
);

const AddWalletPage = lazy(() =>
  import("../pages/app/wallet/comonent/AddWallet")
);

const PageNotFound = lazy(() =>
  import("../pages/app/pageNotFound/PageNotFound")
);

const UserAccount = lazy(() =>
  import("../pages/auth/account/component/userAccount")
);
const UsersRole = lazy(() => import("../pages/auth/roles/component/roles"));

const NumberListPage = lazy(() =>
  import("../pages/app/puchaseNumber/component/Number")
);

const IvrRoutingPage = lazy(() =>
  import("../pages/app/IvrRouting/component/IvrRouting")
);

const NumberInvoicePage = lazy(() =>
  import("../pages/app/puchaseNumber/component/NumberInvoice")
);

const PurchaseNumberPage = lazy(() =>
  import("../pages/app/puchaseNumber/component/PurchaseNumber")
);
const InvoiceNumberPage = lazy(() =>
  import("../pages/app/number-invoice/component/InvoicePage")
);
const CryptoPaymentPage = lazy(() =>
  import("../pages/app/paymentPage/component/CryptoPayment")
);
const CardPaymentPage = lazy(() =>
  import("../pages/app/paymentPage/component/CardPayment")
);
const WalletPaymentPage = lazy(() =>
  import("../pages/app/paymentPage/component/WalletPayment")
);

const IvrMedia = lazy(() => import("../pages/app/ivrMedia/component/IvrMedia"));

const IvrManage = lazy(() =>
  import("../pages/app/ivrManage/component/ManageIvr")
);

const VerifyCardPage = lazy(() => import("../pages/app/verifyOtp/VerifyOtp"));

const SuccessPage = lazy(() =>
  import("../pages/app/paymentPage/component/SuccessPayment")
);

const ChangePassword = lazy(() =>
  import("../pages/auth/changePassword/component/ChangePassword")
);

const InboundReportPage = lazy(() =>
  import("../pages/app/reboundReport/component/InboundReport")
);

const LiveCallPage = lazy(() =>
  import("../pages/app/liveCalls/component/LiveCalls")
);

const Router = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyProSidebarProvider collapsed={collapsed}>
            <main
              style={{
                width: "100%",
                backgroundColor: colors.primary[200],
              }}
            >
              <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route element={<PrivateRoutes />}>
                    <Route path="/" element={<Dashboard />} />
                    {isAuthorizedFunc(GET_CAMPAIGN) && (
                      <Route path="/campaigns" element={<Campaign />} />
                    )}
                    {isAuthorizedFunc(GET_CAMPAIGN) && (
                      <Route
                        path="/campaigns/update-campaigns"
                        element={<UpdateCampaign />}
                      />
                    )}

                    <Route path="/wallet" element={<WalletHistoryPage />} />
                    <Route path="/wallet/add" element={<AddWalletPage />} />

                    {isAuthorizedFunc(GET_TARGET) && (
                      <Route path="/targets" element={<ManageTarget />} />
                    )}
                    {isAuthorizedFunc(GET_USER) && (
                      <Route path="/access/users" element={<AuthUser />} />
                    )}
                    {isAuthorizedFunc(GET_COMPANY) && (
                      <Route path="/access/company" element={<AuthCompany />} />
                    )}
                    {isAuthorizedFunc(GET_BUYER) && (
                      <Route path="/access/buyer" element={<AuthBuyer />} />
                    )}
                    {isAuthorizedFunc(GET_PUBLISHER) && (
                      <Route
                        path="/access/publisher"
                        element={<AuthPublisher />}
                      />
                    )}
                    {isAuthorizedFunc(GET_ROLE) && (
                      <Route path="/auth/roles" element={<UsersRole />} />
                    )}
                    {isAuthorizedFunc(GET_ROLE_PERMISSION) && (
                      <Route
                        path="/auth/configuration"
                        element={<RoleFunctionMapping />}
                      />
                    )}
                    <Route path="/account" element={<UserAccount />} />
                    <Route
                      path="/changepassword"
                      element={<ChangePassword />}
                    />
                    {isAuthorizedFunc(GET_SERVERIP) && (
                      <Route path="/serverip" element={<ServerIp />} />
                    )}
                    {isAuthorizedFunc(GET_CARRIER) && (
                      <Route path="/carriers" element={<Carriers />} />
                    )}
                    <Route
                      path="/purchase-number"
                      element={<PurchaseNumberPage />}
                    />
                    <Route path="/numbers" element={<NumberListPage />} />

                    <Route
                      path="/purchase-number/invoice-report"
                      element={<NumberInvoicePage />}
                    />

                    <Route
                      path="/purchase-number/invoice-number"
                      element={<InvoiceNumberPage />}
                    />
                    <Route
                      path="/purchase-number/invoice-number/crypto-payment"
                      element={<CryptoPaymentPage />}
                    />

                    <Route
                      path="/purchase-number/invoice-number/wallet-payment"
                      element={<WalletPaymentPage />}
                    />

                    <Route path="/ivr/media" element={<IvrMedia />} />
                    <Route path="/ivr/manage-ivr" element={<IvrManage />} />
                    <Route path="/ivr/ivr-route" element={<IvrRoutingPage />} />

                    <Route
                      path="/purchase-number/invoice-number/card-payment"
                      element={<CardPaymentPage />}
                    />

                    <Route
                      path="/purchase-number/invoice-number/verification"
                      element={<VerifyCardPage />}
                    />

                    <Route
                      path="/purchase-number/invoice-number/success"
                      element={<SuccessPage />}
                    />

                    {isAuthorizedFunc(GET_NUMBER) && (
                      <Route path="/did-numbers" element={<ManageNumber />} />
                    )}

                    <Route
                      path="/report/inbound"
                      element={<InboundReportPage />}
                    />

                    <Route
                      path="/report/live-calls"
                      element={<LiveCallPage />}
                    />

                    <Route path="/group" element={<ManageGroup />} />

                    <Route path="/block-number" element={<ManageBlkNumber />} />

                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/forbidden" element={<h2>No Access...</h2>} />
                  </Route>
                </Routes>
              </Suspense>
            </main>
          </MyProSidebarProvider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};
export default Router;
