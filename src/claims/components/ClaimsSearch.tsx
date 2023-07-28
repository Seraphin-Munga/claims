import React from "react";

const ClaimsSearch: React.FC<any> = () => {
  return (
    <>
      <div className="card card-user">
        <div className="card-header">
          <h5 className="card-title">Apply filter</h5>
        </div>
        <div className="card-body">
          <form>
            <div className="row">
              <div className="col-md-5 pr-1">
                <div className="form-group">
                  <label>Search</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                  />
                </div>
              </div>
              <div className="col-md-3 px-1">
                <div className="form-group">
                  <label>Scheme</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Scheme"
                  />
                </div>
              </div>
              <div className="col-md-4 pl-1">
                <div className="form-group">
                  <label>Payment Status</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Payment Status"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 pr-1">
                <div className="form-group">
                  <label>Start-date</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Start-date"
                  />
                </div>
              </div>
              <div className="col-md-6 pl-1">
                <div className="form-group">
                  <label>End-date</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder="End-date"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="update ml-auto mr-auto">
                <button type="submit" className="btn btn-primary btn-round">
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClaimsSearch;
