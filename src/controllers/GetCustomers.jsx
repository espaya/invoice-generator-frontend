import Cookies from "js-cookie";

const GetCustomers = async (setLoading, apiBase, setCustomers, page = 1) => {
  setLoading(true);
  try {
    await fetch(`${apiBase}/sanctum/csrf-cookie`, {
      method: "GET",
      credentials: "include",
    });

    const response = await fetch(`${apiBase}/api/get-customers?page=${page}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch customers");
    }

    setCustomers(data);
    
  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
};

export default GetCustomers;
