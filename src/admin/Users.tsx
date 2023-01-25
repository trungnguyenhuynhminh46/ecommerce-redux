import { deleteUser } from "firebase/auth";
import { collection, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/authContext";
import useCollectionQuery from "../hooks/useCollectionQuery";
import { db } from "../share/firebase";
import Layout from "../components/Layout";
import Swal from "sweetalert2";

const Users = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const {
    data: usersSnapshot,
    loading: usersIsLoading,
    error: usersHaveError,
  } = useCollectionQuery("all-users", collection(db, "users"));
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    const usersList: any[] = [];
    if (!usersSnapshot?.empty) {
      usersSnapshot?.forEach((doc) => {
        const user = { id: doc.id, ...doc.data() };
        usersList.push(user);
      });
      setUsers(usersList);
    }
    if (usersSnapshot?.empty) {
    }
  }, [usersSnapshot]);
  const handleDeleteUser = async (user: any) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        // Delete user in firestore
        await deleteDoc(doc(db, "users", user.uid));
        // Delete user
        await deleteUser(user);
        // Success alert
        toast.success("User has been removed successfully");
        navigate("/login");
      }
    } catch (err: any) {
      const message = err.message;
      toast.error(message);
    }
  };

  return (
    <Layout>
      <section>
        <div className="container my-10">
          <div className="custom-table mt-12">
            {usersIsLoading && (
              <div className="h-[300px] flex justify-center items-center">
                <div className="w-[30px] h-[30px] rounded-[50%] border-4 border-deep-blue border-t-transparent animate-spin"></div>
              </div>
            )}
            {!usersIsLoading && users.length > 0 && currentUser.uid && (
              <table>
                <thead>
                  <tr>
                    <td className="px-6 py-3">#</td>
                    <td className="px-6 py-3">ID</td>
                    <td className="px-6 py-3">Email</td>
                    <td className="px-6 py-3">Display Name</td>
                    <td className="px-6 py-3">Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    return (
                      <tr key={user.id}>
                        <td className="px-6 py-4">
                          <img
                            src={user.photoURL}
                            alt=""
                            className="w-14 h-14 rounded-[50%] "
                          />
                        </td>
                        <td className="px-6 py-4">
                          {user.id.slice(0, 10) + "..."}
                        </td>
                        <td className="px-6 py-4">{user.email}</td>
                        <td className="px-6 py-4">{user.displayName}</td>
                        <td className="px-6 py-4">
                          {user.id === currentUser.uid && (
                            <div className="flex gap-5">
                              <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                  handleDeleteUser(currentUser);
                                }}
                              >
                                Delete
                              </button>
                              {/* <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                              Update
                            </button> */}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {!usersIsLoading && users.length == 0 && (
              <div className="h-[300px] flex justify-center items-center">
                <h1 className="text-2xl font-semibold">There's no user yet</h1>
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Users;
