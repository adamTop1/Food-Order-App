import AvailableMeals from "./components/AvailableMeals";
import { CartProvider } from "./components/CartContext";
import Header from "./components/Header";


function App() {
  return (
    <>
      <CartProvider>
      <Header />
      <main>
        <AvailableMeals />
      </main>
      </CartProvider>
    </>
  )
}

export default App;
