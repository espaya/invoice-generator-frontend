import Cookies from "js-cookie";

const GetCustomers = async (
  setLoading,
  apiBase,
  setCustomers,
  page = 1,
  search = "",
) => {
  setLoading(true);

  const safeSearch = (search ?? "").toString();

  try {
    const response = await fetch(
      `${apiBase}/api/get-customers?page=${page}&search=${encodeURIComponent(
        safeSearch,
      )}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch customers");
    }

    setCustomers(data);
  } catch (e) {
    console.error("Fetch customers error:", e.message);
  } finally {
    setLoading(false);
  }
};

export default GetCustomers;
