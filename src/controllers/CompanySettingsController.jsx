import Cookies from "js-cookie";

const CompanySettings = async (setLoading, apiBase, setCompanySettings) => {
  setLoading(true);
  try {

    // await fetch(`${apiBase}/sanctum/csrf-cookie`, {
    //   method: "GET",
    //   credentials: "include",
    // });

    const response = await fetch(`${apiBase}/api/company-settings`, {
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
      throw new Error(data.message || "Failed to fetch company settings");
    }
    setCompanySettings(data);
  } catch (err) {
    throw err.message || "An error occurred while fetching company settings";
  } finally {
    setLoading(false);
  }
};

export default CompanySettings;
