import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Product from "../components/product"
import { getProducts } from "../store/slices/productSlice"

const Home = () => {
  const dispatch = useDispatch()
  const { products, loading } = useSelector((state) => state.products)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <div className="container py-4">
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <div
          className="row"
          style={{ rowGap: 18 }}
        >
          {products && products.length > 0
            ? products.map((product) => <Product product={product} />)
            : "No products found"}
        </div>
      )}
    </div>
  )
}

export default Home
