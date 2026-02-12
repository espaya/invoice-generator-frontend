import Cookies from "js-cookie";

const apiRequest = async (url, method = "GET", body = null) => {
  try {
    const response = await fetch(url, {
      method,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-XSRF-TOKEN": decodeURIComponent(Cookies.get("XSRF-TOKEN")),
      },
      body: body ? JSON.stringify(body) : null,
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        success: false,
        message: data?.message || "Something went wrong.",
        data: null,
      };
    }

    return {
      success: true,
      message: data?.message || "Request successful.",
      data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Network error occurred.",
      data: null,
    };
  }
};

// ------------------- ACTIONS -------------------

export const downloadInvoicePdf = (invoice_number, apiBase) => {
  window.open(`${apiBase}/api/invoice/${invoice_number}/download`, "_blank");
};

export const sendInvoice = async (invoice_number, apiBase) => {
  return await apiRequest(
    `${apiBase}/api/invoice/${invoice_number}/send`,
    "POST",
  );
};

export const markInvoicePaid = async (invoice_number, apiBase) => {
  return await apiRequest(
    `${apiBase}/api/invoice/${invoice_number}/mark-paid`,
    "POST",
  );
};

export const duplicateInvoice = async (invoice_number, apiBase) => {
  return await apiRequest(
    `${apiBase}/api/invoice/${invoice_number}/duplicate`,
    "POST",
  );
};

export const voidInvoice = async (invoice_number, apiBase) => {
  return await apiRequest(
    `${apiBase}/api/invoice/${invoice_number}/void`,
    "POST",
  );
};

export const deleteInvoice = async (invoice_number, apiBase) => {
  return await apiRequest(`${apiBase}/api/invoice/${invoice_number}`, "DELETE");
};
