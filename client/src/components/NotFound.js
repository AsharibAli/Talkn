import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { appSettings } from "../helpers/settings";

function NotFound() {
  useEffect(() => {
    document.title = `${appSettings.brandName} | Not Found`;
  }, []);

  return (
    <>
      <div className="row py-5 gy-5 text-center">
        <div className="col-lg-8 mx-auto pt-5">
          <div data-aos="fade-up">
            <img
              src="/not-found.svg"
              alt="Fox"
              className="img-fluid w-100 my-5 pt-5"
              style={{ maxWidth: "550px" }}
            />
          </div>

          <h1 data-aos="fade-up" data-aos-delay="100" className="text-xl">
            Sorry, The Page Can’t be Found.
          </h1>
          <p
            className="text-muted lead"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            You didn't breake the internet, but we can't find what you are
            looking for.
          </p>
          <Link className="btn btn-primary py-2" to="/">
            Return Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
