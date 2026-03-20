import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface EditUserProps {
  id: number;
}
const EditUser: React.FC<EditUserProps> = ({ id }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<User>({
    id: 0,
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      const res = await fetch(`http://localhost:8080/api/users/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData({
          id: data.id,
          username: data.username,
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        });
      }
    };

    fetchUser();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${formData.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) throw new Error("Failed to update user");

      const updatedUser = await response.json();
      console.log("Updated user", updatedUser);
      alert("User updated successfully!");
      navigate("/admin/users");
    } catch (error) {
      console.error(error);
      alert("Error updating user.");
    }
  };
  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <div className="mb-9">
          <h1 className="font-bold">Edit User</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-blue-200 p-6 rounded-lg shadow-md lg:w-[60%]"
        >
          <input type="hidden" name="id" value={formData.id} />

          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              className="w-full border rounded border-black bg-white p-2"
              id="username"
              name="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded border-black bg-white p-2"
              id="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              className="w-full border rounded border-black bg-white p-2"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              className="w-full border rounded border-black bg-white p-2"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="rounded font-bold p-4 bg-green-900 cursor-pointer text-white hover:bg-green-500 hover:text-black"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUser;
