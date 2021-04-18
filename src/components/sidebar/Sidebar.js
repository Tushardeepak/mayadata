import React, { useState } from "react";
import styled from "styled-components";
import menuImg from "../../assets/svg/menu.svg";
import homeImg from "../../assets/svg/home.svg";
import faceImg from "../../assets/svg/face.svg";
import { useHistory } from "react-router";

function Sidebar() {
  const history = useHistory();
  const [smallSidebar, setSmallSidebar] = useState(false);
  return (
    <SidebarContainer smallSidebar={smallSidebar}>
      <SidebarRollNumber
        smallSidebar={smallSidebar}
        onClick={() => setSmallSidebar(!smallSidebar)}
      >
        <img src={menuImg} className="menuImage" />

        <p className="rollNumber">1805449</p>
      </SidebarRollNumber>
      <SidebarNavHomeBox
        smallSidebar={smallSidebar}
        onClick={() => history.push("/")}
      >
        <img src={homeImg} />
        <p className="home">Home</p>
      </SidebarNavHomeBox>
      <SidebarNavAboutBox
        smallSidebar={smallSidebar}
        onClick={() => history.push("/profile")}
      >
        <img src={faceImg} />
        <p className="about">About</p>
      </SidebarNavAboutBox>
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  background-color: #1e5f74;
  height: 100vh;
  width: ${(props) => (props.smallSidebar ? "3.698vw" : "15.625vw")};
  padding-top: 48px;
  min-width: 50px;
  overflow: hidden;
  transition: all 0.4s ease-in-out;
  margin-right: ${(props) => (props.smallSidebar ? "7vw" : "0")};

  @media (max-width: 800px) {
    width: 3.698vw;
  }
`;

const SidebarRollNumber = styled.div`
  display: flex;
  align-items: center;
  padding-left: ${(props) => (props.smallSidebar ? "10px" : "21px")};
  margin-bottom: 71px;
  cursor: pointer;
  @media (max-width: 800px) {
    padding-left: 10px;
  }

  .rollNumber {
    color: #fff;
    margin-left: 25px;
    text-align: center;
    transition: all 0.4s ease-in-out;
    opacity: ${(props) => (props.smallSidebar ? "0" : "1")};
    @media (max-width: 800px) {
      opacity: 0;
    }
  }
`;

const SidebarNavHomeBox = styled.div`
  width: 100%;
  height: 65px;
  padding-left: ${(props) => (props.smallSidebar ? "10px" : "21px")};
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  &:hover {
    background-color: #133b5c;
  }
  @media (max-width: 800px) {
    padding-left: 10px;
  }

  .home {
    margin-left: 10px;
    color: #fff;
    transition: all 0.2s ease-in-out;
    opacity: ${(props) => (props.smallSidebar ? "0" : "1")};
    @media (max-width: 800px) {
      opacity: 0;
    }
  }
`;

const SidebarNavAboutBox = styled.div`
  width: 100%;
  height: 65px;
  padding-left: ${(props) => (props.smallSidebar ? "10px" : "21px")};
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #133b5c;
  }
  @media (max-width: 800px) {
    padding-left: 10px;
  }

  .about {
    margin-left: 10px;
    color: #fff;
    transition: all 0.2s ease-in-out;
    opacity: ${(props) => (props.smallSidebar ? "0" : "1")};
    @media (max-width: 800px) {
      opacity: 0;
    }
  }
`;
