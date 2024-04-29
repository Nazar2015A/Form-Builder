import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Builder from "./pages/Builder/Builder";
import LoginPage from "./pages/Login/LoginPage";
import { RouteConsts } from "./consts/route-consts";
import ProtectedRoute from "./components/AuthRoutes/ProtectedRoute";
import FormsPage from "./pages/Forms/Forms";
import SubmitPage from "./pages/Submit/SubmitPage";
import "./globals.css";
import PublicRoute from "./components/AuthRoutes/PublicRoute";

function App() {
  return (
    <BrowserRouter basename="/">
      <Layout>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path={RouteConsts.HOME} element={<Home />} />
            <Route path={`${RouteConsts.BUILDER}/:id`} element={<Builder />} />
            <Route path={`${RouteConsts.FORMS}/:id`} element={<FormsPage />} />
          </Route>
          <Route path={`${RouteConsts.SUBMIT}/:url`} element={<SubmitPage />} />
          <Route element={<PublicRoute />}>
            <Route path={RouteConsts.LOGIN} element={<LoginPage />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
