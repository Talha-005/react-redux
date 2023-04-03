import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { editUser } from "../store/slices/userSlice"

const Modal = ({ userData, setShowModal }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState()

  const inputHandler = useCallback(
    (e) => {
      if (e.target.name === "age") {
        setData((prev) => ({
          ...prev,
          [e.target.name]: parseInt(e.target.value),
        }))
        return
      }
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    },
    [setData],
  )

  const formSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(editUser(data))
    setShowModal(false)
  }

  useEffect(() => {
    console.log(userData)
    setData(userData)
  }, [userData])

  return (
    <div className="modal_wrapper">
      <div className="modal_cont">
        <form onSubmit={formSubmitHandler}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              className="form-control"
              type="email"
              name="email"
              value={data && data.email}
              placeholder="user@example.com"
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={data && data.name}
              placeholder="Name"
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Age</label>
            <input
              className="form-control"
              type="number"
              name="age"
              value={data && data.age}
              placeholder="Age"
              onChange={inputHandler}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Male"
              onChange={inputHandler}
              checked={data && data.gender === "Male"}
            />
            <label className="form-check-label mx-2">Male</label>
          </div>
          <div className="mb-3">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Female"
              onChange={inputHandler}
              checked={data && data.gender === "Female"}
            />
            <label className="form-check-label mx-2">Female</label>
          </div>
          <div className="d-flex justify-content-between">
            <button className=" btn btn-primary">Edit</button>
            <button
              type="button"
              className=" btn btn-primary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal
