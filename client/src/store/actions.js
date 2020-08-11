export const ActionTypes = {
  Login: Symbol('[AUTH] Login'),
  LoginSuccess: Symbol('[AUTH] Login Success'),
  LoginFailure: Symbol('[AUTH] Login Failure'),

  Register: Symbol('[AUTH] Register'),
  RegisterSuccess: Symbol('[AUTH] Success'),
  RegisterFailure: Symbol('[AUTH] Failure'),

  Logout: Symbol('[AUTH] Logout'),
  LogoutSuccess: Symbol('[AUTH] Logout Success'),
  LogoutFailure: Symbol('[AUTH] Logout Failure'),

  CreateProduct: Symbol('[AUTH] Create Product'),
  CreateProductSuccess: Symbol('[AUTH] Create Product Success'),
  CreateProductFailure: Symbol('[AUTH] Create Product Failure'),

  getProducts: Symbol('[PRODUCTS] Get All Products'),
  getProductsSuccess: Symbol('[PRODUCTS] Get All Products Success'),
  getProductsFailure: Symbol('[PRODUCTS] Get All Products Failure'),

  getUserProducts: Symbol('[PRODUCTS] Get User Products'),
  getUserProductsSuccess: Symbol('[PRODUCTS] Get User Products Success'),
  getUserProductsFailure: Symbol('[PRODUCTS] Get User Products Failure'),

  addToCart: Symbol('[PRODUCTS] Add to card'),
  addToCartSuccess: Symbol('[PRODUCTS] Add to card Success'),
  addToCartFailure: Symbol('[PRODUCTS] Add to card Failure'),

  updateQuantity: Symbol('[PRODUCTS] Update quantity in cart'),
  updateQuantitySuccess: Symbol('[PRODUCTS] Update quantity in cart Success'),
  updateQuantityFailure: Symbol('[PRODUCTS] Update quantity in cart Failure'),

  removeItemFromCart: Symbol('[PRODUCTS] Remove item from cart'),
  removeItemFromCartSuccess: Symbol('[PRODUCTS] Remove item from cart Success'),
  removeItemFromCartFailure: Symbol('[PRODUCTS] Remove item from cart Failure'),

  resetCart: Symbol('[PRODUCTS] Reset cart'),
  resetCartSuccess: Symbol('[PRODUCTS] Reset cart Success'),
  resetCartFailure: Symbol('[PRODUCTS] Reset cart Failure'),

  deleteProduct: Symbol('[PRODUCTS] Delete Product'),
  deleteProductSuccess: Symbol('[PRODUCTS] Delete Product Success'),
  deleteProductFailure: Symbol('[PRODUCTS] Delete Product Failure'),
};

export const login = (user) => ({ type: ActionTypes.Login, payload: { user } });
export const loginSuccess = (user) => ({ type: ActionTypes.LoginSuccess, payload: { user }});
export const loginFailure = (error) => ({ type: ActionTypes.LoginFailure, payload: { error }});

export const register = (user) => ({type: ActionTypes.Register, payload: { user }});
export const registerSuccess = (user) => ({type: ActionTypes.RegisterSuccess, payload: { user }});
export const registerFailure = (error) => ({type: ActionTypes.RegisterFailure, payload: { error }});

export const logout = () => ({type: ActionTypes.Logout, payload: undefined});
export const logoutSuccess = () => ({type: ActionTypes.LogoutSuccess, payload: undefined});
export const logoutFailure  = (error) => ({type: ActionTypes.LogoutFailure, payload: { error }});

export const createProduct = (product) => ({ type: ActionTypes.CreateProduct, payload: { product } });
export const createProductSuccess = () => ({ type: ActionTypes.CreateProductSuccess, payload: undefined});
export const createProductFailure = (error) => ({ type: ActionTypes.CreateProductFailure, payload: { error }});

export const getProducts = () => ({ type: ActionTypes.getProducts, payload: undefined });
export const getProductsSuccess = (products) => ({ type: ActionTypes.getProductsSuccess, payload: { products }});
export const getProductsFailure = (error) => ({ type: ActionTypes.getProductsFailure, payload: { error }});

export const getUserProducts = () => ({ type: ActionTypes.getUserProducts, payload: undefined });
export const getUserProductsSuccess = (products) => ({ type: ActionTypes.getUserProductsSuccess, payload: { products }});
export const getUserProductsFailure = (error) => ({ type: ActionTypes.getUserProductsFailure, payload: { error }});

export const addToCart = (product, quantity) => ({ type: ActionTypes.addToCart, payload: { product, quantity } });
export const addToCartSuccess = (product, quantity) => ({ type: ActionTypes.addToCartSuccess, payload: { product, quantity }});
export const addToCartFailure = (error) => ({ type: ActionTypes.addToCartFailure, payload: { error }});

export const updateQuantity = ({ product, value }) => ({ type: ActionTypes.updateQuantity, payload: { product, value } });
export const updateQuantitySuccess = ({ product, value }) => ({ type: ActionTypes.updateQuantitySuccess, payload: { product, value }});
export const updateQuantityFailure = (error) => ({ type: ActionTypes.updateQuantityFailure, payload: { error }});

export const removeItemFromCart = (product) => ({ type: ActionTypes.removeItemFromCart, payload: { product } });
export const removeItemFromCartSuccess = (product) => ({ type: ActionTypes.removeItemFromCartSuccess, payload: { product }});
export const removeItemFromCartFailure = (error) => ({ type: ActionTypes.removeItemFromCartFailure, payload: { error }});

export const resetCart = () => ({ type: ActionTypes.resetCart, payload: undefined });
export const resetCartSuccess = () => ({ type: ActionTypes.resetCartSuccess, payload: undefined});
export const resetCartFailure = (error) => ({ type: ActionTypes.resetCartFailure, payload: { error }});

export const deleteProduct = (id) => ({ type: ActionTypes.deleteProduct, payload: { id } });
export const deleteProductSuccess = () => ({ type: ActionTypes.deleteProductSuccess, payload: undefined});
export const deleteProductFailure = (error) => ({ type: ActionTypes.deleteProductFailure, payload: { error }});