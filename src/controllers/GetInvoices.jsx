import Cookies from "js-cookie";

export default async function GetInvoices(
  setLoading,
  apiBase,
  setInvoices,
  page = 1,
  search = "",
) {
  setLoading(true);

  const safeSearch = (search ?? "").toString();

  try {
    const res = await fetch(
      `${apiBase}/api/get-invoices?page=${page}&search=${encodeURIComponent(
        safeSearch,
      )}`,
      {
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      },
    );

    const data = await res.json();

    if (res.ok) {
      setInvoices(data);
    }
  } catch (err) {
    console.error("Fetch invoices error:", err);
  } finally {
    setLoading(false);
  }
}
