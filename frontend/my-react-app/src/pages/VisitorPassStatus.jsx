import { useState } from "react";
import { checkVisitorStatus } from "../services/api";
import jsPDF from "jspdf";
import "./Form.css";

export default function VisitorPassStatus() {
  const [passKey, setPassKey] = useState("");
  const [data, setData] = useState(null);

  const checkStatus = async () => {
    if (!passKey) {
      alert("Enter pass key");
      return;
    }

    const res = await checkVisitorStatus(passKey);

    if (res.error) {
      alert(res.error);
      setData(null);
    } else {
      setData(res);
    }
  };

  const downloadPDF = () => {
    if (!data) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Visitor Pass", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Name: ${data.name}`, 20, 40);
    doc.text(`Block: ${data.block}`, 20, 50);
    doc.text(`Room: ${data.room}`, 20, 60);
    doc.text(`Purpose: ${data.purpose}`, 20, 70);
    doc.text(`Status: ${data.status}`, 20, 80);
    doc.text(`Date: ${data.visit_date}`, 20, 90);

    // Optional: add a unique ID / QR code
    doc.text(`Pass Key: ${passKey}`, 20, 100);

    doc.save(`VisitorPass_${passKey}.pdf`);
  };

  return (
    <div
      className="form-container"
      style={{ backgroundImage: "url(/3d.webp)" }}
    >
      <div className="form-overlay"></div>

      <div className="form-card">
        <h2>Check Visitor Pass</h2>

        <input
          placeholder="Enter Pass Key"
          value={passKey}
          onChange={(e) => setPassKey(e.target.value)}
        />

        <button onClick={checkStatus}>Check Status</button>

        {data && (
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <p><b>Name:</b> {data.name}</p>
            <p><b>Block:</b> {data.block}</p>
            <p><b>Room:</b> {data.room}</p>
            <p><b>Purpose:</b> {data.purpose}</p>
            <p><b>Status:</b> {data.status}</p>
            <p><b>Date:</b> {data.visit_date}</p>

            {data.status.toLowerCase() === "success" && (
              <button
                style={{
                  marginTop: "15px",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "white",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
                onClick={downloadPDF}
              >
                Download PDF Pass
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}