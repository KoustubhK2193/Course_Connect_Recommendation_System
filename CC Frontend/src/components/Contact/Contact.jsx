import NavbarEg from "../Homeeg/NavbarEg";
import "./Contact.css";
import Tick from "./tickmark.gif";
import { useState } from "react";
import contact_img from "./contact.svg";
import emailjs from "@emailjs/browser";
import bgVdo from "./bg_vdo3.mp4";

const Contact = () => {
  const [userName, setUserName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userNo, setUserNo] = useState("");
  const [userMsg, setUserMsg] = useState("");

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };
  const handleMailChange = (e) => {
    setUserMail(e.target.value);
  };
  const handleNumberChange = (e) => {
    setUserNo(e.target.value);
  };
  const handleMsgChange = (e) => {
    setUserMsg(e.target.value);
  };

  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setSent(false);
    }, 2500);

    var templateParams = {
      name: userName,
      mail: userMail,
      number: userNo,
      message: userMsg,
    };

    emailjs
      .send(
        service_id,
        template_id,
        templateParams,
        public_key
      )
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
        },
        function (error) {
          console.log("FAILED...", error);
        }
      );
    setUserName("");
    setUserMail("");
    setUserNo("");
    setUserMsg("");
  };

  return (
    <div className="contact-wrapper">
      <NavbarEg />

      {sent ? (
        <div className="thanks-msg fade-effect">
          <p>
            Thank You for reaching us !{" "}
            <span>
              <img src={Tick} alt=".." />
            </span>
          </p>
        </div>
      ) : null}

      <div className="background">
        <video autoPlay loop muted className="background-video">
          <source src={bgVdo} type="video/mp4" />
        </video>
        <div className="container">
          <div className="screen">
            <div className="screen-header">
              <div className="screen-header-left">
                <div className="screen-header-button close" />
                <div className="screen-header-button maximize" />
                <div className="screen-header-button minimize" />
              </div>
              <div className="screen-header-right">
                <div className="screen-header-ellipsis" />
                <div className="screen-header-ellipsis" />
                <div className="screen-header-ellipsis" />
              </div>
            </div>
            <div className="screen-body">
              <div className="screen-body-item left">
                <div className="app-title">
                  <span>CONTACT</span>
                  <span>US</span>
                </div>
              </div>
              <div className="screen-body-item">
                <div className="app-form">
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      name="userName"
                      placeholder="NAME"
                      value={userName}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      name="userMail"
                      placeholder="EMAIL"
                      value={userMail}
                      onChange={handleMailChange}
                    />
                  </div>
                  <div className="app-form-group">
                    <input
                      className="app-form-control"
                      name="userNo"
                      placeholder="CONTACT NO"
                      value={userNo}
                      onChange={handleNumberChange}
                    />
                  </div>
                  <div className="app-form-group message">
                    <input
                      className="app-form-control"
                      name="userMsg"
                      placeholder="MESSAGE"
                      value={userMsg}
                      onChange={handleMsgChange}
                    />
                  </div>
                  <div className="app-form-group buttons">
                    <button className="app-form-button">CANCEL | </button>
                    <button className="app-form-button" onClick={handleSend}>
                      | SEND
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="contact_tail"
          style={{
            position: "fixed",
            bottom: "0px",
            color: "white",
            fontWeight: "600",
          }}
        >
          <p
            className="homeeg-copyright"
            style={{ color: "black", width: "100vw" }}
          >
            Copyright © Group 8 | 2023 All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
