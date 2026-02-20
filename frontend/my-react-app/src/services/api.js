const API = "http://127.0.0.1:5000";

export const apartmentRegister = async (data) => {
  const res = await fetch(`${API}/apartment/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const apartmentLogin = async (data) => {
  const res = await fetch(`${API}/apartment/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const visitorLogin = async (data) => {
  const res = await fetch(`${API}/visitor/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const checkVisitorStatus = async (passKey) => {
  const res = await fetch(`${API}/visitor/status/${passKey}`);
  return res.json();
};

export const approveVisitor = async (id) => {
  const res = await fetch(`${API}/visitor/approve/${id}`, {
    method: "PUT",
  });
  return res.json();
};

export const getVisitors = async (apartment_id) => {
  const res = await fetch(`${API}/visitors/${apartment_id}`);
  return res.json();
};

export const getApartment = async (id) => {
  const res = await fetch(`${API}/apartment/${id}`);
  return res.json();
};