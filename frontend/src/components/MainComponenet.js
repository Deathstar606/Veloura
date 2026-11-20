import React, { useEffect, Suspense } from "react";
import HeroSec from "./HeroSec";
import BestD from "./BestDeals";
import { CollectionPair, SilhouetteDirectory } from "./Category";
import VelouraCol from "./VelouraCol";
import NewArr from "./NewArrival";
import Example from "./Navbar";
import Footer from "./Footer";
import { OrderBar } from "./CartPage";

import { Routes, Route, Navigate, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchCloth,
  fetchOrders,
  fetchProdReq,
  fetchVouchers,
  addNewOrder,
  removeExistingOrder,
  resetOrders,
  toggleCartPanel,
  loginUser,
  logoutUser,
} from "../Redux/ActionCreators";
import { AnimatePresence } from "framer-motion";
import { Loading } from "./LoadingComponent";

// Route-level code splitting ONLY for secondary pages (Home stays eager for instant LCP)
const ProdList = React.lazy(() => import("./ProductList"));
const Deats = React.lazy(() => import("./Details"));
const Order = React.lazy(() => import("./OrderPage"));
const About = React.lazy(() => import("./AboutUs"));
const AdminPanel = React.lazy(() => import("./Admin Forms/AdminPanel"));

const Success = React.lazy(() => import("./PaymentStats/Success"));
const Fail = React.lazy(() => import("./PaymentStats/Fail"));
const Cancle = React.lazy(() => import("./PaymentStats/Cancle"));
const Cod = React.lazy(() => import("./PaymentStats/Cod"));

const ShippingPoly = React.lazy(() => import("./Legal Info/ShippingPoly"));
const RefundPoly = React.lazy(() => import("./Legal Info/RefundPoly"));
const PrivacyPoly = React.lazy(() => import("./Legal Info/PrivacyPoly"));
const PaymentPoly = React.lazy(() => import("./Legal Info/PaymentPoly"));
const TermsConditions = React.lazy(() => import("./Legal Info/Terms&Condition"));

const mapStateToProps = (state) => ({
  auth: state.auth,
  clothes: state.clothes,
  cartPanel: state.cartPanel,
  isOpen: state.cartPanel.isOpen,
  orders: state.orders,
  prodreq: state.prodreq,
  vouchers: state.vouchers,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCloth: () => dispatch(fetchCloth()),
  fetchOrders: () => dispatch(fetchOrders()),
  fetchProdReq: () => dispatch(fetchProdReq()),
  fetchVouchers: () => dispatch(fetchVouchers()),
  addNewOrder: (order) => dispatch(addNewOrder(order)),
  removeExistingOrder: (order_id) => dispatch(removeExistingOrder(order_id)),
  resetOrders: () => dispatch(resetOrders()),
  toggleCartPanel: () => dispatch(toggleCartPanel()),
  loginUser: (creds) => dispatch(loginUser(creds)),
  logoutUser: () => dispatch(logoutUser()),
});

const ClothId = ({ clothesState, addNewOrder, toggleCartPanel }) => {
  const { category, clothId } = useParams();
  const clothes = clothesState?.clothes || [];

  const matchedCategory = clothes.find(
    (cat) => cat.category.toLowerCase() === decodeURIComponent(category || "").toLowerCase()
  );

  const matchedItem = matchedCategory?.items.find((item) => item._id === clothId);

  return (
    <Deats
      isLoading={clothesState.isLoading}
      errMess={clothesState.errMess}
      deats={matchedItem}
      addNewOrder={addNewOrder}
      toggleCart={toggleCartPanel}
    />
  );
};

const ClothCat = ({ clothesState, category }) => {
  if (clothesState.isLoading && (!clothesState.clothes || clothesState.clothes.length === 0)) {
    return <Loading fullScreen />;
  }

  const colthList = (clothesState.clothes || [])
    .filter((cloth) => cloth.category.toLowerCase() === category.toLowerCase())
    .flatMap((cloth) => cloth.items || []);

  return <ProdList category={category} products={colthList} />;
};

const Home = ({ clothes }) => (
  <main>
    <HeroSec />
    <BestD clothes={clothes} />
    <CollectionPair pair="top" />
    <VelouraCol />
    <CollectionPair pair="bottom" />
    <NewArr clothes={clothes} />
    <SilhouetteDirectory />
  </main>
);

const Main = ({
  auth,
  clothes,
  cartPanel,
  orders,
  prodreq,
  vouchers,
  fetchCloth,
  fetchOrders,
  fetchProdReq,
  fetchVouchers,
  addNewOrder,
  removeExistingOrder,
  resetOrders,
  toggleCartPanel,
  loginUser,
  logoutUser,
}) => {
  const isAuthenticated = auth?.isAuthenticated;
  const location = useLocation();
  const isHomeRoute = location.pathname === "/home" || location.pathname === "/";

  useEffect(() => {
    fetchOrders();
    fetchCloth();
  }, [fetchOrders, fetchCloth]);

  // Only call protected admin endpoints when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchProdReq();
      fetchVouchers();
    }
  }, [isAuthenticated, fetchProdReq, fetchVouchers]);

  return (
    <>
      <Example orders={orders.orders} toggleCart={toggleCartPanel} />

      <div className={isHomeRoute ? "" : "page-top-offset"}>
        <Suspense fallback={<Loading fullScreen />}>
          <Routes>
            <Route path="/home" element={<Home clothes={clothes} />} />
            <Route
              path="/home/:category/:clothId"
              element={
                <ClothId
                  clothesState={clothes}
                  addNewOrder={addNewOrder}
                  toggleCartPanel={toggleCartPanel}
                />
              }
            />

            <Route
              path="/home/shirt"
              element={<ClothCat clothesState={clothes} category="shirt" />}
            />
            <Route
              path="/home/polo"
              element={<ClothCat clothesState={clothes} category="polo" />}
            />
            <Route
              path="/home/full shirt"
              element={<ClothCat clothesState={clothes} category="full shirt" />}
            />
            <Route
              path="/home/luxury shirt"
              element={<ClothCat clothesState={clothes} category="luxury shirt" />}
            />
            <Route
              path="/home/luxury polo"
              element={<ClothCat clothesState={clothes} category="luxury polo" />}
            />
            <Route
              path="/home/summer polo"
              element={<ClothCat clothesState={clothes} category="summer polo" />}
            />
            <Route
              path="/home/summer shirt"
              element={<ClothCat clothesState={clothes} category="summer shirt" />}
            />

            <Route path="/home/aboutus" element={<About />} />
            <Route
              path="/home/orders"
              element={
                <Order
                  orders={orders.orders}
                  removeExistingOrder={removeExistingOrder}
                />
              }
            />
            <Route
              path="/home/admin"
              element={
                <AdminPanel
                  auth={auth}
                  clothes={clothes.clothes}
                  prodreq={prodreq.prodreq}
                  vouchers={vouchers.vouchers}
                  loginUser={loginUser}
                  logoutUser={logoutUser}
                />
              }
            />

            <Route
              path="/home/paystat/:tranId"
              element={<Success resetOrders={resetOrders} />}
            />
            <Route path="/home/failure/:tranId" element={<Fail />} />
            <Route path="/home/cancle/:tranId" element={<Cancle />} />
            <Route
              path="/home/cod"
              element={<Cod resetOrders={resetOrders} />}
            />

            <Route path="/home/shipping" element={<ShippingPoly />} />
            <Route path="/home/privacy" element={<PrivacyPoly />} />
            <Route path="/home/payment" element={<PaymentPoly />} />
            <Route path="/home/terms" element={<TermsConditions />} />
            <Route path="/home/refund" element={<RefundPoly />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </Suspense>
      </div>

      <Footer />

      <AnimatePresence mode="wait">
        {cartPanel.isOpen && (
          <OrderBar
            orders={orders}
            handleOrdPage={toggleCartPanel}
            removeOrder={removeExistingOrder}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
