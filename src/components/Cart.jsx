import { CartContext } from './CartContext'
import { useContext } from 'react'

function Cart({ onClose, onOpenCheckout }) {
	const cartContext = useContext(CartContext)

	const handleAddItem = ({ id, name, price, amount }) => {
		cartContext.addItem({
			id: id,
			name: name,
			amount: amount,
			price: price,
		})
	}

	const handleRemoveItem = id => {
		cartContext.removeItem(id)
	}

	const mealsInCart = cartContext.items

	const noMealsInCart = mealsInCart.length === 0

	return (
		<div className='flex flex-col'>
			<h3 className='text-black font-bold text-2xl mt-4 mb-2'>Your Cart</h3>
			<div>
				{mealsInCart.map(meal => (
					<div className='flex items-center justify-between text-black' key={meal.id}>
						<p>
							{meal.name} - {meal.amount} x ${meal.price}
						</p>
						<div className='flex items-center'>
							<button 
								className='text-yellow-500 bg-black rounded-full h-7 w-7'
								onClick={handleRemoveItem.bind(null, meal.id)}>
								-
							</button>
							<p className='my-1 mx-3 p-1'>{meal.amount}</p>
							<button
								className='text-yellow-500 bg-black rounded-full h-7 w-7'
								onClick={handleAddItem.bind(null, { id: meal.id, name: meal.name, price: meal.price, amount: 1 })}>
								+
							</button>
						</div>
					</div>
				))}
			</div>
			{noMealsInCart ? (
				<p className='text-black my-2'>Nothing is here. Add something!</p>
			) : (
				<div className='flex justify-end my-2'>
					<p className='text-black font-bold text-base my-4'>${cartContext.totalAmount}</p>
				</div>
			)}
			<div className='mt-4 flex items-center justify-end gap-4'>
				<button onClick={onClose} className='text-black'>
					Close
				</button>
				<button className='bg-yellow-500 rounded py-2 px-6 text-black' onClick={onOpenCheckout}>
					Go to Checkout
				</button>
			</div>
		</div>
	)
}
export default Cart
