const Role = {
  SELLER: "seller",
  REGULAR_USER: "regular_user",
};

const Permission = {
  BROWSE_PRODUCTS: "browse_products",
  READ_PRODUCT: "read_product",
  EDIT_PRODUCT: "edit_product",
  ADD_PRODUCT: "add_product",
  DELETE_PRODUCT: "delete_product",

  BROWSE_USERS: "browse_users",
  READ_USER: "read_user",
  EDIT_USER: "edit_user",
  ADD_USER: "add_user",
  DELETE_USER: "delete_user",

  BROWSE_ORDERS: "browse_orders",
  READ_ORDER: "read_order",
  EDIT_ORDER: "edit_order",
  ADD_ORDER: "add_order",
  DELETE_ORDER: "delete_order",

  BROWSE_CARTS: "browse_carts",
  READ_CART: "read_cart",
  EDIT_CART: "edit_cart",
  ADD_CART: "add_cart",
  DELETE_CART: "delete_cart",
};

const PermissionAssignment = {
  [Role.SELLER]: [
    Permission.BROWSE_USERS,

    Permission.BROWSE_PRODUCTS,
    Permission.BROWSE_ORDERS,

    Permission.READ_PRODUCT,
    Permission.EDIT_PRODUCT,
    Permission.ADD_PRODUCT,
    Permission.DELETE_PRODUCT,
  ],
  [Role.REGULAR_USER]: [
    Permission.EDIT_USER,
    Permission.READ_USER,

    Permission.BROWSE_PRODUCTS,
    Permission.READ_PRODUCT,

    Permission.BROWSE_CARTS,
    Permission.EDIT_CART,
    Permission.READ_CART,
    Permission.ADD_CART,
    Permission.DELETE_CART,

    Permission.ADD_ORDER,
    Permission.READ_ORDER,
    Permission.EDIT_ORDER,
  ],
};

export { Role, Permission, PermissionAssignment };
