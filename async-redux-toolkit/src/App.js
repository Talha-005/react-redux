import "./App.css"
import { useEffect } from "react"
import { Route } from "react-router-dom"
import Navbar from "./components/navbar"
import Home from "./pages/home"
import Create from "./pages/create"

function App() {
  const ROUTES = [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/create",
      component: Create,
    },
  ]
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [window.location.pathname])
  return (
    <>
      <Navbar />
      <main>
        {ROUTES.map((props) => (
          <Route
            exact
            {...props}
          />
        ))}
      </main>
    </>
  )
}

export default App
