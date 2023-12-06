import { useState, useEffect } from 'react'
import Mealtem from './Mealtem'

function AvailableMeals() {
	const [mealsData, setMealsData] = useState()

	useEffect(() => {
		async function fetchMeals() {
			try {
				const response = await fetch('http://localhost:3000/meals')
				const jsonData = await response.json()
				setMealsData(jsonData)
			} catch (error) {
				console.error('Błąd podczas pobierania danych:', error)
			}
		}

		fetchMeals()
	}, [])

	return (
		<ul className='grid grid-cols-3 gap-3 my-20 md:mx-40 xl:mx-80'>
			{mealsData &&
				mealsData.map(meal => (
					<Mealtem key={meal.id} id={meal.id} name={meal.name} price={meal.price} description={meal.description} img={meal.image} />
				))}
		</ul>
	)
}

export default AvailableMeals
