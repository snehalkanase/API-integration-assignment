import React, { useEffect, useState } from 'react'
import "./profile.css";

export default function Profile() {
  const [user, setUser] = useState({});
  let userId = JSON.parse(localStorage.getItem("userId"));
  const token = JSON.parse(localStorage.getItem('token'));
  console.log(typeof userId);

  useEffect(() => {
    try {
      // api call for user data
      const fetchUsers = async () => {
        let res = await fetch(`https://genxhire-esurveillance-api.azurewebsites.net/api/user/${userId}`, {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
        "accept": "application/json"
          },
        });
        if (!res.ok) {
          throw new Error(`Error! status: ${res.status}`)
        }
        res = await res.json();
        setUser(res);
        console.log(res);
      }
      fetchUsers();
    } catch (error) {
      console.log(error)
    }
  }, [token, userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  return (
    <>
      <div className='heading'>Dashboard</div>
      <table className='table'>
        <tr>
          <td>Name:</td>
          <td>{user.firstName +" "+ user.lastName}</td>
        </tr>

        <tr>
          <td>Email:</td>
          <td>{user.email}</td>
        </tr>

        <tr>
          <td>Mobile number:</td>
          <td>{user.number}</td>
        </tr>

        <tr>
          <td>Designation:</td>
          <td>{user.designation}</td>
        </tr>

        <tr>
          <td>Balance:</td>
          <td>{user.balance}</td>
        </tr>

        <tr>
          <td>Active:</td>
          <td>true</td>
        </tr>

        <tr>
          <td>Online:</td>
          <td>true</td>
        </tr>

        <tr>
          <td>Allow multidevice:</td>
          <td>true</td>
        </tr>

      </table>

      <button onClick={handleLogout}>Log Out</button>
    </>
  )
}
