import React from "react";
import styled from "styled-components";
import profile from "../../assets/svg/profile.svg";

function Profile() {
  return (
    <ProfileContainer>
      <ProfileBox>
        <ContentBox>
          <p>
            <strong>Name: </strong>Tushar Deepak
          </p>
          <p>
            <strong>Roll: </strong>1805449
          </p>
          <p>
            <strong>Github: </strong>Tushar Deepak
          </p>
          <p>
            <strong>Skills: </strong>React, Javascript, Css
          </p>
          <p>
            <strong>Projects: </strong>
          </p>
          <p>
            1)<strong>Slogger</strong>All in one progressive web app for
            managing personal work and teams. A modern scheduler is also
            provided for planning future tasks. It has a team management system
            through which you can make our own teams or join others teams, with
            one click video meetings. Also has a discussion area where you can
            discuss your task with other colleagues.
          </p>
          <p>
            2)<strong>Netflix Clone </strong>A clone of original Netflix, with
            authentication, authorization, separate list every individual.
          </p>
        </ContentBox>
        <img src={profile} className="profilePic" />
      </ProfileBox>
    </ProfileContainer>
  );
}

export default Profile;

const ProfileContainer = styled.div`
  flex: 1;
  height: 100vh;
  padding-left: 35px;
  padding-top: 35px;
  background-color: #e5e5e5;
`;

const ProfileBox = styled.div`
  margin-top: 70px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 73.688vw;
  min-height: 400px;
  height: auto;
  padding: 20px;
  @media (max-width: 1000px) {
    flex-direction: column;
  }

  .profilePic {
    flex: 0.3;
    object-fit: contain;
    height: 220px;
    width: 220px;
    transform: scaleX(-1) rotate(10deg);
    @media (max-width: 1000px) {
      flex: 1;
    }
  }
`;

const ContentBox = styled.div`
  flex: 0.5;
  @media (max-width: 1000px) {
    flex: 1;
  }
  p {
    margin: 10px;
  }
`;
