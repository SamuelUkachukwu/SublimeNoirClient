import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

const AddUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<User>({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Error: Failed to add user");

      const newUser = await response.json();
      console.log("User added:", newUser);
      alert("User added successfully!");
      navigate("/admin/users");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-full bg-red-300 flex flex-col items-center justify-center">
      <div className="mb-9">
        <h1 className="font-bold">Edit User</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-[90%]"
      >
        {/* <input type="hidden" name="id" value={formData.id} /> */}

        <div className="mb-6">
          <label htmlFor="username" className="block text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            className="w-full border rounded border-black"
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
            className="w-full border rounded border-black"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div className="mb-6">
          <label htmlFor="firstName" className="block text-sm font-medium mb-1">
            First Name
          </label>
          <input
            type="text"
            className="w-full border rounded border-black"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
        </div>

        <div className="mb-6">
          <label htmlFor="lastName" className="block text-sm font-medium mb-1">
            Last Name
          </label>
          <input
            type="text"
            className="w-full border rounded border-black"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>

        <div className="mb-6">
          <button type="submit" className="rounded font-bold p-4 bg-green-400">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
