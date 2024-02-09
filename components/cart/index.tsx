import { default as NextDynamic } from 'next/dynamic';
import { cookies } from 'next/headers';
import { getCart } from 'lib/shopify';

const CartModal = NextDynamic(() => import('./modal'), { ssr: false });
export default async function Cart() {
  const cartId = cookies().get('cartId')?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  return <CartModal cart={cart} />;
}
