import AdminSettingsMenu from "../../components/admin/admin_settings_menu";
import AdminSidebar from "../../components/admin/admin_sidebar";
import Header from "../../components/header";
import ProfilePhoto from "../../components/user/ProfilePhoto";
import UpdateEmail from "../../components/user/UpdateEmail";
import UpdatePassword from "../../components/user/UpdatePassword";
import UpdatePersonalInfo from "../../components/user/UpdatePersonalInfo";

export default function AdminSettings() {
  return (
    <>
      <div id="main-wrapper">
        <Header />

        <AdminSidebar />

        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Account Settings</h3>
                    <p className="mb-2">
                      Manage your profile information, email address, and
                      password.
                    </p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Settings </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Profile</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <AdminSettingsMenu />
              <div className="col-md-9">
                <div className="row">
                  <ProfilePhoto />
                  <UpdateEmail />
                  <UpdatePassword />
                  <UpdatePersonalInfo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
