 import { formatCurrency } from "../../utils/helpers";
 import {  useSelector} from "react-redux"
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
import { getCurrentQunatityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQunatityById(pizzaId))


  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity currentQuantity={currentQuantity} pizzaId={pizzaId} />
        <DeleteItem piazzId={pizzaId}/>
      </div>
    </li>
  );
}

export default CartItem;
