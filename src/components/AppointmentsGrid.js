import React, { useState } from "react";

const AppointmentsGrid = ({ appointmentsData, fetchAppointments }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Function to calculate the height of the appointment box based on time
  const hourConversion = {
    "8 AM": "1",
    "9 AM": "2",
    "10 AM": "3",
    "11 AM": "4",
    "12 PM": "5",
    "1 PM": "6",
    "2 PM": "7",
    "3 PM": "8",
    "4 PM": "9",
    "5 PM": "10",
    "6 PM": "11",
    "7 PM": "12",
    "8 PM": "13",
    "9 PM": "14",
    "10 PM": "15",
    "11 PM": "16",
  };
  const appointment = appointmentsData[Math.floor(Math.random() * 11)];

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleUnhover = () => {
    setIsHovered(false);
  };
  const imageStyles = {
    transition: "transform 0.2s ease-in-out",
    transform: isHovered ? "rotate(180deg)" : "rotate(0deg)",
  };
  const calculateHeight = (startTime, endTime) => {
    const startHour = parseInt(hourConversion[startTime]);
    const endHour = parseInt(hourConversion[endTime]);

    return (endHour - startHour) * 60; // Assuming each hour takes 100px height
  };

  return (
    <div className="appointments-container">
      <div className="column row">
        <div className="column-item">
          <div
            onClick={() => {
              fetchAppointments();
              handleUnhover();
              handleHover();
              if (isHovered) setIsHovered(false);
            }}
            style={{ cursor: "pointer" }}
          >
            <img
              // onMouseEnter={handleHover}
              // onMouseLeave={handleUnhover}
              src="/refresh-button.jpeg"
              alt="refresh"
              style={imageStyles}
            />
          </div>
        </div>
        <div className="column-item">Monday</div>
        <div className="column-item">Tuesday</div>
        <div className="column-item">Wednesday</div>
        <div className="column-item">Thrusday</div>
        <div className="column-item">Friday</div>
        <div className="column-item">Saturday</div>
        <div className="column-item">Sunday</div>
      </div>
      <div className="rows-content">
        <div className="">
          <div className="column-item">8 AM</div>
          <div className="column-item">9 AM</div>
          <div className="column-item">10 AM</div>
          <div className="column-item">11 AM</div>
          <div className="column-item">12 PM</div>
          <div className="column-item">1 PM</div>
          <div className="column-item">2 PM</div>
        
        </div>

        {[
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ].map((day) => {
          if (
            appointment &&
            appointment.weekDay ===
              [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ][Math.floor(Math.random() * 6)]
          ) {
            const { startTimeFormatted, endTimeFormatted } = appointment;
            const height = calculateHeight(
              startTimeFormatted,
              endTimeFormatted
            );
            return (
              <div
                key={day}
                className="column-item padding-top"
                style={{
                  cursor: "pointer",
                  width: "150px",
                  height: height ?? "10px",
                  backgroundColor: "#rgba(88, 195, 255, 0.93)",
                  border: "1px solid #58C3FFED",
                  background:
                    "linear-gradient(0deg, rgba(88, 195, 255, 0.93), rgba(88, 195, 255, 0.93)), linear-gradient(0deg, rgba(88, 195, 255, 0.41), rgba(88, 195, 255, 0.41))",
                  borderRadius: "8px",
                }}
              >
                <h1 style={{ fontSize: "11px" }} className="font">
                  {appointment.name}
                </h1>
                <p style={{ fontSize: "11px" }}>{appointment.reason}</p>
              </div>
            );
          }

          return <div key={day} className="column-item"></div>;
        })}
      </div>
    </div>
  );
};

export default AppointmentsGrid;
