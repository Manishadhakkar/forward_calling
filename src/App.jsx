import React, { lazy, Suspense, useEffect, useState } from "react";
import "./App.css";
import "rsuite/dist/rsuite.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Router from "./router/Router";
import Loader from "./components/Loader/Loader";
import BuyerSignUp from "./pages/auth/buyerSignUp/BuyerSignUp";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("user"));
    setUser(data);
  }, [localStorage]);

  const SignInPage = lazy(() => import("./pages/auth/signin/component/auth"));
  const SignUpPage = lazy(() => import("./pages/auth/signup/component/signup"));
  const ForgotPassword = lazy(() =>
    import("./pages/auth/forget/component/forgotPassword")
  );
  const VerifyPage = lazy(() =>
    import("./pages/auth/verify/component/verifyOtp")
  );
  const NotFoundPage = lazy(() =>
    import("./pages/app/pageNotFound/PageNotFound")
  );

  return user !== null ? (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route exact path="/" element={<SignInPage />} />
          <Route exact path="/signup" element={<SignUpPage />} />
          <Route exact path="/verify" element={<VerifyPage />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="*" element={<NotFoundPage />} />
          <Route exact path="/buyersignup/:token" element={<BuyerSignUp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};
export default App;
