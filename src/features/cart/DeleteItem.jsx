import {useDispatch} from "react-redux"
import Button from "../../UI/Button";
import { deleteItem } from "./cartSlice";

export default function DeleteItem({piazzId}) {
    const dispatch = useDispatch()
  return (
    <Button type='small' onClick={()=> dispatch(deleteItem(piazzId))}>Delete</Button>
  )
}
