import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVisitors, approveVisitor, getApartment } from "../services/api";
import "./Dashboard.css";

export default function ApartmentDashboard() {
  const { id } = useParams();

  const [visitors, setVisitors] = useState([]);
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApartment = async () => {
      try {
        const data = await getApartment(id);
        setApartment(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadApartment();
  }, [id]);

  useEffect(() => {
    if (!apartment?.apartment_id) return;

    const loadVisitors = async () => {
      try {
        const data = await getVisitors(apartment.apartment_id);
        setVisitors(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadVisitors();
  }, [apartment]);

  const approve = async (visitorId) => {
    await approveVisitor(visitorId);
    const updated = await getVisitors(apartment.apartment_id);
    setVisitors(updated);
  };

  if (!apartment) return <h2 className="center">Loading apartment...</h2>;

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="header">
        <h1>🏢 Apartment Dashboard</h1>
        <p>Manage your visitor approvals</p>
      </div>

      {/* PROFILE CARD */}
      <div className="profile-card">
        <h2>Apartment Profile</h2>
        <div className="profile-grid">
          <div><span>Name</span><b>{apartment.apartment_name}</b></div>
          <div><span>Email</span><b>{apartment.email}</b></div>
          <div><span>ID</span><b>{apartment.apartment_id}</b></div>
        </div>
      </div>

      {/* VISITOR LIST */}
      <h2 className="visitor-title">Visitor Requests</h2>

      {loading ? (
        <p className="center">Loading visitors...</p>
      ) : visitors.length === 0 ? (
        <div className="empty-box">No visitors yet 🚫</div>
      ) : (
        <div className="visitor-list">
          {visitors.map(v => (
            <div key={v._id} className="visitor-card">

              <div className="visitor-main">
                <h3>{v.name}</h3>
                <p>Room {v.room} • Block {v.block}</p>
              </div>

              <p className="purpose">{v.purpose}</p>

              <div className="visitor-footer">
                <span className={
                  v.status === "Pending"
                    ? "status pending"
                    : "status success"
                }>
                  {v.status}
                </span>

                {v.status === "Pending" && (
                  <button onClick={() => approve(v._id)}>
                    Approve
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}