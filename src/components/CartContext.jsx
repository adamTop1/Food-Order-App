/* eslint-disable no-unused-vars */
import { createContext, useReducer } from 'react'

export const CartContext = createContext({
	items: [],
	totalAmount: 0,
	addItem: item => {},
	removeItem: id => {},
	removeAll: () => {}
})

const cartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD': {
			const formatedUpdateTotalAmount = parseFloat(
				(state.totalAmount + action.item.price * action.item.amount).toFixed(2)
			)

			const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id)
			const existingCartItem = state.items[existingCartItemIndex]
			let updatedItems

			if (existingCartItem) {
				const updatedItem = {
					...existingCartItem,
					amount: existingCartItem.amount + action.item.amount,
				}
				updatedItems = [...state.items]
				updatedItems[existingCartItemIndex] = updatedItem
			} else {
				updatedItems = state.items.concat(action.item)
			}

			return {
				items: updatedItems,
				totalAmount: formatedUpdateTotalAmount,
			}
		}
		case 'REMOVE': {
			const existingCartItemIndex = state.items.findIndex(item => item.id === action.id)
			const existingItem = state.items[existingCartItemIndex]
			const formatedUpdateTotalAmount = parseFloat((state.totalAmount - existingItem.price).toFixed(2))
			let updatedItems
			if (existingItem.amount === 1) {
				updatedItems = state.items.filter(item => item.id !== action.id)
			} else {
				const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
				updatedItems = [...state.items]
				updatedItems[existingCartItemIndex] = updatedItem
			}

			return {
				items: updatedItems,
				totalAmount: formatedUpdateTotalAmount,
			}
		}
		case 'REMOVE-ALL': {
			return {
				items: [],
				totalAmount: 0,
			}
		}
		default:
			return state
	}
}

const defaultCartState = {
	items: [],
	totalAmount: 0,
}

export const CartProvider = ({ children }) => {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

	const addItemToCartHandler = item => {
		dispatchCartAction({ type: 'ADD', item: item })
	}

	const removeItemFromCartHandler = id => {
		dispatchCartAction({ type: 'REMOVE', id: id })
	}

	const removeAllItemsFromItemsArr = () => {
		dispatchCartAction({type: 'REMOVE-ALL'})
	}

	const cartContextValue = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addItemToCartHandler,
		removeItem: removeItemFromCartHandler,
		removeAll: removeAllItemsFromItemsArr,
	}

	return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>
}
