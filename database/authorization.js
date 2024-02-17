export const Role = {
  SELLER: "seller",
  REGULAR_USER: "regular_user",
};

export const Permission = {
  BROWSE_USERS: "browse_users",
  READ_USER: "read_user",
  EDIT_USER: "edit_user",
  ADD_USER: "add_user",
  DELETE_USER: "delete_user",

  BROWSE_PRODUCTS: "browse_products",
  READ_PRODUCT: "read_product",
  EDIT_PRODUCT: "edit_product",
  ADD_PRODUCT: "add_product",
  DELETE_PRODUCT: "delete_product",

  BROWSE_CATEGORIES: "browse_categories",
  READ_CATEGORY: "read_category",
  EDIT_CATEGORY: "edit_category",
  ADD_CATEGORY: "add_category",
  DELETE_CATEGORY: "delete_category",

  BROWSE_CARTS: "browse_cart",
  READ_CART: "read_cart",
  EDIT_CART: "edit_cart",
  ADD_CART: "add_cart",
  DELETE_CART: "delete_cart",

  BROWSE_ORDERS: "browse_orders",
  READ_ORDER: "read_order",
  EDIT_ORDER: "edit_order",
  ADD_ORDER: "add_order",
  DELETE_ORDER: "delete_order",
};

export const PermissionAssignment = {
  [Role.SELLER]: [
    Permission.BROWSE_USERS,
    Permission.READ_USER,
   

    Permission.BROWSE_PRODUCTS,
    Permission.READ_PRODUCT,
    Permission.EDIT_PRODUCT,
    Permission.ADD_PRODUCT,
    Permission.DELETE_PRODUCT,

    Permission.BROWSE_CATEGORIES,
    Permission.READ_CATEGORY,
    Permission.EDIT_CATEGORY,
    Permission.ADD_CATEGORY,
    Permission.DELETE_CATEGORY,

    Permission.BROWSE_CARTS,
    Permission.READ_CART,
    Permission.EDIT_CART,
    Permission.ADD_CART,
    Permission.DELETE_CART,

    Permission.BROWSE_ORDERS,
    Permission.READ_ORDER,
    Permission.EDIT_ORDER,
    Permission.ADD_ORDER,
    Permission.DELETE_ORDER,
  ],

  [Role.REGULAR_USER]: [
    Permission.EDIT_USER,

    Permission.BROWSE_PRODUCTS,
    Permission.READ_PRODUCT,


    Permission.BROWSE_CATEGORIES,
    Permission.READ_CATEGORY,

    Permission.BROWSE_CARTS,
    Permission.READ_CART,
    Permission.EDIT_CART,
    Permission.ADD_CART,
    Permission.DELETE_CART,

    Permission.BROWSE_ORDERS,
    Permission.READ_ORDER,
    Permission.EDIT_ORDER,
    Permission.ADD_ORDER,
    Permission.DELETE_ORDER,
  ],
};
