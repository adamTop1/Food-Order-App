import { useContext } from "react"
import { CartContext } from "./CartContext"

export default function Confirmation({onClose}) {

    const cartContext = useContext(CartContext)

    const handleConfirm = (event) => {
        event.preventDefault()
        onClose()
        cartContext.removeAll()
    }
    

  return (
    <div>
        <h3 className='text-black font-bold text-2xl my-4'>Success!</h3>
        <p className='text-black text-sm mb-2'>Your order was submitted successfully!</p>
        <p className='text-black text-sm mb-2'>We will get back to you with more details via email within the next few minutes.</p>
        <div className="flex justify-end ">
        <button className='bg-yellow-500 rounded py-2 px-6 m-1 text-black' onClick={handleConfirm}>Okay</button>
        </div>
    </div>
  )
}
