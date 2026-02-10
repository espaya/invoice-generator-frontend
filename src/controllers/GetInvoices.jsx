import Cookies from "js-cookie";

const GetInvoices = async (setLoading, apiBase, setInvoices, page = 1) => {
  setLoading(true);
  try {
    await fetch(`${apiBase}/sanctum/csrf-cookie`, {
      method: "GET",
      credentials: "include",
    });

    const response = await fetch(`${apiBase}/api/get-invoices?page=${page}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-XSRF-TOKEN": Cookies.get("XSRF-TOKEN"),
      },
    });

    const data = await response.json();

    if (!response.ok)
      throw new Error(data.message || "Failed to fetch invoices");

    setInvoices(data);
  } catch (e) {
    console.error(e);
  } finally {
    setLoading(false);
  }
};

export default GetInvoices;
