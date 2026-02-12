import Header from "../../components/header";
import Sidebar from "../../components/sidebar";
import { Link } from "react-router-dom";
import { PATHS } from "../../router";
import ProfilePhoto from "../../components/user/ProfilePhoto";
import UpdateEmail from "../../components/user/UpdateEmail";
import UpdatePassword from "../../components/user/UpdatePassword";
import UpdatePersonalInfo from "../../components/user/UpdatePersonalInfo";

export default function Settings() {

  return (
    <>
      <div id="main-wrapper">
        <Header />
        <Sidebar />

        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Profile</h3>
                    <p className="mb-2">Welcome to Settings Profile page</p>
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
              {/* MENU */}
              <div className="col-md-3">
                <ul className="settings-menu">
                  <li className="active">
                    <Link to={PATHS.SETTINGS}>
                      <i className="ri-arrow-right-s-line" />
                      Profile
                    </Link>
                  </li>
                </ul>
              </div>

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
