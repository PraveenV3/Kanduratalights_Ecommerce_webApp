import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header';
import Sidebar from '../../Sidebar';
import Footer from '../../Footer';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      if (response.data.success === 1) {
        setUsers(response.data.data);
      } else {
        // Handle the case where no data is found or any error.
        // For example, you can show a message to the user or redirect to an error page.
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <>
      <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-lg-12 grid-margin stretch-card">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Users</h4>
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>User Name</th>
                              <th>Email</th>
                            </tr>
                          </thead>
                          <tbody>
                            {users.map((user) => (
                              <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
