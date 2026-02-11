import Cookies from "js-cookie";

const viewInvoice = async (
  invoice_number,
  setLoading,
  setInvoice,
  setErrors,
  apiBase,
) => {
  setErrors({});
  setLoading(true);

  try {
    const response = await fetch(
      `${apiBase}/api/view-invoice/${invoice_number}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN"))
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      setErrors({ general: data.message || "Failed to fetch invoice." });
      return;
    }

    setInvoice(data);
  } catch (err) {
    setErrors({ general: err.message || "Something went wrong." });
  } finally {
    setLoading(false);
  }
};

export default viewInvoice;
