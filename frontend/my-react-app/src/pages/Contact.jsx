import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1>Contact Us</h1>
        <p className="contact-subtitle">
          Have questions or need assistance? Reach out to us.
        </p>

        <div className="contact-item">
          <label>Email</label>
          <span>support@apartmentpass.com</span>
        </div>

        <div className="contact-item">
          <label>Phone</label>
          <span>+91 98765 43210</span>
        </div>

        <div className="contact-item">
          <label>Office Hours</label>
          <span>Monday – Saturday • 9:00 AM – 6:00 PM</span>
        </div>

        <div className="contact-item">
          <label>Address</label>
          <span>Bangalore, Karnataka, India</span>
        </div>
      </div>
    </div>
  );
}