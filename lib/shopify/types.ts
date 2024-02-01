export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Edge<T>[];
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: CartItem[];
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = Omit<ShopifyProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string | null;
  description: string | null;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount?: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo?: SEO | null;
  updatedAt: string;
  image: {
    src: string;
    width: number | undefined;
    height: number | undefined;
  } | null;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

// Old carts becomes `null` when you checkout.
export type ShopifyCartOperation = {
  cart: ShopifyCart | null;
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  cartLinesAdd: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyRemoveFromCartOperation = {
  cartLinesRemove: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  cartLinesUpdate: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCollectionOperation = {
  collection: ShopifyCollection;
  variables: {
    handle: string;
  };
};

export type ShopifyCollectionProductsOperation = {
  collection:
    | {
        products: Connection<ShopifyProduct>;
      }
    | null
    | undefined;
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
  };
};

export type ShopifyCollectionsOperation = {
  collections: Connection<ShopifyCollection>;
};

export type ShopifyMenuOperation = {
  menu?: {
    items: {
      title: string;
      url: string;
    }[];
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  pageByHandle: Page | null;
  variables: { handle: string };
};

export type ShopifyPagesOperation = {
  pages: Connection<Page>;
};

export type ShopifyProductOperation = {
  product: ShopifyProduct;
  variables: {
    handle: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  productRecommendations: ShopifyProduct[];
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  products: Connection<ShopifyProduct>;
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
  };
};
