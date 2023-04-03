import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  decrementQuantity,
  getCartTotal,
  incrementQuantity,
  removeItem,
} from "../store/slices/cartSlice"

const Cart = () => {
  const dispatch = useDispatch()
  const { cart, totalQuantity, totalPrice } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(getCartTotal())
  }, [cart])

  return (
    <section>
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          <div className="col-md-8">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Cart ({cart && cart.length})</h5>
              </div>
              <div className="card-body">
                {cart &&
                  cart.map((data) => (
                    <div
                      className="row"
                      key={data.id}
                    >
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div
                          className="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light"
                        >
                          <img
                            src={data.image}
                            className="w-100"
                            style={{ height: 150, objectFit: "contain" }}
                            alt="Blue Jeans Jacket"
                          />
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        <p>
                          <strong>{data.title}</strong>
                        </p>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => dispatch(removeItem(data.id))}
                        >
                          &#128465;
                        </button>
                      </div>
                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div
                          className="d-flex mb-4 align-items-center justify-content-start justify-content-md-center"
                          style={{ maxWidth: "300px" }}
                        >
                          <button
                            onClick={() => dispatch(decrementQuantity(data.id))}
                            className="btn btn-primary px-3"
                          >
                            -
                          </button>
                          <div className="form-outline mx-2">
                            {data.quantity}
                          </div>
                          <button
                            onClick={() => dispatch(incrementQuantity(data.id))}
                            className="btn btn-primary px-3"
                          >
                            +
                          </button>
                        </div>
                        <p className="text-start text-md-center">
                          <strong>${data.price}</strong>
                        </p>
                      </div>
                      <hr className="my-4" />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header py-3">
                <h5 className="mb-0">Summary</h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                    Total Quantity
                    <span>{totalQuantity}</span>
                  </li>

                  <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                    <div>
                      <strong>Total Amount</strong>
                    </div>
                    <span>
                      <strong>${totalPrice}</strong>
                    </span>
                  </li>
                </ul>

                <button
                  type="button"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cart
