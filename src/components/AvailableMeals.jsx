import { useState, useEffect } from 'react'
import Mealtem from './Mealtem'

function AvailableMeals() {
	const [mealsData, setMealsData] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	useEffect(() => {
		async function fetchMeals() {
			setIsError(false)
			setIsLoading(true)
			try {
				const response = await fetch('http://localhost:3000/meals')
				const jsonData = await response.json()
				setMealsData(jsonData)
				setIsLoading(false)
			} catch (error) {
				console.error('Błąd podczas pobierania danych:', error)
				setIsLoading(false)
				setIsError(true)
			}
		}
		fetchMeals()
	}, [])

	return (
		<div>
			{isLoading && (
				<p className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl'>Loading...</p>
			)}
			{isError && (
				<div className='mt-80 md:mt-0 px-16 md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2'>
					<p className=' text-xl md:text-2xl'>Something went wrong. Please refresh the page.</p>
				</div>
			)}
			<ul className='grid grid-cols-2 md:grid-cols-3 gap-3 md:my-20 mx-10 md:mx-40 xl:mx-80'>
				{mealsData &&
					mealsData.map(meal => (
						<Mealtem
							key={meal.id}
							id={meal.id}
							name={meal.name}
							price={meal.price}
							description={meal.description}
							img={meal.image}
						/>
					))}
			</ul>
		</div>
	)
}

export default AvailableMeals
