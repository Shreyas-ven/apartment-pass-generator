export default function ApartmentPass() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>Apartment Pass</h2>
      <p>Your registration status and visitor pass will appear here.</p>

      <button onClick={() => window.print()}>
        Download Pass
      </button>
    </div>
  );
}
