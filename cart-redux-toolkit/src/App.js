import "./App.css"
import { Route } from "react-router-dom"
import Home from "./pages/home"
import Cart from "./pages/cart"
import Navbar from "./components/navbar"

function App() {
  const ROUTES = [
    {
      path: "/",
       component: Home,
    },
    {
      path: "/cart",
       component: Cart,
    },
  ]
  // useEffect(() => {
  //   window.scrollTo(0, 0)
  // }, [window.location.pathname])
  return (
    <>
      <Navbar />
      <main>
        {ROUTES.map((props, index) => (
          <Route
            {...props}
            exact
            key={index}
          />
        ))}
      </main>
    </>
  )
}

export default App
