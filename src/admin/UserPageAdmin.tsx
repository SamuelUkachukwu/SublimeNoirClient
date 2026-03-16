import React, { useEffect, useState } from 'react'
import apiClient from '../api/axiosConfig';


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


   return (
    <div className="bg-white rounded-xl shadow-md border flex flex-col">
      
      {/* Table Title */}
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold">Users</h2>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">

          {/* Header */}
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

          {/* Rows */}
          <tbody>
            {data.map((user) => (
              <tr key={user.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.firstName}</td>
                <td className="px-4 py-3">{user.lastName}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                </td>

                <td className="px-4 py-3">
                  <button className="text-red-600 hover:underline">
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
}

export default UserPageAdmin