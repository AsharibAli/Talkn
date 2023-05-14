import React, { useState, useEffect } from "react";
import { appSettings } from "../../helpers/settings";

function ViewOnlyAlert() {
  const [viewport, setViewport] = useState("desktop");
  useEffect(() => {
    function checkWindowViewport() {
      if (window.outerWidth > 991) {
        setViewport("desktop");
      } else {
        setViewport("mobile");
      }
    }
    window.addEventListener("resize", checkWindowViewport());
    // CLEANUP
    return () => {
      window.removeEventListener("resize", checkWindowViewport());
    };
  }, []);

  return (
    <div className="viewonly-mode">
      <div className="container">
        <div className="card bg-gray-800 mb-0">
          <div
            className={`card-body ${viewport === "desktop" ? "p-4" : "p-3"}`}
          >
            {viewport === "desktop" ? (
              <div className="d-flex align-items-center">
                <img
                  src="/metamask.png"
                  alt="Metamask"
                  className="flex-shrink-0"
                  width="40"
                />
                <div className="ms-3">
                  <h5 className="mb-0">
                    You're on view only mode, please install{" "}
                    <span className="text-primary">MetaMask Wallet</span>
                  </h5>
                  <p className="text-muted mb-0">
                    We notice that there's no MataMask wallet installed, please
                    install it and connect to{" "}
                    <span className="text-primary fw-bold">
                      {appSettings.activeNetworkName}
                    </span>{" "}
                    and reload the app
                  </p>
                </div>
                <div className="ms-auto">
                  <a
                    href="https://metamask.io/download/"
                    className="btn btn-primary text-nowrap py-1"
                    rel="noreferrer"
                    target="_blank noopener"
                  >
                    Get MetaMask
                  </a>
                </div>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <img
                  src="/metamask.png"
                  alt="Metamask"
                  className="flex-shrink-0"
                  width="40"
                />
                <div className="ms-3">
                  <h6 className="mb-2">Open in MetaMask App</h6>
                  <p className="text-muted mb-0 small">
                    To make this app run on full functionality, open it on
                    MetaMask app
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOnlyAlert;
