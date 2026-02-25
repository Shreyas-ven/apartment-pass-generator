import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getVisitors,
  approveVisitor,
  rejectVisitor,
  deleteVisitor,
  getApartment
} from "../services/api";
import "./Dashboard.css";

export default function ApartmentDashboard() {
  const { id } = useParams();

  const [visitors, setVisitors] = useState([]);
  const [filteredVisitors, setFilteredVisitors] = useState([]);
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchKey, setSearchKey] = useState("");

  // LOAD APARTMENT
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

  // LOAD VISITORS
  useEffect(() => {
    if (!apartment?.apartment_id) return;

    const loadVisitors = async () => {
      try {
        const data = await getVisitors(apartment.apartment_id);
        const visitorsArray = Array.isArray(data) ? data : [];
        setVisitors(visitorsArray);
        setFilteredVisitors(visitorsArray);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadVisitors();
  }, [apartment]);

  // SEARCH FUNCTION
  useEffect(() => {
    if (!searchKey) {
      setFilteredVisitors(visitors);
    } else {
      const filtered = visitors.filter(v =>
        v.pass_key?.toLowerCase().includes(searchKey.toLowerCase())
      );
      setFilteredVisitors(filtered);
    }
  }, [searchKey, visitors]);

  // REFRESH HELPER
  const refreshVisitors = async () => {
    const updated = await getVisitors(apartment.apartment_id);
    const visitorsArray = Array.isArray(updated) ? updated : [];
    setVisitors(visitorsArray);
    setFilteredVisitors(visitorsArray);
  };

  // ACTIONS
  const approve = async (visitorId) => {
    await approveVisitor(visitorId);
    refreshVisitors();
  };

  const reject = async (visitorId) => {
    await rejectVisitor(visitorId);
    refreshVisitors();
  };

  const remove = async (visitorId) => {
    const confirmDelete = window.confirm("Delete this visitor?");
    if (!confirmDelete) return;

    await deleteVisitor(visitorId);
    refreshVisitors();
  };

  if (!apartment) return <h2 className="center">Loading apartment...</h2>;

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="header">
        <h1>🏢 Apartment Dashboard</h1>
        <p>Manage your visitor approvals</p>
      </div>

      {/* SEARCH BAR */}
      <div className="profile-card">
        <input
          type="text"
          placeholder="Search by Pass Key..."
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 15px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            marginBottom: "20px"
          }}
        />
      </div>

      {/* PROFILE CARD */}
      <div className="profile-card">
        <h2>Apartment Profile</h2>
        <div className="profile-grid">
          <div><span>Name : </span><b>{apartment.apartment_name}</b></div>
          <div><span>Email : </span><b>{apartment.email}</b></div>
          <div><span>ID : </span><b>{apartment.apartment_id}</b></div>
        </div>
      </div>

      {/* VISITOR LIST */}
      <h2 className="visitor-title">Visitor Requests</h2>

      {loading ? (
        <p className="center">Loading visitors...</p>
      ) : filteredVisitors.length === 0 ? (
        <div className="empty-box">No visitors found 🚫</div>
      ) : (
        <div className="visitor-list">
          {filteredVisitors.map(v => (
            <div key={v._id} className="visitor-card">

              <div className="visitor-main">
                <h3>{v.name}</h3>
                <p>📍 Room {v.room} • Block {v.block}</p>
                <p>📞 {v.phone}</p>
                <p>📅 {v.visit_date || "Not Provided"}</p>
                <p>🎯 {v.purpose}</p>
                <p>🔑 Pass Key: {v.pass_key}</p>
              </div>

              <div className="visitor-footer">
                <span
                  className={
                    v.status === "Pending"
                      ? "status pending"
                      : v.status === "Rejected"
                      ? "status rejected"
                      : "status success"
                  }
                >
                  {v.status}
                </span>

                <div className="action-buttons">
                  {v.status === "Pending" && (
                    <>
                      <button
                        className="approve"
                        onClick={() => approve(v._id)}
                      >
                        Approve
                      </button>

                      <button
                        className="reject"
                        onClick={() => reject(v._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  <button
                    className="delete"
                    onClick={() => remove(v._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}