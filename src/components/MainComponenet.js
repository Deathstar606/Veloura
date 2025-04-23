import React, { useEffect } from 'react';
import HeroSec from './HeroSec';
import BestD from "./BestDeals";
import Deats from './Details';
import Order from './OrderPage';
import ProdList from './ProductList';
import NewArr from './NewArrival';
import AdminPanel from './Admin Forms/AdminPanel';
/* import RenderItem from './Featured'; */
import AboutUs from "./AboutUs";
import Category from "./Category";
import Example from './Navbar';
import Footer from './Footer';

import Success from './PaymentStats/Success';

import { Link, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchCloth, fetchOrders, fetchProdReq, addNewOrder, removeExistingOrder, loginUser, logoutUser } from '../Redux/ActionCreators';
import { AnimatePresence, motion } from 'framer-motion';
import { Loading } from './LoadingComponent';
import List from './ProductList';

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    clothes: state.clothes,
/*     deals: state.deals,
    feats: state.feats, */
    orders: state.orders,
    prodreq: state.prodreq,
    //cart: state.cart
  }
}

const mapDispatchToProps = (dispatch) => ({    //method defination
  fetchCloth: () => {dispatch(fetchCloth())},
/*   fetchSun: () => {dispatch(fetchSun())}, */
  fetchOrders: () => {dispatch(fetchOrders())},
  fetchProdReq: () => {dispatch(fetchProdReq())},
  addNewOrder: (order) => {dispatch(addNewOrder(order))},
  removeExistingOrder: (order_id) => {dispatch(removeExistingOrder(order_id))},
  loginUser: (creds) => {dispatch(loginUser(creds))},
  logoutUser: () => {dispatch(logoutUser())}
});

const Main = (props) => {
  useEffect(() => {
    props.fetchProdReq();
    props.fetchOrders();
    props.fetchCloth();
  }, []);

  const ClothId = () => {
    const { category, clothId } = useParams();

    const matchedCategory = props.clothes.clothes.find(
      (cat) => cat.category.toLowerCase() === category.toLowerCase()
    );

    const matchedItem = matchedCategory?.items.find(
      (item) => item._id === clothId
    );
  
    return (
      <motion.div
        transition={{ duration: 0.5, type: "tween", ease: "easeIn" }}
        initial={{ x: 1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -1000, opacity: 0 }}
      >
        <div>
          <Deats
            deats={matchedItem}
            // Add back other props if needed
            // similar={props.sunglass.sunglass}
            addNewOrder={props.addNewOrder}
            // reviews={props.reviews.reviews.filter(
            //   (rev) => rev.cloth === clothId
            // )}
            isLoading={props.clothes.isLoading}
            errMess={props.clothes.errMess}
            // postReview={props.postReview}
          />
        </div>
      </motion.div>
    );
  };

  const TShirts = () => {
    const colthList = props.clothes.clothes
      .filter(cloth => cloth.category === "shirt")
      .flatMap(cloth => cloth.items);
  
    return (
      <ProdList category="shirt" products={colthList} />
    );
  }

  const Home = () => {

      return (
        <>
          <motion.div
            transition={{ 
              duration: 1.2, 
              type: "tween", 
              ease: [0.25, 0.1, 0.25, 1] 
            }}
            initial = {{x: 1000, opacity: 0}}
            animate= {{x: 0, opacity: 1}}
            exit= {{x: -1000, opacity: 0}}>
            <HeroSec />
            <BestD clothes={props.clothes}/>
            <Category />
            <AboutUs />
            <NewArr clothes={props.clothes}/>
          </motion.div>
        </>
      );
  };

  if (props.clothes.isLoading || props.clothes.clothes.length == 0) {
    return (
       <Loading />
    );
  }

  if (props.clothes.clothes && props.clothes.clothes.length > 0) {
    return (
      <>
        <Example
/*           auth={props.auth}
          loginUser={props.loginUser}
          logoutUser={props.logoutUser} */
          orders={props.orders.orders}
          clothes={props.clothes.clothes}
          removeExistingOrder={props.removeExistingOrder}
        />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/home/:category/:clothId" element={<ClothId clothes={props.clothes}/>} />
            <Route path="/home/shirt" element={<TShirts />} />
            <Route path="/home/orders" element={<Order orders={props.orders.orders} removeExistingOrder={props.removeExistingOrder}/>} />
            <Route path="/home/admin" element={<AdminPanel auth={props.auth} clothes={props.clothes.clothes} prodreq={props.prodreq.prodreq} loginUser={props.loginUser} logoutUser={props.logoutUser}/>} />
            <Route path="/home/paystat/:tranId" element={<Success />} />
{/*             <Route path="/home/doctors" element={<AppointmentForm />} />
            <Route path="/home/sunglass" element={<AllSun sunglasses={props.sunglass} />} />
            <Route path="/home/sunglass/men" element={<FilteredMensSun sunglasses={props.sunglass} />} />
            <Route path="/home/sunglass/women" element={<FilteredWoMensSun sunglasses={props.sunglass} />} />
            <Route path="/home/orders" element={<Order orders={props.orders.orders} removeExistingOrder={props.removeExistingOrder}/>} /> */}
            <Route
              path="*"
              element={<Navigate to="/home" replace />}
            />
          </Routes>
        <Footer />
      </>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);