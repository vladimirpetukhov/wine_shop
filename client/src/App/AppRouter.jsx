import React, { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../components/forms/Login/Login';
import Register from '../components/forms/Register/Register';
import Welcome from '../components/Welcome/Welcome';
import { StoreContext } from '../store/store';
const Details = React.lazy(() => import('../components/products/Details/Details'));
const List = React.lazy(() => import('../components/products/List/List'));
const Cart = React.lazy(() => import('../components/Cart/Cart'));
const Create = React.lazy(() => import('../components/forms/CreateProduct/Create'));
const Checkout = React.lazy(() => import('../components/forms/Checkout/Checkout'));
const ThankYou = React.lazy(() => import('../components/ThankYou/ThankYou'));
const NotFound = React.lazy(() => import('../components/NotFound/NotFound'));
const AppRouter = () => {
  const { state: { isAuth } } = useContext(StoreContext);
  const ProtectRoute = ({ path, component}) => {
    return isAuth ? <Route path={path} component={component} /> : <Redirect to={'/login'} />
  }
  const InnerProtectRoute = ({ path, component}) => {
    return isAuth ? <Redirect to={'/'}/> : <Route path={path} component={component} /> 
  }
  return (
    <Switch>
      <Route path="/" exact component={Welcome} />
      <InnerProtectRoute path="/login" component={Login} />
      <InnerProtectRoute path="/register" component={Register} />
      <InnerProtectRoute path="/cart" component={Cart} />
      <InnerProtectRoute path="/shop" component={List} />
      <InnerProtectRoute path="/checkout" component={Checkout} />
      <InnerProtectRoute path="/thankyou" component={ThankYou} />
      <ProtectRoute path={"/add-product"} component={Create} />
      <ProtectRoute path={"/my-products"} exact component={List} />
      <ProtectRoute path="/my-products/:id" component={List}/>
      <Route path="/details/:id" component={Details} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default AppRouter;
