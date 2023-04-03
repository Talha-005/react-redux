import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteUser, getUsers } from "../store/slices/userSlice"
import Modal from "../components/modal"

const Home = () => {
  const dispatch = useDispatch()
  const { users, loading } = useSelector((state) => state.users)
  const [showModal, setShowModal] = useState(false)
  const [userData, setUserData] = useState()
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
            <div style={{ overflowX: "scroll" }}>
              <table class="table table-striped table-hover bg-white">
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
                    users.map((user) => (
                      <tr key={user.id}>
                        <th scope="row">{user.id}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
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
                    <p>No data Found</p>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
