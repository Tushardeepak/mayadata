import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import searchImg from "../../assets/svg/search.svg";
import deleteImg from "../../assets/svg/delete.svg";
import clearImg from "../../assets/svg/clear.svg";
import PuffLoader from "react-spinners/PuffLoader";
function Home() {
  const [search, setSearch] = useState("");
  const [searchStartTime, setSearchStartTime] = useState("");
  const [searchEndTime, setSearchEndTime] = useState("");
  const [text, setText] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [meetingList, setMeetingList] = useState([]);

  const getList = () => {
    setLoader(true);
    axios
      .get("https://mayadatabackend.herokuapp.com/")
      .then((list) => {
        console.log(list);
        setMeetingList(list.data.reverse());
      })
      .then(() => setLoader(false))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getList();
  }, []);

  const handleSubmit = () => {
    if (
      text !== "" &&
      date !== "" &&
      number !== "" &&
      startTime !== "" &&
      endTime !== ""
    ) {
      setLoader(true);
      axios
        .post(
          `https://mayadatabackend.herokuapp.com/add?name=${text}&people=${number}&date=${date}&startTime=${startTime}&endTime=${endTime}`
        )
        .then(() => console.log("success"))
        .then(() => getList())
        .then(() => setLoader(false))
        .catch((err) => console.log(err));

      setText("");
      setDate("");
      setNumber("");
      setStartTime("");
      setEndTime("");
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 5000);
    }
  };

  const handleDelete = (id) => {
    setLoader(true);
    axios
      .delete(`https://mayadatabackend.herokuapp.com/${id}`)
      .then(() => console.log("deleted"))
      .then(() => getList())
      .then(() => setLoader(false))
      .catch((err) => console.log(err));
  };
  var count = 1;
  return (
    <HomeContainer>
      <div style={{ display: "flex" }}>
        <p className="heading">My Meetings</p>
        <PuffLoader loading={loader} size={30} />
      </div>
      <FilterContainer>
        <InputField>
          <img src={searchImg} />
          <input
            type="text"
            className="searchInputBox"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputField>
        <InputField>
          <p className="inputLabel">From:</p>
          <input
            type="date"
            className="searchInputBox"
            placeholder="Search"
            value={searchStartTime}
            onChange={(e) => setSearchStartTime(e.target.value)}
          />
        </InputField>
        <InputField>
          <p className="inputLabel">To:</p>
          <input
            type="date"
            className="searchInputBox"
            placeholder="Search"
            value={searchEndTime}
            onChange={(e) => setSearchEndTime(e.target.value)}
          />
        </InputField>
        <div style={{ flex: 1 }}></div>
        {search !== "" || searchStartTime !== "" || searchEndTime !== "" ? (
          <img
            style={{ marginRight: "20px", cursor: "pointer" }}
            src={clearImg}
            onClick={() => {
              setSearch("");
              setSearchStartTime("");
              setSearchEndTime("");
            }}
          />
        ) : (
          ""
        )}
      </FilterContainer>
      <TableContainer>
        <TableBox>
          <Table>
            <TableRowHeader>
              <TableHead>Sl. no.</TableHead>
              <TableHead>Meeting name</TableHead>
              <TableHead>No of People attending</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Start time</TableHead>
              <TableHead>End time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRowHeader>
            <TableBody>
              {meetingList
                .filter((list) => {
                  if (search === "") {
                    return list;
                  } else if (
                    list.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return list;
                  }
                })
                .filter((list) => {
                  if (searchStartTime === "") {
                    return list;
                  } else if (
                    new Date(list.date).getTime() + 86400000 >
                    new Date(searchStartTime).getTime()
                  ) {
                    return list;
                  }
                })
                .filter((list) => {
                  if (searchEndTime === "") {
                    return list;
                  } else if (
                    new Date(list.date).getTime() - 86400000 <
                    new Date(searchEndTime).getTime()
                  ) {
                    return list;
                  }
                })
                .map((meeting) => (
                  <>
                    <TableRow key={meeting._id}>
                      <TableData style={{ textAlign: "start" }}>
                        {count++}
                      </TableData>
                      <TableData>{meeting.name}</TableData>
                      <TableData>{meeting.people}</TableData>
                      <TableData>{meeting.date}</TableData>
                      <TableData>{meeting.startTime}</TableData>
                      <TableData>{meeting.endTime}</TableData>
                      <TableData>
                        <img
                          className="delete"
                          src={deleteImg}
                          onClick={() => handleDelete(meeting._id)}
                        />
                      </TableData>
                    </TableRow>
                    <hr className="line" />
                  </>
                ))}
            </TableBody>
          </Table>
        </TableBox>
        <InputTableBox>
          <div className="space">
            {error && (
              <p
                style={{ fontSize: "12px", color: "red", paddingLeft: "30px" }}
              >
                Fill all fields*
              </p>
            )}
          </div>
          <input
            type="text"
            className="inputArea"
            placeholder="Name"
            value={text}
            onChange={(e) => {
              setError(false);
              setText(e.target.value);
            }}
          />
          <input
            type="number"
            className="inputArea"
            placeholder="No. of people"
            value={number}
            onChange={(e) => {
              setError(false);
              setNumber(e.target.value);
            }}
          />
          <input
            type="date"
            className="inputArea"
            value={date}
            onChange={(e) => {
              setError(false);
              setDate(e.target.value);
            }}
          />
          <input
            type="time"
            className="inputArea"
            value={startTime}
            onChange={(e) => {
              setError(false);
              setStartTime(e.target.value);
            }}
          />
          <input
            type="time"
            className="inputArea"
            value={endTime}
            onChange={(e) => {
              setError(false);
              setEndTime(e.target.value);
            }}
          />
          <button className="inputArea submitBtn" onClick={handleSubmit}>
            Add
          </button>
        </InputTableBox>
      </TableContainer>
    </HomeContainer>
  );
}

export default Home;

const HomeContainer = styled.div`
  flex: 1;
  height: 100vh;
  padding-left: 35px;
  padding-top: 35px;
  background-color: #e5e5e5;

  .heading {
    font-weight: 200px;
    font-size: clamp(20px, 2.5vw, 38px);
    margin-bottom: 50px;
    margin-right: 20px;
  }
`;

const FilterContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  display: flex;
  align-items: center;
  width: 76.688vw;
  min-height: 80px;
  height: auto;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const InputField = styled.div`
  width: clamp(100px, 14vw, 200px);
  height: auto;
  display: flex;
  align-items: center;
  margin-left: 30px;
  border-bottom: 2px solid #000;
  @media (max-width: 600px) {
    width: 90%;
    margin: 20px;
  }

  .searchInputBox {
    outline: none;
    border: none;
    color: #000;
    flex: 1;
    margin-left: 10px;
  }
  .searchInputBox::placeholder {
    font-weight: 500;
    color: #000;
  }
`;

const TableContainer = styled.div`
  margin-top: 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  width: 76.688vw;
  height: 350px;
  position: relative;
`;

const TableBox = styled.table`
  width: 100%;
  margin: 20px;
  margin-left: 30px;
`;

const Table = styled.table`
  width: 100%;
`;

const TableRowHeader = styled.tr`
  height: 40px;
  margin-top: 20px;
  position: absolute;
  display: flex;
  width: 94%;
`;

const TableRow = styled.tr`
  height: 40px;
  display: flex;
  width: 100%;
`;

const TableHead = styled.th`
  padding: 10px 0px;
  padding-right: 25px;
  flex: 0.2;
  text-align: start;
  font-size: 12px;
  color: #1e5f74;
`;

const TableBody = styled.div`
  margin-top: 70px;
  width: 96%;
  margin-bottom: 50px;
  min-height: 215px;
  height: auto;
  max-height: 215px;
  overflow-y: scroll;

  .line {
    background-color: lightgray;
    border: none;
    width: 93%;
    height: 1px;
  }
`;

const TableData = styled.td`
  padding: 10px 0px;
  flex: 0.2;
  text-align: start;
  font-size: 12px;
  color: #000;

  .delete {
    cursor: pointer;
    transform: scale(0.9);
    transition: all 0.2s ease-in-out;
  }
  .delete:hover {
    transform: scale(1);
  }
`;

const InputTableBox = styled.div`
  position: absolute;
  z-index: 1000;
  bottom: 20px;
  left: -40px;
  height: 20px;
  width: 100%;
  display: flex;
  justify-content: space-evenly;

  .inputArea {
    width: 120px;
    outline: none;
    border: none;
    border-bottom: 2px solid #000;
    font-size: 12px;
  }
  .inputArea::placeholder {
    font-size: 12px;
  }
  .space {
    width: 120px !important;
  }

  .submitBtn {
    width: 50px !important;
    margin-left: 0px !important;
    margin-right: 50px !important;
    margin-bottom: 5px;
    border: none;
    background-color: #1e5f74;
    height: 20px;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  .submitBtn:hover {
    background-color: #2f9dc2;
  }
`;
