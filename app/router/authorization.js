export const Role = {
    SELLER: 'seller',
    REGULAR_USER: 'regular_user'
  }
  
  export const Permission = {
    BROWSE_PRODUCTS: 'browse_products',
    READ_PRODUCT: 'read_product',
    EDIT_PRODUCT: 'edit_product',
    ADD_PRODUCT: 'add_product',
    DELETE_PRODUCT: 'delete_product',

    BROWSE_CATEGORIES: 'browse_categories',
    READ_CATEGORY: 'read_category',
    EDIT_CATEGORY: 'edit_category',
    ADD_CATEGORY: 'add_category',
    DELETE_CATEGORY: 'delete_category',

    

  }
  

  export const PermissionAssignment = {
    [Role.SELLER]: [
      Permission.BROWSE_PRODUCTS,
      Permission.READ_PRODUCT,
      Permission.EDIT_PRODUCT,
      Permission.ADD_PRODUCT,
      Permission.DELETE_PRODUCT,
    ],
  
    [Role.REGULAR_USER]: [
      Permission.BROWSE_PRODUCTS,
      Permission.READ_PRODUCT,
    ]
  }