import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createUser } from "../store/slices/userSlice"

const Create = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [data, setData] = useState({
    email: "",
    name: "",
    age: 0,
    gender: "",
    createdAt: Date.now(),
  })

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
    dispatch(createUser(data))
    setData({ email: "", name: "", age: 0, gender: "" })
    history.push("/")
  }

  return (
    <section className="container">
      <form
        onSubmit={formSubmitHandler}
        className="mx-auto my-3 w-75"
      >
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={data.email}
            onChange={inputHandler}
            placeholder="user@example.com"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={data.name}
            onChange={inputHandler}
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            name="age"
            className="form-control"
            value={data.age}
            onChange={inputHandler}
            placeholder="Age"
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
          />
          <label className="form-check-label mx-2">Female</label>
        </div>
        <button className=" btn btn-primary">Create</button>
      </form>
    </section>
  )
}

export default Create
