import Cookies from "js-cookie";

const getSingleUser = async (
  setLoading,
  setErrors,
  apiBase,
  setSingleUser,
  id,
) => {
  setLoading(true);

  try {
    const response = await fetch(`${apiBase}/api/admin/users/view/${id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      setErrors({ general: data.message });
      return;
    }

    setSingleUser(data);
  } catch (err) {
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
};

export default getSingleUser;
