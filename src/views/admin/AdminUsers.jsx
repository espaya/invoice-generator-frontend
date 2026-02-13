import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/admin_sidebar";
import Header from "../../components/header";
import Pagination from "../../controllers/Pagination";
import Cookies from "js-cookie";
import formatDate from "../../utils/FormatDate";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { PATHS } from "../../router";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiBase = import.meta.env.VITE_API_URL;

  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  // Debounce Search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const getUsers = async (page = 1, searchQuery = "") => {
    setLoading(true);
    setErrors({});

    try {
      const res = await fetch(
        `${apiBase}/api/admin/users?page=${page}&search=${searchQuery}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          },
          credentials: "include",
        },
      );

      const data = await res.json();

      if (!res.ok) {
        setErrors({ general: data.message || "Failed to fetch users" });
        setUsers([]);
        return;
      }

      setUsers(data.data);
      setCurrentPage(data.current_page);
      setLastPage(data.last_page);
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  // Fetch whenever page or debounced search changes
  useEffect(() => {
    getUsers(currentPage, debouncedSearch);
  }, [currentPage, debouncedSearch]);

  // Delete user
  const deleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Delete User",
      text: "Are you sure you want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${apiBase}/admin/users/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
          },
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          Swal.fire({
            title: "Error",
            text: data.message || "Failed to delete user",
            icon: "error",
          });
          return;
        }

        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        });

        getUsers(currentPage, debouncedSearch);
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div id="main-wrapper">
      <Header />
      <AdminSidebar />

      <div className="content-body">
        <div className="container">
          <div className="page-title">
            <div className="row align-items-center justify-content-between">
              <div className="col-md-6">
                <div className="page-title-content">
                  <h3>Users</h3>
                  <p className="mb-2">Manage all registered users</p>
                </div>
              </div>

              <div className="col-auto">
                <div className="search">
                  <form action="#">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <span className="input-group-text px-12">
                        <i className="ri-search-line"></i>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-auto">
                <div className="mt-48 d-flex justify-content-center align-items-center">
                  <Link
                    to={PATHS.ADMIN_ADD_USER}
                    type="button"
                    className="btn btn-primary mx-16 my-8"
                  >
                    <i className="ri-user-add-fill"></i> Add New User
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <div className="row">
            <div className="col-12">
              <div className="card transparent">
                <div className="card-body">
                  <div className="rtable rtable--5cols rtable--collapse">
                    {/* Table Head */}
                    <div className="rtable-row rtable-row--head bg-transparent">
                      <div className="rtable-cell topic-cell column-heading text-dark">
                        <strong>Name</strong>
                      </div>

                      <div className="rtable-cell category-cell column-heading text-dark">
                        <strong>Email</strong>
                      </div>

                      <div className="rtable-cell ranking-cell column-heading text-dark">
                        <strong>Role</strong>
                      </div>

                      <div className="rtable-cell impression-cell column-heading text-dark">
                        <strong>Created</strong>
                      </div>

                      <div className="rtable-cell sales-cell column-heading text-dark">
                        <strong>Actions</strong>
                      </div>
                    </div>

                    {/* Loading Skeleton */}
                    {loading &&
                      [...Array(5)].map((_, i) => (
                        <div className="rtable-row" key={i}>
                          <div className="rtable-cell topic-cell">
                            <div className="placeholder-glow">
                              <span className="placeholder col-8"></span>
                            </div>
                          </div>
                          <div className="rtable-cell category-cell">
                            <div className="placeholder-glow">
                              <span className="placeholder col-10"></span>
                            </div>
                          </div>
                          <div className="rtable-cell ranking-cell">
                            <div className="placeholder-glow">
                              <span className="placeholder col-6"></span>
                            </div>
                          </div>
                          <div className="rtable-cell impression-cell">
                            <div className="placeholder-glow">
                              <span className="placeholder col-6"></span>
                            </div>
                          </div>
                          <div className="rtable-cell sales-cell">
                            <div className="placeholder-glow">
                              <span className="placeholder col-5"></span>
                            </div>
                          </div>
                        </div>
                      ))}

                    {/* Users Rows */}
                    {!loading && users.length > 0
                      ? users.map((user) => (
                          <div className="rtable-row" key={user.id}>
                            <div className="rtable-cell topic-cell">
                              <div className="rtable-cell--content title-content">
                                {user.name}
                              </div>
                            </div>

                            <div className="rtable-cell category-cell">
                              <div className="rtable-cell--heading">Email</div>
                              <div className="rtable-cell--content date-content">
                                {user.email}
                              </div>
                            </div>

                            <div className="rtable-cell ranking-cell">
                              <div className="rtable-cell--heading">Role</div>
                              <div className="rtable-cell--content">
                                {user.role}
                              </div>
                            </div>

                            <div className="rtable-cell impression-cell">
                              <div className="rtable-cell--heading">
                                Created
                              </div>
                              <div className="rtable-cell--content">
                                {formatDate(user.created_at)}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="rtable-cell sales-cell">
                              <div className="d-flex gap-2">
                                {/* View */}
                                <button
                                  className="btn btn-sm btn-outline-info"
                                  title="View User"
                                  onClick={() =>
                                    alert(`View user: ${user.name}`)
                                  }
                                >
                                  <i className="ri-eye-line"></i>
                                </button>

                                {/* Edit */}
                                <button
                                  className="btn btn-sm btn-outline-warning"
                                  title="Edit User"
                                  onClick={() =>
                                    alert(`Edit user: ${user.name}`)
                                  }
                                >
                                  <i className="ri-edit-2-line"></i>
                                </button>

                                {/* Delete */}
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  title="Delete User"
                                  onClick={() => deleteUser(user.id)}
                                >
                                  <i className="ri-delete-bin-line"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))
                      : !loading && (
                          <p className="mt-3 text-center text-muted alert alert-info">
                            No users found.
                          </p>
                        )}
                  </div>

                  {/* Pagination */}
                  {!loading && users.length > 0 && (
                    <Pagination
                      currentPage={currentPage}
                      lastPage={lastPage}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
