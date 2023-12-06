import logoImg from '../assets/logo.jpg'
import { useState, useContext } from 'react'
import Modal from './Modal'
import Cart from './Cart'
import Checkout from './Checkout'
import { CartContext } from './CartContext'
import Confirmation from './Confirmation'

function Header() {
	const [cartIsOpen, setCartIsOpen] = useState()
	const [checkoutIsOpen, setCheckoutIsOpen] = useState()
	const [confirmationIsOpen, setConfirmationIsOpen] = useState()

	const openCart = () => {
		setCartIsOpen(true)
	}
	const closeCart = () => {
		setCartIsOpen(false)
	}

	const openCheckout = () => {
		setCheckoutIsOpen(true)
		setCartIsOpen(false)
	}
	const closeCheckout = () => {
		setCheckoutIsOpen(false)
	}
	const openConfirmation = () => {
		setCheckoutIsOpen(false)
		setConfirmationIsOpen(true)
	}
	const closeConfirmation = () => {
		setConfirmationIsOpen(false)
	}

	const cartContext = useContext(CartContext)

	return (
		<div className='flex items-center justify-between my-10 mx-10 '>
			<div className='flex items-center'>
				<img src={logoImg} alt='logo' className='w-10 h-10 md:w-10 md:h-10 rounded-full mr-4 border-2 border-yellow-500' />
				<h1 className=' text-xl md:text-3xl text-yellow-500'>REACTFOOD</h1>
			</div>
			<div>
				<button className='text-yellow-500 text-base md:text-2xl' onClick={openCart}>
					Cart ( {cartContext.items.length} )
				</button>
				{cartIsOpen && (
					<Modal onClose={closeCart}>
						<Cart onClose={closeCart} onOpenCheckout={openCheckout} />
					</Modal>
				)}
				{checkoutIsOpen && (
					<Modal onClose={closeCheckout}>
						<Checkout onClose={closeCheckout} onOpenConfirmation={openConfirmation} />
					</Modal>
				)}
				{confirmationIsOpen && (
					<Modal onClose={closeConfirmation}>
						<Confirmation onClose={closeConfirmation} />
					</Modal>
				)}
			</div>
		</div>
	)
}

export default Header
