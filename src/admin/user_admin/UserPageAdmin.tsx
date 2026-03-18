import React, { useEffect, useState } from "react";
import apiClient from "../../api/axiosConfig";
import { Link } from "react-router-dom";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  orders: any[];
}

const UserPageAdmin = () => {
  const [data, setData] = useState<User[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get<User[]>("/users");
        setData(response.data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await apiClient.delete(`/users/${id}`);

      if (response.status === 204) {
        setData((prev) => prev.filter((u) => u.id !== id));
      }
      alert("User deleted succssefully");
    } catch (error: any) {
      console.log("Error deleting user", error);

      if (error.response) {
        alert("User cannot be deleted (...)");
      } else {
        alert("Server error. Try again later.");
      }
    }
  };

  return (
    <div className="flex flex-col shadow-md border rounded-xl">
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Users</h2>
        <Link
          to="/admin/add-user"
          className="bg-red-800 text-white p-2 rounded border border-black"
        >
          Add User
        </Link>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Username</th>
              <th className="px-4 py-3 text-left">First Name</th>
              <th className="px-4 py-3 text-left">Last Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Edit</th>
              <th className="px-4 py-3 text-left">Delete</th>
            </tr>
          </thead>

          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.firstName}</td>
                <td className="px-4 py-3">{user.lastName}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <Link
                    to={`/admin/edit-user/${user.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                </td>

                <td className="px-4 py-3">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:underline cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPageAdmin;
