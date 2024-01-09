import { useAuthContext } from "../utility-hooks/useAuthContext";
import { useState, useEffect } from "react";
import AppointmentsGrid from "../components/AppointmentsGrid";
import axios from "axios";

const Appointments = () => {
  const { user } = useAuthContext();
  const [appointments, setAppointments] = useState("");
  axios.defaults.baseURL = "https://hiring-test-task.vercel.app/api/";

  const fetchAppointments = async () => {
    try {
      const appointmentsResponse = await axios.get("appointments");
      setAppointments(appointmentsResponse.data);
    } catch (e) {
      console.log("Error", e);
    }
  };

  let appointmentsArray = [];
  useEffect(() => {
    if (appointmentsArray?.length === 0) fetchAppointments();
  }, [appointmentsArray?.length]);

  appointmentsArray = appointments
    ? Object.entries(appointments)
        .filter(([_, value]) => typeof value === "object")
        .map(([_, value]) => value)
    : [];

  return (
    // <section className="appointments" style={{ border: "2px solid red" }}>
    <AppointmentsGrid
      appointmentsData={appointmentsArray}
      fetchAppointments={fetchAppointments}
    />
    // </section>
  );
};

export default Appointments;
