import { useState } from "react";
import { checkStatus } from "../services/api";

export default function CheckStatus() {
  const [key,setKey]=useState("");
  const [data,setData]=useState(null);

  const search=async()=>{
    const res=await checkStatus(key);
    setData(res);
  };

  return(
    <div className="form-container">
      <div className="form-card">
        <h2>Check Visitor Status</h2>

        <input placeholder="Enter Pass Key" onChange={e=>setKey(e.target.value)} />
        <button onClick={search}>Check</button>

        {data && (
          <div>
            <p>Name: {data.name}</p>
            <p>Room: {data.room}</p>
            <p>Status: {data.status}</p>
          </div>
        )}
      </div>
    </div>
  );
}