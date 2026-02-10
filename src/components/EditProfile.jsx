import React, { useState } from "react";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    username: "janedoe",
    fullName: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Senior Product Manager",
    phone: "+1 234 567 8901",
    address: "123 Main St, New York, NY",
    postCode: "10001",
    city: "New York",
    country: "USA",
    joinedSince: "01/03/2020",
    accountType: "Enterprise User",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    console.log("Updated Profile Data:", formData);
    // Add your API call or update logic here
  };

  const handleCancel = () => {
    // Reset to initial state or fetch fresh data
    setFormData({
      username: "janedoe",
      fullName: "Jane Doe",
      email: "jane.doe@example.com",
      role: "Senior Product Manager",
      phone: "+1 234 567 8901",
      address: "123 Main St, New York, NY",
      postCode: "10001",
      city: "New York",
      country: "USA",
      joinedSince: "01/03/2020",
      accountType: "Enterprise User",
    });
  };

  const fields = [
    { label: "Username", name: "username" },
    { label: "Full Name", name: "fullName" },
    { label: "Email Address", name: "email", type: "email" },
    { label: "Role / Position", name: "role" },
    { label: "Phone Number", name: "phone", type: "tel" },
    { label: "Address", name: "address" },
    { label: "Post Code", name: "postCode" },
    { label: "City", name: "city" },
    { label: "Country", name: "country" },
    { label: "Joined Since", name: "joinedSince", type: "date" },
    { label: "Account Type", name: "accountType" },
  ];

  return (
    <div className="row">
      {fields.map((field) => (
        <div className="col-lg-6 col-md-6 mb-3" key={field.name}>
          <div className="user-info">
            <label className="form-label">{field.label}</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>
      ))}

      <div className="col-lg-9 mt-3">
        <button className="me-2 btn btn-primary" onClick={handleUpdate}>
          Update
        </button>
        <button className="btn btn-danger" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
