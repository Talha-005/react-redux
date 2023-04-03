import React from "react"
import { useDispatch } from "react-redux"
import { addItem } from "../store/slices/cartSlice"

const Product = ({ product }) => {
  const dispatch = useDispatch()
  return (
    <div
      className="col-12 col-sm-6 col-md-4 col-lg-3 "
      key={product.id}
    >
      <div className="card h-100">
        <img
          src={product.image}
          className="card-img-top w-100"
          alt="..."
          style={{ height: 150, objectFit: "contain" }}
        />
        <div className="card-body d-flex justify-content-between flex-column align-items-center">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text fw-bold">${product.price}</p>
          <p>
            &#9733;{product.rating.rate} ({product.rating.count})
          </p>
          <button
            className="btn btn-primary w-100"
            onClick={() => dispatch(addItem(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Product)
