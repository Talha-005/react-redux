import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, getUsers } from "../store/slices/userSlice"
import Modal from "../components/modal"

const Home = () => {
  const dispatch = useDispatch()
  const { users, loading, searchUser } = useSelector((state) => state.users)
  const [showModal, setShowModal] = useState(false)
  const [userData, setUserData] = useState()
  const [searchGender, setSearchGender] = useState("")

  const filterBySearch = (elem) => {
    if (!searchUser) {
      return elem
    } else {
      return (
        elem.name.toLowerCase().includes(searchUser.toLowerCase()) ||
        elem.email.toLowerCase().includes(searchUser.toLowerCase())
      )
    }
  }

  const filterByGender = (elem) => {
    if (searchGender === "Male") {
      return elem.gender === searchGender
    } else if (searchGender === "Female") {
      return elem.gender === searchGender
    } else return elem
  }

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  return (
    <>
      {showModal && (
        <Modal
          userData={userData}
          setShowModal={setShowModal}
        />
      )}
      <div className="home">
        <div className="container">
          <h2 className="text-center my-3">
            All Users ({users && users.length})
          </h2>
          {loading ? (
            <h4>Loading...</h4>
          ) : (
            <>
              <div className="text-end mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value=""
                  checked={!searchGender}
                  onChange={(e) => setSearchGender(e.target.value)}
                />
                <label className="form-check-label mx-2">All</label>
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={(e) => setSearchGender(e.target.value)}
                />
                <label className="form-check-label mx-2">Male</label>
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={(e) => setSearchGender(e.target.value)}
                />
                <label className="form-check-label mx-2">Female</label>
              </div>
              <div style={{ overflowX: "scroll" }}>
                <table className="table table-striped table-hover bg-white">
                  <thead>
                    <tr>
                      <th scope="col">#ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Age</th>
                      <th scope="col">Gender</th>
                      <th scope="col">CreatedAt</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users && users.length > 0 ? (
                      users
                        .filter(filterBySearch)
                        .filter(filterByGender)
                        .map((user) => (
                          <tr key={user.id}>
                            <th scope="row">{user.id}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.gender}</td>
                            <td>
                              {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <button
                                onClick={() => [
                                  setUserData(user),
                                  setShowModal(true),
                                ]}
                                className="card-link btn btn-primary"
                              >
                                Edit
                              </button>
                              &nbsp;&nbsp;&nbsp;
                              <button
                                onClick={() => dispatch(deleteUser(user.id))}
                                className="card-link btn btn-primary"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <span>No data Found</span>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
