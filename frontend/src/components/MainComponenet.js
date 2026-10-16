import React, { useEffect, Suspense, memo } from "react";
import HeroSec from "./HeroSec";
import VelouraCol from "./VelouraCol";
import Order from "./OrderPage";
import About from "./AboutUs";
import { OrderBar } from "./CartPage";
/* import RenderItem from './Featured'; */
import Category from "./Category";
import Example from "./Navbar";
import Footer from "./Footer";

import Success from "./PaymentStats/Success";
import Fail from "./PaymentStats/Fail";
import Cancle from "./PaymentStats/Cancle";
import Cod from "./PaymentStats/Cod";

import ShippingPoly from "./Legal Info/ShippingPoly";
import RefundPoly from "./Legal Info/RefundPoly";
import PrivacyPoly from "./Legal Info/PrivacyPoly";
import PaymentPoly from "./Legal Info/PaymentPoly";
import TermsConditions from "./Legal Info/Terms&Condition";

import { Routes, Route, Navigate, useParams } from "react-router-dom";
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
import { AnimatePresence, motion } from "framer-motion";
import { Loading } from "./LoadingComponent";

const BestD = React.lazy(() => import("./BestDeals"));
const NewArr = React.lazy(() => import("./NewArrival"));
const ProdList = React.lazy(() => import("./ProductList"));
const Deats = React.lazy(() => import("./Details"));
const AdminPanel = React.lazy(() => import("./Admin Forms/AdminPanel"));

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    clothes: state.clothes,
    /*     deals: state.deals,
    feats: state.feats, */
    cartPanel: state.cartPanel,
    isOpen: state.cartPanel.isOpen,
    orders: state.orders,
    prodreq: state.prodreq,
    vouchers: state.vouchers,
    //cart: state.cart
  };
};

const mapDispatchToProps = (dispatch) => ({
  //method defination
  fetchCloth: () => {
    dispatch(fetchCloth());
  },
  fetchOrders: () => {
    dispatch(fetchOrders());
  },
  fetchProdReq: () => {
    dispatch(fetchProdReq());
  },
  fetchVouchers: () => {
    dispatch(fetchVouchers());
  },
  addNewOrder: (order) => {
    dispatch(addNewOrder(order));
  },
  removeExistingOrder: (order_id) => {
    dispatch(removeExistingOrder(order_id));
  },
  resetOrders: () => {
    dispatch(resetOrders());
  },
  toggleCartPanel: () => {
    dispatch(toggleCartPanel());
  },
  //toggleCartPanel: toggleCartPanel,
  loginUser: (creds) => {
    dispatch(loginUser(creds));
  },
  logoutUser: () => {
    dispatch(logoutUser());
  },
});

const ClothId = memo(({ clothes, addNewOrder, toggleCartPanel }) => {
  const { category, clothId } = useParams();
  console.log(category, clothId);
  const matchedCategory = clothes.find(
    (cat) => cat.category.toLowerCase() === category.toLowerCase()
  );

  const matchedItem = matchedCategory?.items.find(
    (item) => item._id === clothId
  );

  return (
    <Suspense fallback={<Loading />}>
      <motion.div
        transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
        initial={{ x: 1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -1000, opacity: 0 }}
      >
        <div>
          <Deats
            deats={matchedItem}
            addNewOrder={addNewOrder}
            toggleCart={toggleCartPanel}
          />
        </div>
      </motion.div>
    </Suspense>
  );
});

const ClothCat = memo(({ clothes, category }) => {
  const colthList = clothes
    .filter((cloth) => cloth.category === category)
    .flatMap((cloth) => cloth.items);

  return (
    <Suspense fallback={<Loading />}>
      <ProdList category={category} products={colthList} />
    </Suspense>
  );
});

const Admin = ({ auth, clothes, prodreq, vouchers, loginUser, logoutUser }) => {
  return (
    <Suspense fallback={<Loading />}>
      <AdminPanel
        auth={auth}
        clothes={clothes}
        prodreq={prodreq}
        vouchers={vouchers}
        loginUser={loginUser}
        logoutUser={logoutUser}
      />
    </Suspense>
  );
};

const Home = memo(({ clothes }) => (
  <Suspense
    fallback={
      <div className="d-flex justify-content-center align-items-center vh-100">
        <h3>Final Bit...</h3>
      </div>
    }
  >
    <motion.div
      transition={{ duration: 1.2, type: "tween", ease: [0.25, 0.1, 0.25, 1] }}
      initial={{ x: 1000, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -1000, opacity: 0 }}
    >
      <HeroSec />
      <BestD clothes={clothes} />
      <Category />
      <VelouraCol />
      <NewArr clothes={clothes} />
    </motion.div>
  </Suspense>
));

const Main = (props) => {
  useEffect(() => {
    props.fetchProdReq();
    props.fetchOrders();
    props.fetchCloth();
    props.fetchVouchers();
  }, []);

  /*   const [ordPage, setOrdpage] = useState(false);
  const handleOrd = () => {
    setOrdpage(!ordPage)
  } */

  if (props.clothes.isLoading || props.clothes.clothes.length == 0) {
    return <Loading />;
  }

  if (props.clothes.clothes && props.clothes.clothes.length > 0) {
    return (
      <>
        <Example
          orders={props.orders.orders}
          toggleCart={props.toggleCartPanel}
          /*           auth={props.auth}
          loginUser={props.loginUser}
          logoutUser={props.logoutUser}
          orders={props.orders.orders}
          clothes={props.clothes.clothes}
          cartpanel={props.cartPanel}
          isOpen={props.isOpen}
          toggleCart={props.toggleCartPanel}
          removeExistingOrder={props.removeExistingOrder} */
        />
        <Routes>
          <Route path="/home" element={<Home clothes={props.clothes} />} />
          <Route
            path="/home/:category/:clothId"
            element={
              <ClothId
                clothes={props.clothes.clothes}
                addNewOrder={props.addNewOrder}
                toggleCartPanel={props.toggleCartPanel}
              />
            }
          />

          <Route
            path="/home/shirt"
            element={
              <ClothCat clothes={props.clothes.clothes} category="shirt" />
            }
          />
          <Route
            path="/home/polo"
            element={
              <ClothCat clothes={props.clothes.clothes} category="polo" />
            }
          />
          <Route
            path="/home/full shirt"
            element={
              <ClothCat clothes={props.clothes.clothes} category="full shirt" />
            }
          />
          <Route
            path="/home/luxury shirt"
            element={
              <ClothCat
                clothes={props.clothes.clothes}
                category="luxury shirt"
              />
            }
          />
          <Route
            path="/home/luxury polo"
            element={
              <ClothCat
                clothes={props.clothes.clothes}
                category="luxury polo"
              />
            }
          />
          <Route
            path="/home/summer polo"
            element={
              <ClothCat
                clothes={props.clothes.clothes}
                category="summer polo"
              />
            }
          />
          <Route
            path="/home/summer shirt"
            element={
              <ClothCat
                clothes={props.clothes.clothes}
                category="summer shirt"
              />
            }
          />

          <Route path="/home/aboutus" element={<About />} />
          <Route
            path="/home/orders"
            element={
              <Order
                orders={props.orders.orders}
                removeExistingOrder={props.removeExistingOrder}
              />
            }
          />
          <Route
            path="/home/admin"
            element={
              <Admin
                auth={props.auth}
                clothes={props.clothes.clothes}
                prodreq={props.prodreq.prodreq}
                vouchers={props.vouchers.vouchers}
                loginUser={props.loginUser}
                logoutUser={props.logoutUser}
              />
            }
          />

          <Route
            path="/home/paystat/:tranId"
            element={<Success resetOrders={props.resetOrders} />}
          />
          <Route path="/home/failure/:tranId" element={<Fail />} />
          <Route path="/home/cancle/:tranId" element={<Cancle />} />
          <Route
            path="/home/cod"
            element={<Cod resetOrders={props.resetOrders} />}
          />

          <Route path="/home/shipping" element={<ShippingPoly />} />
          <Route path="/home/privacy" element={<PrivacyPoly />} />
          <Route path="/home/payment" element={<PaymentPoly />} />
          <Route path="/home/terms" element={<TermsConditions />} />
          <Route path="/home/refund" element={<RefundPoly />} />
          {/*             <Route path="/home/doctors" element={<AppointmentForm />} />
            <Route path="/home/sunglass" element={<AllSun sunglasses={props.sunglass} />} />
            <Route path="/home/sunglass/men" element={<FilteredMensSun sunglasses={props.sunglass} />} />
            <Route path="/home/sunglass/women" element={<FilteredWoMensSun sunglasses={props.sunglass} />} />
            <Route path="/home/orders" element={<Order orders={props.orders.orders} removeExistingOrder={props.removeExistingOrder}/>} /> */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
        <Footer />
        <AnimatePresence mode="wait">
          {props.cartPanel.isOpen && (
            <OrderBar
              orders={props.orders}
              handleOrdPage={props.toggleCartPanel}
              removeOrder={props.removeExistingOrder}
            />
          )}
        </AnimatePresence>
      </>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
