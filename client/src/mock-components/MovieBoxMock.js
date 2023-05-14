import React from "react";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";

function MovieBoxMock() {
  return (
    <Link className="text-reset" to="/video-mock">
      <div className="movie-box flow-font w-100">
        <div className="movie-box-poster-holder">
          <BsPlayCircle
            className="play-icon text-white z-index-20"
            size="2.5rem"
          />
          <div
            className="movie-box-poster"
            style={{ backgroundImage: `url(/movie-mock.png)` }}
          ></div>
        </div>

        <h6 className="mb-1 title flow-font">Lorem Ipsum</h6>
        <div className="d-flex align-items-center info">
          <p className="small my-1 text-muted me-3">2023</p>
          <div className="d-flex align-items-center">
            <AiFillStar className="text-warning" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieBoxMock;
