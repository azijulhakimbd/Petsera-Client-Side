import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


function AdoptionRequests({ userEmail }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (!userEmail) return;

    setLoading(true);
    axiosSecure
      .get(`/adoptions/user-requests`, { params: { userEmail } })
      .then((res) => {
        setRequests(res.data.requests);
      })
      .catch((err) => {
        console.error("Failed to fetch adoption requests", err);
      })
      .finally(() => setLoading(false));
  }, [userEmail, axiosSecure]);

  const updateStatus = (id, status) => {
    axiosSecure
      .patch(`/adoptions/${id}/status`, { status })
      .then(() => {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status } : req
          )
        );
      })
      .catch((err) => {
        console.error("Failed to update adoption status", err);
        alert("Error updating status");
      });
  };

  if (loading) return <p>Loading adoption requests...</p>;

  if (requests.length === 0) return <p>No adoption requests found.</p>;

  return (
    <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Pet Name</th>
          <th>Requester Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Location</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req) => (
          <tr key={req._id}>
            <td>{req.petName}</td>
            <td>{req.name}</td>
            <td>{req.email}</td>
            <td>{req.phone}</td>
            <td>{req.location}</td>
            <td>{req.status || "pending"}</td>
            <td>
              {req.status === "pending" ? (
                <>
                  <button onClick={() => updateStatus(req._id, "accepted")}>Accept</button>{" "}
                  <button onClick={() => updateStatus(req._id, "rejected")}>Reject</button>
                </>
              ) : (
                <em>{req.status}</em>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AdoptionRequests;
