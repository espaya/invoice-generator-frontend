import AdminSidebar from "../../components/admin/admin_sidebar";
import Header from "../../components/header";

export default function AdminReports() {
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
                    <h3>Users</h3>
                    <p className="mb-2">Welcome to Edunet Leader Board page</p>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="breadcrumbs">
                    <a href="#">Home </a>
                    <span>
                      <i className="ri-arrow-right-s-line" />
                    </span>
                    <a href="#">Leader Board</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card transparent">
                  <div className="card-body">
                    <div className="rtable rtable--5cols rtable--collapse">
                      <div className="rtable-row rtable-row--head bg-transparent">
                        <div className="rtable-cell topic-cell column-heading text-dark">
                          <strong> Course Name</strong>
                        </div>
                        <div className="rtable-cell category-cell column-heading text-dark">
                          <strong>Category</strong>
                        </div>
                        <div className="rtable-cell ranking-cell column-heading text-dark">
                          <strong>Ranking</strong>
                        </div>
                        <div className="rtable-cell impression-cell column-heading text-dark">
                          <strong>Impression</strong>
                        </div>
                        <div className="rtable-cell sales-cell column-heading text-dark">
                          <strong> Sales</strong>
                        </div>
                        <div className="rtable-cell earning-cell column-heading text-dark">
                          <strong>Earning</strong>
                        </div>
                      </div>
                      <div className="rtable-row">
                        <div className="rtable-cell topic-cell">
                          <div className="rtable-cell--content title-content d-flex align-items-center">
                            <img
                              className="topic-cell-img"
                              src="images/courses/bootstrap.png"
                              alt=""
                              width={50}
                            />
                            <span className="topic-cell-span">
                              Bootstrap Camp
                            </span>
                          </div>
                        </div>
                        <div className="rtable-cell category-cell">
                          <div className="rtable-cell--heading">Category</div>
                          <div className="rtable-cell--content date-content">
                            Growing designing concept
                          </div>
                        </div>
                        <div className="rtable-cell ranking-cell">
                          <div className="rtable-cell--heading">Ranking</div>
                          <div className="rtable-cell--content access-link-content d-flex align-items-center">
                            <span>
                              <i className="ri-star-s-line fs-16 me-5 text-warning" />
                            </span>
                            3.89
                          </div>
                        </div>
                        <div className="rtable-cell impression-cell">
                          <div className="rtable-cell--heading">Impression</div>
                          <div className="rtable-cell--content replay-link-content">
                            1096
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot sales-cell">
                          <div className="rtable-cell--heading">Sales</div>
                          <div className="rtable-cell--content earning-content">
                            1685
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot earning-cell">
                          <div className="rtable-cell--heading">Earning</div>
                          <div className="rtable-cell--content earning-content">
                            $31400
                          </div>
                        </div>
                      </div>
                      <div className="rtable-row">
                        <div className="rtable-cell topic-cell">
                          <div className="rtable-cell--content title-content d-flex align-items-center">
                            <img
                              className="topic-cell-img"
                              src="images/courses/html5.png"
                              alt=""
                              width={50}
                            />
                            <span className="topic-cell-span">
                              Advanced Course of HTML5
                            </span>
                          </div>
                        </div>
                        <div className="rtable-cell category-cell">
                          <div className="rtable-cell--heading">Category</div>
                          <div className="rtable-cell--content date-content">
                            Real use in real project
                          </div>
                        </div>
                        <div className="rtable-cell ranking-cell">
                          <div className="rtable-cell--heading">Ranking</div>
                          <div className="rtable-cell--content access-link-content d-flex align-items-center">
                            <span>
                              <i className="ri-star-s-line fs-16 me-5 text-warning" />
                            </span>
                            4.16
                          </div>
                        </div>
                        <div className="rtable-cell impression-cell">
                          <div className="rtable-cell--heading">Impression</div>
                          <div className="rtable-cell--content replay-link-content">
                            1156
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot sales-cell">
                          <div className="rtable-cell--heading">Sales</div>
                          <div className="rtable-cell--content earning-content">
                            3912
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot earning-cell">
                          <div className="rtable-cell--heading">Earning</div>
                          <div className="rtable-cell--content earning-content">
                            $1965
                          </div>
                        </div>
                      </div>
                      <div className="rtable-row">
                        <div className="rtable-cell topic-cell">
                          <div className="rtable-cell--content title-content d-flex align-items-center">
                            <img
                              className="topic-cell-img"
                              src="images/courses/jquery.png"
                              alt=""
                              width={50}
                            />
                            <span className="topic-cell-span">
                              Project Development using JQuery
                            </span>
                          </div>
                        </div>
                        <div className="rtable-cell category-cell">
                          <div className="rtable-cell--heading">Category</div>
                          <div className="rtable-cell--content date-content">
                            Implementation of JQuery
                          </div>
                        </div>
                        <div className="rtable-cell ranking-cell">
                          <div className="rtable-cell--heading">Ranking</div>
                          <div className="rtable-cell--content access-link-content d-flex align-items-center">
                            <span>
                              <i className="ri-star-s-line fs-16 me-5 text-warning" />
                            </span>
                            4.89
                          </div>
                        </div>
                        <div className="rtable-cell impression-cell">
                          <div className="rtable-cell--heading">Impression</div>
                          <div className="rtable-cell--content replay-link-content">
                            12369
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot sales-cell">
                          <div className="rtable-cell--heading">Sales</div>
                          <div className="rtable-cell--content earning-content">
                            5733
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot earning-cell">
                          <div className="rtable-cell--heading">Earning</div>
                          <div className="rtable-cell--content earning-content">
                            $4857
                          </div>
                        </div>
                      </div>
                      <div className="rtable-row">
                        <div className="rtable-cell topic-cell">
                          <div className="rtable-cell--content title-content d-flex align-items-center">
                            <img
                              className="topic-cell-img"
                              src="images/courses/laravel.png"
                              alt=""
                              width={50}
                            />
                            <span className="topic-cell-span">
                              Basic Learning of Laravel
                            </span>
                          </div>
                        </div>
                        <div className="rtable-cell category-cell">
                          <div className="rtable-cell--heading">Category</div>
                          <div className="rtable-cell--content date-content">
                            Start up with Laravel
                          </div>
                        </div>
                        <div className="rtable-cell ranking-cell">
                          <div className="rtable-cell--heading">Ranking</div>
                          <div className="rtable-cell--content access-link-content d-flex align-items-center">
                            <span>
                              <i className="ri-star-s-line fs-16 me-5 text-warning" />
                            </span>
                            4.18
                          </div>
                        </div>
                        <div className="rtable-cell impression-cell">
                          <div className="rtable-cell--heading">Impression</div>
                          <div className="rtable-cell--content replay-link-content">
                            12369
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot sales-cell">
                          <div className="rtable-cell--heading">Sales</div>
                          <div className="rtable-cell--content earning-content">
                            1800
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot earning-cell">
                          <div className="rtable-cell--heading">Earning</div>
                          <div className="rtable-cell--content earning-content">
                            $35280
                          </div>
                        </div>
                      </div>
                      <div className="rtable-row">
                        <div className="rtable-cell topic-cell">
                          <div className="rtable-cell--content title-content d-flex align-items-center">
                            <img
                              className="topic-cell-img"
                              src="images/courses/vue.png"
                              alt=""
                              width={50}
                            />
                            <span className="topic-cell-span">
                              Premium program of Vue
                            </span>
                          </div>
                        </div>
                        <div className="rtable-cell category-cell">
                          <div className="rtable-cell--heading">Category</div>
                          <div className="rtable-cell--content date-content">
                            Advanced course
                          </div>
                        </div>
                        <div className="rtable-cell ranking-cell">
                          <div className="rtable-cell--heading">Ranking</div>
                          <div className="rtable-cell--content access-link-content d-flex align-items-center">
                            <span>
                              <i className="ri-star-s-line fs-16 me-5 text-warning" />
                            </span>
                            4.32
                          </div>
                        </div>
                        <div className="rtable-cell impression-cell">
                          <div className="rtable-cell--heading">Impression</div>
                          <div className="rtable-cell--content replay-link-content">
                            12369
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot sales-cell">
                          <div className="rtable-cell--heading">Sales</div>
                          <div className="rtable-cell--content earning-content">
                            985
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot earning-cell">
                          <div className="rtable-cell--heading">Earning</div>
                          <div className="rtable-cell--content earning-content">
                            $35280
                          </div>
                        </div>
                      </div>
                      <div className="rtable-row">
                        <div className="rtable-cell topic-cell">
                          <div className="rtable-cell--content title-content d-flex align-items-center">
                            <img
                              className="topic-cell-img"
                              src="images/courses/sass.png"
                              alt=""
                              width={50}
                            />
                            <span className="topic-cell-span">
                              Project with SASS
                            </span>
                          </div>
                        </div>
                        <div className="rtable-cell category-cell">
                          <div className="rtable-cell--heading">Category</div>
                          <div className="rtable-cell--content date-content">
                            sass instead of css
                          </div>
                        </div>
                        <div className="rtable-cell ranking-cell">
                          <div className="rtable-cell--heading">Ranking</div>
                          <div className="rtable-cell--content access-link-content d-flex align-items-center">
                            <span>
                              <i className="ri-star-s-line fs-16 me-5 text-warning" />
                            </span>
                            4.06
                          </div>
                        </div>
                        <div className="rtable-cell impression-cell">
                          <div className="rtable-cell--heading">Impression</div>
                          <div className="rtable-cell--content replay-link-content">
                            12369
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot sales-cell">
                          <div className="rtable-cell--heading">Sales</div>
                          <div className="rtable-cell--content earning-content">
                            590
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot earning-cell">
                          <div className="rtable-cell--heading">Earning</div>
                          <div className="rtable-cell--content earning-content">
                            $35280
                          </div>
                        </div>
                      </div>
                      <div className="rtable-row">
                        <div className="rtable-cell topic-cell">
                          <div className="rtable-cell--content title-content d-flex align-items-center">
                            <img
                              className="topic-cell-img"
                              src="images/courses/bootstrap.png"
                              alt=""
                              width={50}
                            />
                            <span className="topic-cell-span">
                              Bootstrap Development
                            </span>
                          </div>
                        </div>
                        <div className="rtable-cell category-cell">
                          <div className="rtable-cell--heading">Category</div>
                          <div className="rtable-cell--content date-content">
                            Design
                          </div>
                        </div>
                        <div className="rtable-cell ranking-cell">
                          <div className="rtable-cell--heading">Ranking</div>
                          <div className="rtable-cell--content access-link-content d-flex align-items-center">
                            <span>
                              <i className="ri-star-s-line fs-16 me-5 text-warning" />
                            </span>
                            4.98
                          </div>
                        </div>
                        <div className="rtable-cell impression-cell">
                          <div className="rtable-cell--heading">Impression</div>
                          <div className="rtable-cell--content replay-link-content">
                            12369
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot sales-cell">
                          <div className="rtable-cell--heading">Sales</div>
                          <div className="rtable-cell--content earning-content">
                            2133
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot earning-cell">
                          <div className="rtable-cell--heading">Earning</div>
                          <div className="rtable-cell--content earning-content">
                            $35280
                          </div>
                        </div>
                      </div>
                      <div className="rtable-row">
                        <div className="rtable-cell topic-cell">
                          <div className="rtable-cell--content title-content d-flex align-items-center">
                            <img
                              className="topic-cell-img"
                              src="images/courses/bootstrap.png"
                              alt=""
                              width={50}
                            />
                            <span className="topic-cell-span">
                              Bootstrap Development
                            </span>
                          </div>
                        </div>
                        <div className="rtable-cell category-cell">
                          <div className="rtable-cell--heading">Category</div>
                          <div className="rtable-cell--content date-content">
                            Design
                          </div>
                        </div>
                        <div className="rtable-cell ranking-cell">
                          <div className="rtable-cell--heading">Ranking</div>
                          <div className="rtable-cell--content access-link-content d-flex align-items-center">
                            <span>
                              <i className="ri-star-s-line fs-16 me-5 text-warning" />
                            </span>
                            4.62
                          </div>
                        </div>
                        <div className="rtable-cell impression-cell">
                          <div className="rtable-cell--heading">Impression</div>
                          <div className="rtable-cell--content replay-link-content">
                            21563
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot sales-cell">
                          <div className="rtable-cell--heading">Sales</div>
                          <div className="rtable-cell--content earning-content">
                            1642
                          </div>
                        </div>
                        <div className="rtable-cell rtable-cell--foot earning-cell">
                          <div className="rtable-cell--heading">Earning</div>
                          <div className="rtable-cell--content earning-content">
                            $35280
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
