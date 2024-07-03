import { useState } from "react";
import { Form, redirect, useNavigation, useActionData } from "react-router-dom";
import {useSelector , useDispatch} from "react-redux"
import EmptyCart from "../cart/EmptyCart"
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../UI/Button";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store"
import {formatCurrency} from "../../utils/helpers"
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );


function CreateOrder() {
  const username = useSelector((state)=> state.user.username)
  const dispatch = useDispatch();


  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const fromErrors = useActionData();
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice
  if(!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8 ">Ready to order? lets go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="grow rounded-full border
             border-stone-200 px-4 py-2 text-sm 
             transition-all duration-300 placeholder:text-stone-400 focus:outline-none 
             focus:ring focus:ring-yellow-400  md:px-6 md:py-3" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="rounded-full border w-full 
             border-stone-200 px-4 py-2 text-sm 
             transition-all duration-300 placeholder:text-stone-400 focus:outline-none 
             focus:ring focus:ring-yellow-400  md:px-6 md:py-3" type="tel" name="phone" required />
          {fromErrors?.phone && <p className="mt-2 p-2  text-xs text-red-700 bg-red-100 rounded-md">{fromErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="rounded-full border w-full
             border-stone-200 px-4 py-2 text-sm 
             transition-all duration-300 placeholder:text-stone-400 focus:outline-none 
             focus:ring focus:ring-yellow-400  md:px-6 md:py-3"
              type="text" name="address" required />
          </div>
          <span className="absolute right-[3px] z-50">
          <Button type="small" onClick={()=> dispatch(fetchAddress())}>get position</Button>
          </span>

        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none 
            focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button type="primary"
            disabled={isSubmitting}
            className='bg-yellow-400 uppercase font-semibold text-stone-800 py-3 px-4 inline-block tracking-wide 
            rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none 
            focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-wait'
          
          >
            {" "}
            {isSubmitting ? "Placing order..." : `Order now form ${formatCurrency(totalPrice)}` }
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority == "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number. We might need id to contact you";
  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);
  store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
