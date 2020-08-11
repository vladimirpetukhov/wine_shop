import React, { createContext, useReducer, useMemo } from 'react';
import {
  ActionTypes,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  createProductSuccess,
  createProductFailure,
  registerSuccess,
  registerFailure,
  addToCartSuccess,
  addToCartFailure,
  getProductsSuccess,
  getProductsFailure,
  getUserProductsSuccess,
  getUserProductsFailure,
  deleteProductSuccess,
  deleteProductFailure
} from './actions';
import userService from '../services/user-service';
import productService from '../services/product-service';

const cookies = document.cookie.split('; ').reduce((acc, curr) => {
  const [key, value] = curr.split('=');
  acc[key] = value;
  return acc;
}, {});

const authCookie = cookies['x-auth-cookie'];

const initialState = {
  isAuth: !!authCookie,
  user: JSON.parse(window.localStorage.getItem('user')),
  products: [],
  images: [],
  error: null,
  toast: { status: '', message: '' },
  cart: JSON.parse(window.localStorage.getItem('cart')) || []

};

const actionMap = {
  [ActionTypes.Login]: (state) => ({
    ...state,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.LoginSuccess]: (state, { user }) => ({
    ...state,
    user,
    isAuth: true,
    toast: { status: 'success', message: 'You are log successfully' },
  }),
  [ActionTypes.LoginFailure]: (state, { error }) => ({
    ...state,
    error,
    toast: { status: 'error', message: 'Your login failed' },
  }),
  [ActionTypes.Register]: (state) => ({
    ...state,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.RegisterSuccess]: (state, { user }) => ({
    ...state,
    user,
    isAuth: true,
    toast: {
      status: 'success',
      message: 'You are register and login successfully',
    },
  }),
  [ActionTypes.RegisterFailure]: (state, { error }) => ({
    ...state,
    error,
    toast: { status: 'error', message: 'Your registration failed' },
  }),
  [ActionTypes.Logout]: (state) => ({
    ...state,
    user: null,
    isAuth: false,
    toast: { status: 'success', message: 'You are logout successfully' },
  }),

  [ActionTypes.CreateProduct]: (state) => ({
    ...state,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.CreateProductSuccess]: (state) => ({
    ...state,
    error: null,
    toast: {
      status: 'success',
      message: 'You created new product successfully',
    },
  }),
  [ActionTypes.CreateProductFailure]: (state, { error }) => ({
    ...state,
    error,
    toast: { status: 'error', message: `${error}` },
  }),
  [ActionTypes.addToCart]: (state) => ({
    ...state,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.addToCartSuccess]: (state, { product, quantity }) => {
    let products = [...state.cart];
    const currentProduct = products.find((p) => p._id === product._id);

    if (currentProduct) {
      const index = state.cart.indexOf(currentProduct);
      products[index] = {
        ...currentProduct,
        productQuantityCart: currentProduct.productQuantityCart + quantity ? quantity : 1 ,
      };
    } else {
      products = products.concat({ ...product, productQuantityCart: quantity ? quantity : 1 });
    }

    window.localStorage.setItem('cart', JSON.stringify(products));

    return {
      ...state,
      cart: products,
      toast: { status: 'success', message: 'Product add to cart successfully' },
    };
  },
  [ActionTypes.addToCartFailure]: (state, { error }) => ({
    ...state,
    error,
    toast: { status: 'error', message: 'Something wrong' },
  }),
  [ActionTypes.updateQuantity]: (state) => ({
    ...state,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.updateQuantitySuccess]: (state, { product, value }) => {
    let products = [...state.cart];
    const currentProduct = products.find((p) => p._id === product._id);
    const index = products.indexOf(currentProduct);
    products[index] = {
      ...currentProduct,
      productQuantityCart: value,
    };

    window.localStorage.setItem('cart', JSON.stringify(products));
    
    return { ...state, cart: products, toast: { status: '', message: '' } };
  },
  [ActionTypes.updateQuantityFailure]: (state, { error }) => ({
    ...state,
    error,
  }),
  [ActionTypes.removeItemFromCart]: (state) => ({
    ...state,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.removeItemFromCartSuccess]: (state, { product }) => {
    const products = state.cart.filter((p) => p._id !== product._id);
    window.localStorage.setItem('cart', JSON.stringify(products));
    return { ...state, cart: products };
  },
  [ActionTypes.removeItemFromCartFailure]: (state, { error }) => ({
    ...state,
    error,
  }),
  [ActionTypes.resetCart]: (state) => ({
    ...state,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.resetCartSuccess]: (state) => {
    window.localStorage.setItem('cart', JSON.stringify([]));

    return { ...state, cart: [] };
  },
  [ActionTypes.resetCartFailure]: (state, { error }) => ({
    ...state,
    error,
  }),
  [ActionTypes.getProducts]: (state) => ({
    ...state,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.getProductsSuccess]: (state, { products }) => ({
      ...state,
      products,
      error: null,
      toast: { status: '', message: '' },
    }),
  [ActionTypes.getProductsFailure]: (state, { error }) => ({
    ...state,
    error,
    toast: { status: 'error', message: 'Something wrong' },
  }),
  [ActionTypes.getUserProducts]: (state) => ({
    ...state,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.getUserProductsSuccess]: (state, { products }) => ({
    ...state,
    products,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.getUserProductsFailure]: (state, { error }) => ({
    ...state,
    error,
    toast: { status: 'error', message: 'Something wrong' },
  }),
  [ActionTypes.deleteProduct]: (state) => ({
    ...state,
    error: null,
    toast: { status: '', message: '' },
  }),
  [ActionTypes.deleteProductSuccess]: (state) => ({
    ...state,
    error: null,
    toast: { status: 'success', message: 'Successfully deleted product' },
  }),
  [ActionTypes.deleteProductFailure]: (state, { error }) => ({
    ...state,
    error,
    toast: { status: 'error', message: 'Something wrong' },
  })
};

const asyncActionMap = {
  [ActionTypes.Login]: ({ user }) => {
    return userService
      .login(user)
      .then(({ data: { user } }) => {
        window.localStorage.setItem(
          'user',
          JSON.stringify({ id: user._id, token: user.token })
        );
        return loginSuccess(user);
      })
      .catch((error) => loginFailure(error));
  },
  [ActionTypes.Logout]: () => {
    return userService
      .logout()
      .then(() => {
        window.localStorage.clear();
        return logoutSuccess();
      })
      .catch((error) => logoutFailure(error));
  },
  [ActionTypes.CreateProduct]: ({ product }) => {
    return productService
      .createProduct(product)
      .then(() => createProductSuccess())
      .catch((error) => createProductFailure(error));
  },
  [ActionTypes.Register]: ({ user }) => {
    return userService
      .register(user)
      .then(() => {
        window.localStorage.setItem(
          'user',
          JSON.stringify({ id: user._id, token: user.token })
        );
        return registerSuccess(user);
      })
      .catch((error) => registerFailure(error));
  },
  [ActionTypes.addToCart]: ({ product, quantity }) => {
    return productService
      .getProductById(product._id)
      .then(({ data }) => {
        const currentProduct = data[0];
        return addToCartSuccess(currentProduct, quantity);
      })
      .catch((error) => addToCartFailure(error));
  },
  [ActionTypes.getProducts]:() => {
    return  productService.getAllProducts().then(({ data }) => {
     return getProductsSuccess(data)
    }).catch((error) => getProductsFailure(error))
  },
  [ActionTypes.getUserProducts]:() => {
    return productService.getUserProducts().then(({ data }) => {
     return getUserProductsSuccess(data)
    }).catch((error) => getUserProductsFailure(error))
  },

  [ActionTypes.deleteProduct]:({ id }) => {
    return productService.deleteProduct(id).then(() => {
     return deleteProductSuccess()
    }).catch((error) => deleteProductFailure(error))
  }
};

const storeReducer = (state, action) => {
  return actionMap[action.type]
    ? actionMap[action.type](state, action.payload)
    : state;
};

export const StoreContext = createContext(initialState);

const ContextStore = (props) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const store = useMemo(
    () => ({
      state,
      dispatch: (action) => {
        const asyncActionHandler = asyncActionMap[action.type];
        if (asyncActionHandler) {
          asyncActionHandler(action.payload).then(dispatch);
        }
        dispatch(action);
      },
    }),
    [state, dispatch]
  );

  return (
    // <StoreContext.Provider value={[state, dispatch]}>
    <StoreContext.Provider value={store}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default ContextStore;
