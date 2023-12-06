import { useContext } from 'react'
import { CartContext } from './CartContext'

function Checkout({ onClose, onOpenConfirmation }) {
	const cartContext = useContext(CartContext)

	const handleSubmit = event => {
		event.preventDefault()

		const userOrder = cartContext.items

		const fd = new FormData(event.target)
		const data = Object.fromEntries(fd)
		console.log(data)

		
		async function updateUserPlaces(meals) {
			const response = await fetch('http://localhost:3000/orders', {
				method: 'PUT',
				body: JSON.stringify({ meals }),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			
			const resData = await response.json()
			
			if (!response.ok) {
				throw new Error('Failed to update user data.')
			}
			return resData.message
		}
		
		updateUserPlaces(userOrder)
		onOpenConfirmation()
	}

	return (
		<div className='flex flex-col'>
			<h3 className='text-black font-bold text-2xl my-4'>Checkout</h3>
			<p className='text-black text-sm mb-2'>Totol Amount: ${cartContext.totalAmount}</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor='name' className='text-black font-bold text-sm my-1'>
					Full Name
				</label>
				<input
					required
					type='text'
					name='name'
					className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2'
				/>

				<label htmlFor='email' className='text-black font-bold text-sm my-1'>
					E-Mail Address
				</label>
				<input
					required
					type='email'
					name='email'
					className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2'
				/>

				<label htmlFor='street' className='text-black font-bold text-sm my-1'>
					Street
				</label>
				<input
					required
					type='text'
					name='street'
					className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2'
				/>
				<div className='flex'>
					<div>
						<label htmlFor='postCode' className='text-black font-bold text-sm my-1'>
							Postal Code
						</label>
						<input
							required
							type='text'
							name='postCode'
							className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5'
						/>
					</div>

					<div>
						<label htmlFor='city' className='text-black font-bold text-sm my-1'>
							City
						</label>
						<input
							required
							type='text'
							name='city'
							className=' bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10/12 p-2.5'
						/>
					</div>
				</div>
				<div className='mt-4 flex items-center justify-end gap-4'>
					<button onClick={onClose} className='text-black'>
						Close
					</button>
					<button className='bg-yellow-500 rounded py-2 px-6 text-black'>Submit order</button>
				</div>
			</form>
		</div>
	)
}

export default Checkout
