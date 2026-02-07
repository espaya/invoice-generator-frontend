import React from "react";
import Header from "../../components/header";
import Sidebar from "../../components/sidebar";

export default function UserDashboard() {
  return (
    <>
      <div id="main-wrapper">

        <Header/>
        <Sidebar/>
        <div className="content-body">
          <div className="container">
            <div className="page-title">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <div className="page-title-content">
                    <h3>Dashboard</h3>
                    <p className="mb-2">Welcome to Edunet Dashboard</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home</a>
                    <span>
                      <i className="ri-arrow-right-s-line"></i>
                    </span>
                    <a href="#">Dashboard</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-sm-12">
                <div className="color-widget stat-widget p-20 mb-160 mb-30">
                  <div className="d-flex align-items-center mb-20">
                    <span className="icon">
                      <i className="ri-team-line text-primary bg-primary-lighten fs-30 py-12 px-12 rounded me-20"></i>
                    </span>
                    <div>
                      <p className="mb-0">
                        <strong>Total Students</strong>
                      </p>
                      <h3 className="mb-0">5220</h3>
                    </div>
                  </div>
                  <p className="mb-7">
                    <strong>Free: 4240 students</strong>
                  </p>
                  <p>
                    <strong>Paid: 980 Students</strong>
                  </p>
                  <div className="progress">
                    <div
                      className="progress-bar bg-primary"
                      style={{width:"75%"}}
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="undefined stat-widget p-20 mb-160 mb-30">
                  <div className="d-flex align-items-center mb-20">
                    <span className="icon">
                      <i className="ri-add-circle-line text-warning bg-warning-lighten fs-30 py-12 px-12 rounded me-20"></i>
                    </span>
                    <div>
                      <p className="mb-0">
                        <strong>New Students</strong>
                      </p>
                      <h3 className="mb-0">1032</h3>
                    </div>
                  </div>
                  <p className="mb-7">
                    <strong>Free: 909 students</strong>
                  </p>
                  <p>
                    <strong>Paid: 123 students</strong>
                  </p>
                  <div className="progress">
                    <div
                      className="progress-bar bg-warning"
                      style={{width:"80%"}}
                      role="progressbar"
                      aria-valuenow="80"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="undefined stat-widget p-20 mb-160 mb-30">
                  <div className="d-flex align-items-center mb-20">
                    <span className="icon">
                      <i className="ri-stack-line text-danger bg-danger-lighten fs-30 py-12 px-12 rounded me-20"></i>
                    </span>
                    <div>
                      <p className="mb-0">
                        <strong>Total Courses</strong>
                      </p>
                      <h3 className="mb-0">109</h3>
                    </div>
                  </div>
                  <p className="mb-7">
                    <strong>Free: 83 courses</strong>
                  </p>
                  <p>
                    <strong>Paid: 26 courses</strong>
                  </p>
                  <div className="progress">
                    <div
                      className="progress-bar bg-danger"
                      style={{width:"65%"}}
                      role="progressbar"
                      aria-valuenow="65"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xxl-7">
                <div id="user-activity" className="card" data-aos="fade-up">
                  <div className="card-header">
                    <h4 className="card-title">Earning</h4>
                  </div>
                  <div className="card-body">
                    <canvas id="EarningGraph"></canvas>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xxl-5">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Recent Notification</h4>
                    <a href="notification.html" className="btn btn-primary">
                      View All
                    </a>
                  </div>
                  <div className="card-body">
                    <div
                      className="recent-notification"
                      style={{height:"275px", position: "relative"}}
                    >
                      <div className="notification-list pe-10">
                        <a href="#">
                          <div className="d-flex align-items-center justify-content-start  pt-10 pb-10 border-bottom">
                            <span className="me-16 icon  bg-danger-lighten text-danger">
                              <i className="ri-close-line"></i>
                            </span>
                            <div className="flex-grow-1 flex-fill">
                              <h6 className="mb-5 fs-14">
                                2FA verification failed
                              </h6>
                              <span className="fs-13 text-muted">
                                020-11-04 12:00:23
                              </span>
                            </div>
                            <div className="duration">3 min ago</div>
                          </div>
                        </a>
                        <a href="#">
                          <div className="d-flex align-items-center justify-content-start  pt-10 pb-10 border-bottom">
                            <span className="me-16 icon  bg-warning-lighten text-warning">
                              <i className="ri-question-mark"></i>
                            </span>
                            <div className="flex-grow-1 flex-fill">
                              <h6 className="mb-5 fs-14">
                                Phone verification pending
                              </h6>
                              <span className="fs-13 text-muted">
                                020-11-04 12:00:23
                              </span>
                            </div>
                            <div className="duration">3 min ago</div>
                          </div>
                        </a>
                        <a href="#">
                          <div className="d-flex align-items-center justify-content-start  pt-10 pb-10 border-bottom">
                            <span className="me-16 icon  bg-danger-lighten text-danger">
                              <i className="ri-close-line"></i>
                            </span>
                            <div className="flex-grow-1 flex-fill">
                              <h6 className="mb-5 fs-14">
                                Dadeline over to launch the new course
                              </h6>
                              <span className="fs-13 text-muted">
                                020-11-04 12:00:23
                              </span>
                            </div>
                            <div className="duration">3 min ago</div>
                          </div>
                        </a>
                        <a href="#">
                          <div className="d-flex align-items-center justify-content-start  pt-10 pb-10 border-bottom">
                            <span className="me-16 icon  bg-success-lighten text-success">
                              <i className="ri-check-line"></i>
                            </span>
                            <div className="flex-grow-1 flex-fill">
                              <h6 className="mb-5 fs-14">
                                Device confirmation completed
                              </h6>
                              <span className="fs-13 text-muted">
                                020-11-04 12:00:23
                              </span>
                            </div>
                            <div className="duration">3 min ago</div>
                          </div>
                        </a>
                        <a href="#">
                          <div className="d-flex align-items-center justify-content-start  pt-10 pb-10 border-bottom">
                            <span className="me-16 icon  bg-warning-lighten text-warning">
                              <i className="ri-question-mark"></i>
                            </span>
                            <div className="flex-grow-1 flex-fill">
                              <h6 className="mb-5 fs-14">
                                New user verification is pending
                              </h6>
                              <span className="fs-13 text-muted">
                                020-11-04 12:00:23
                              </span>
                            </div>
                            <div className="duration">3 min ago</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xl-4 ">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Total Sales</h4>
                  </div>
                  <div className="card-body">
                    <canvas id="TotalSales"></canvas>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xl-8 ">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title">Student Queries</h5>
                  </div>
                  <div className="card-body">
                    <div
                      className="students-queries"
                      style={{height:"305px", position: "relative"}}
                    >
                      <div className="scrollbar-container ps">
                        <div className="student-query-inner d-flex justify-content-between align-items-start">
                          <img
                            className="me-20 rounded-circle"
                            src="images/avatar/7.jpg"
                            alt=""
                          />
                          <div className="student-query-details flex-basis-50 flex-grow-1 me-20">
                            <h6 className="mb-5">Machine Learning Bootcamp</h6>
                            <p>By Brandon Taylor</p>
                          </div>
                          <div className="d-flex flex-wrap justify-content-end mb-3">
                            <a
                              className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-primary-lighten"
                              href="#"
                            >
                              <i className="ri-check-line fs-18 text-primary"></i>
                            </a>
                            <a
                              className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-danger-lighten"
                              href="#"
                            >
                              <i className="ri-close-line fs-18 text-danger"></i>
                            </a>
                          </div>
                        </div>
                        <div className="student-query-inner d-flex justify-content-between align-items-start">
                          <img
                            className="me-20 rounded-circle"
                            src="images/avatar/8.jpg"
                            alt=""
                          />
                          <div className="student-query-details flex-basis-50 flex-grow-1 me-20">
                            <h6 className="mb-5">
                              Python Bootcamp from Zero to Hero
                            </h6>
                            <p>By Stweart Mark</p>
                          </div>
                          <div className="d-flex flex-wrap justify-content-end mb-3">
                            <a
                              className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-primary-lighten"
                              href="#"
                            >
                              <i className="ri-check-line fs-18 text-primary"></i>
                            </a>
                            <a
                              className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-danger-lighten"
                              href="#"
                            >
                              <i className="ri-close-line fs-18 text-danger"></i>
                            </a>
                          </div>
                        </div>
                        <div className="student-query-inner d-flex justify-content-between align-items-start">
                          <img
                            className="me-20 rounded-circle"
                            src="images/avatar/9.jpg"
                            alt=""
                          />
                          <div className="student-query-details flex-basis-50 flex-grow-1 me-20">
                            <h6 className="mb-5">
                              Amazon Web Services Certification
                            </h6>
                            <p>By Jhon Cane</p>
                          </div>
                          <div className="d-flex flex-wrap justify-content-end mb-3">
                            <a
                              className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-primary-lighten"
                              href="#"
                            >
                              <i className="ri-check-line fs-18 text-primary"></i>
                            </a>
                            <a
                              className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-danger-lighten"
                              href="#"
                            >
                              <i className="ri-close-line fs-18 text-danger"></i>
                            </a>
                          </div>
                        </div>
                        <div className="student-query-inner d-flex justify-content-between align-items-start">
                          <img
                            className="me-20 rounded-circle"
                            src="images/avatar/10.jpg"
                            alt=""
                          />
                          <div className="student-query-details flex-basis-50 flex-grow-1 me-20">
                            <h6 className="mb-5">
                              The Web Developer Bootcamp 2021
                            </h6>
                            <p>By Nicky Bonje</p>
                          </div>
                          <div className="d-flex flex-wrap justify-content-end mb-3">
                            <a
                              className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-primary-lighten"
                              href="#"
                            >
                              <i className="ri-check-line fs-18 text-primary"></i>
                            </a>
                            <a
                              className="icon mx-16 my-16 py-8 px-8 rounded-circle bg-danger-lighten"
                              href="#"
                            >
                              <i className="ri-close-line fs-18 text-danger"></i>
                            </a>
                          </div>
                        </div>
                        <div className="ps__rail-x" style={{left: "0px", top: "0px"}}>
                          <div
                            className="ps__thumb-x"
                            tabindex="0"
                            style={{left: "0px", width: "0px"}}
                          ></div>
                        </div>
                        <div className="ps__rail-y" style={{top: "0px", left: "0px"}}>
                          <div
                            className="ps__thumb-y"
                            tabindex="0"
                            style={{top: "0px", height: "0px"}}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xl-3">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Balance</h4>
                  </div>
                  <div className="card-body">
                    <div className="total-balance">
                      <p>Available Balance</p>
                      <h2>$221,478</h2>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 col-xl-12">
                        <div className="balance-stats d-flex justify-content-between align-items-center active">
                          <div>
                            <p>Today's Earn</p>
                            <h3>$42,678</h3>
                          </div>
                          <span>
                            <i className="ri-arrow-right-line"></i>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-12">
                        <div className="balance-stats d-flex justify-content-between align-items-center ">
                          <div>
                            <p>Under Review</p>
                            <h3>$1,798</h3>
                          </div>
                          <span>
                            <i className="ri-arrow-right-line"></i>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-12">
                        <div className="balance-stats d-flex justify-content-between align-items-center ">
                          <div>
                            <p>Pending</p>
                            <h3>$255.25</h3>
                          </div>
                          <span>
                            <i className="ri-arrow-right-line"></i>
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-6 col-xl-12">
                        <div className="balance-stats d-flex justify-content-between align-items-center ">
                          <div>
                            <p>Withdraw</p>
                            <h3>$365,478</h3>
                          </div>
                          <span>
                            <i className="ri-arrow-right-line"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-xl-9">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Student Location</h4>
                  </div>
                  <div className="card-body text-center">
                    <div id="world-map"></div>
                  </div>
                </div>
              </div>
              <div className="col-xl-12">
                <div className="card transparent">
                  <div className="card-header">
                    <h4 className="card-title">Trafic Analytics</h4>
                  </div>
                  <div className="card-body">
                    <div className="rtable rtable--5cols rtable--collapse">
                      <div className="rtable-row rtable-row--head bg-transparent">
                        <div className="rtable-cell topic-cell column-heading text-dark">
                          <strong>Name</strong>
                        </div>
                        <div className="rtable-cell traffic-cell column-heading text-dark">
                          <strong>Traffic</strong>
                        </div>
                        <div className="rtable-cell source-cell column-heading text-dark">
                          <strong>Source</strong>
                        </div>
                        <div className="rtable-cell referrals-cell column-heading text-dark">
                          <strong>Referrals</strong>
                        </div>
                        <div className="rtable-cell trend-cell column-heading text-dark">
                          <strong>Trend</strong>
                        </div>
                      </div>
                      <div className="rtable-row">
                        <div className="rtable-cell topic-cell">
                          <div className="rtable-cell--content title-content d-flex align-items-center">
                            <img
                              className="topic-cell-img "
                              src="images/courses/10.jpg"
                              width="95"
                              alt=""
                            />
                            <div className="topic-cell-span">
                              <h5>Amazon Web Services Certification</h5>
                              <p>AWS Certification Course</p>
                            </div>
                          </div>
                        </div>
                        <div className="rtable-cell traffic-cell">
                          <div className="rtable-cell--heading">Traffic</div>
                          <div className="rtable-cell--content date-content">
                            2.56K
                          </div>
                        </div>
                        <div className="rtable-cell source-cell">
                          <div className="rtable-cell--heading">Source</div>
                          <div className="rtable-cell--content access-link-content d-flex align-items-center">
                            facebook
                          </div>
                        </div>
                        <div className="rtable-cell referrals-cell">
                          <div className="rtable-cell--heading">Referrals</div>
                          <div className="rtable-cell--content replay-link-content">
                            28.19%
                          </div>
                        </div>
                        <div className="rtable-cell trend-cell">
                          <div className="rtable-cell--heading">Trend</div>
                          <div className="rtable-cell--content replay-link-content">
                            Chart Trend
                          </div>
                        </div>
                      </div>
                      <div className="rtable-row">
                        <div className="rtable-cell topic-cell">
                          <div className="rtable-cell--content title-content d-flex align-items-center">
                            <img
                              className="topic-cell-img "
                              src="images/courses/11.jpg"
                              width="95"
                              alt=""
                            />
                            <div className="topic-cell-span">
                              <h5>Python Bootcamp from Zero to Hero</h5>
                              <p>Basic Python course</p>
                            </div>
                          </div>
                        </div>
                        <div className="rtable-cell traffic-cell">
                          <div className="rtable-cell--heading">Traffic</div>
                          <div className="rtable-cell--content date-content">
                            1.56K
                          </div>
                        </div>
                        <div className="rtable-cell source-cell">
                          <div className="rtable-cell--heading">Source</div>
                          <div className="rtable-cell--content access-link-content d-flex align-items-center">
                            twitter
                          </div>
                        </div>
                        <div className="rtable-cell referrals-cell">
                          <div className="rtable-cell--heading">Referrals</div>
                          <div className="rtable-cell--content replay-link-content">
                            18.91%
                          </div>
                        </div>
                        <div className="rtable-cell trend-cell">
                          <div className="rtable-cell--heading">Trend</div>
                          <div className="rtable-cell--content replay-link-content">
                            Chart Trend
                          </div>
                        </div>
                      </div>
                      <div className="rtable-row">
                        <div className="rtable-cell topic-cell">
                          <div className="rtable-cell--content title-content d-flex align-items-center">
                            <img
                              className="topic-cell-img "
                              src="images/courses/12.jpg"
                              width="95"
                              alt=""
                            />
                            <div className="topic-cell-span">
                              <h5>The Web Developer Bootcamp 2021</h5>
                              <p>Advanced web developing course</p>
                            </div>
                          </div>
                        </div>
                        <div className="rtable-cell traffic-cell">
                          <div className="rtable-cell--heading">Traffic</div>
                          <div className="rtable-cell--content date-content">
                            2.17K
                          </div>
                        </div>
                        <div className="rtable-cell source-cell">
                          <div className="rtable-cell--heading">Source</div>
                          <div className="rtable-cell--content access-link-content d-flex align-items-center">
                            facebook
                          </div>
                        </div>
                        <div className="rtable-cell referrals-cell">
                          <div className="rtable-cell--heading">Referrals</div>
                          <div className="rtable-cell--content replay-link-content">
                            21.63%
                          </div>
                        </div>
                        <div className="rtable-cell trend-cell">
                          <div className="rtable-cell--heading">Trend</div>
                          <div className="rtable-cell--content replay-link-content">
                            Chart Trend
                          </div>
                        </div>
                      </div>
                      <div className="rtable-row">
                        <div className="rtable-cell topic-cell">
                          <div className="rtable-cell--content title-content d-flex align-items-center">
                            <img
                              className="topic-cell-img "
                              src="images/courses/13.jpg"
                              width="95"
                              alt=""
                            />
                            <div className="topic-cell-span">
                              <h5>Data Science Exercises Included.</h5>
                              <p>Latest technology of data storage</p>
                            </div>
                          </div>
                        </div>
                        <div className="rtable-cell traffic-cell">
                          <div className="rtable-cell--heading">Traffic</div>
                          <div className="rtable-cell--content date-content">
                            0.89K
                          </div>
                        </div>
                        <div className="rtable-cell source-cell">
                          <div className="rtable-cell--heading">Source</div>
                          <div className="rtable-cell--content access-link-content d-flex align-items-center">
                            linkedin
                          </div>
                        </div>
                        <div className="rtable-cell referrals-cell">
                          <div className="rtable-cell--heading">Referrals</div>
                          <div className="rtable-cell--content replay-link-content">
                            15.79%
                          </div>
                        </div>
                        <div className="rtable-cell trend-cell">
                          <div className="rtable-cell--heading">Trend</div>
                          <div className="rtable-cell--content replay-link-content">
                            Chart Trend
                          </div>
                        </div>
                      </div>
                      <div className="rtable-row">
                        <div className="rtable-cell topic-cell">
                          <div className="rtable-cell--content title-content d-flex align-items-center">
                            <img
                              className="topic-cell-img "
                              src="images/courses/14.jpg"
                              width="95"
                              alt=""
                            />
                            <div className="topic-cell-span">
                              <h5>Machine Learning Bootcamp</h5>
                              <p>Deploying course of trend technology</p>
                            </div>
                          </div>
                        </div>
                        <div className="rtable-cell traffic-cell">
                          <div className="rtable-cell--heading">Traffic</div>
                          <div className="rtable-cell--content date-content">
                            3.19K
                          </div>
                        </div>
                        <div className="rtable-cell source-cell">
                          <div className="rtable-cell--heading">Source</div>
                          <div className="rtable-cell--content access-link-content d-flex align-items-center">
                            youtube
                          </div>
                        </div>
                        <div className="rtable-cell referrals-cell">
                          <div className="rtable-cell--heading">Referrals</div>
                          <div className="rtable-cell--content replay-link-content">
                            38.79%
                          </div>
                        </div>
                        <div className="rtable-cell trend-cell">
                          <div className="rtable-cell--heading">Trend</div>
                          <div className="rtable-cell--content replay-link-content">
                            Chart Trend
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
