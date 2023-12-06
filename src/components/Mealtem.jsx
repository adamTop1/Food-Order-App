import { CartContext } from './CartContext'
import { useContext } from 'react'

function Mealtem({ id, name, price, description, img }) {
	const cartContext = useContext(CartContext)

	const handleAddItem = () => {
		cartContext.addItem({
			id: id,
			name: name,
			amount: 1,
			price: price
		})
	}

	
	return (
		<div className='mb-4 flex flex-col items-center rounded-lg bg-black bg-opacity-70 overflow-hidden'>
			<div className='mb-2'>
				<img src={`http://localhost:3000/${img}`} alt='photo of dish' />
			</div>
			<div className='text-center flex flex-col items-center'>
				<h3 className=' xl:text-2xl sm:text-xl font-bold my-2 h-10'>{name}</h3>
				<p className='text-yellow-500 bg-yellow-700 bg-opacity-10 w rounded font-bold py-1 px-5'>${price}</p>
				<p className='text-white text-xs sm:text-sm xl:text-base h-24 p-2 md:p-4 m-1 xl:my '>{description}</p>
				<button
					className='bg-yellow-500 rounded py-2 px-6 text-black my-4 '
					onClick={handleAddItem}>
					Add to Cart
				</button>
			</div>
		</div>
	)
}

export default Mealtem
