import axios from "axios";
import React, { useEffect, useState } from "react";

export const Player = () => {
  const [playerData, setPlayerData] = useState("");
  const getData = async () => {
    const { data } = await axios.get(
      `https://api.npoint.io/20c1afef1661881ddc9c/`
    );
    setPlayerData(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const formatAMPM = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours %= 12;
    hours = hours || 12;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    const strTime = `${hours}:${minutes} ${ampm}`;

    return strTime;
  };

  const dateFormat = (date) => {
    date = new Date(date);
    var dateStr =
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + date.getDate()).slice(-2) +
      "-" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2) +
      " " +
      formatAMPM(date);
    return dateStr;
  };

  return (
    <div>
      {playerData &&
        playerData.playerList.map((player) => {
          return (
            <>
              <div className="row">
                <div className="col">
                  <div className="card">
                    <div className="card-body">
                      <div>Full Name : {player.PFName}</div>
                      <div>Skills : {player.SkillDesc}</div>
                      <div>Value : ${player.Value}</div>
                      {player.UpComingMatchesList.map((match) => {
                        return (
                          <div>
                            CCode : {match.CCode}
                            <br />
                            VsCCode:{match.VsCCode}
                            <br />
                            Upcoming Match :{" "}
                            {match.MDate ? dateFormat(match.MDate) : "NA"}
                            {}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <br />
            </>
          );
        })}
    </div>
  );
};
