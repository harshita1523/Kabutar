import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiLoader,
  FiMail,
  FiSend,
  FiUpload,
  FiXCircle,
} from "react-icons/fi";
import { sendEmail } from "../services/api";
import { createSocket } from "../services/socket";

const EmailSenderForm = () => {
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState("");
  const [template, setTemplate] = useState("");
  const [updates, setUpdates] = useState([]);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !subject || !template || !socket?.id) {
      alert("Please complete all fields and ensure socket is connected.");
      return;
    }

    const formData = new FormData();
    formData.append("excel", file);
    formData.append("subject", subject);
    formData.append("template", template);
    formData.append("socketId", socket.id);

    setLoading(true);
    setUpdates([]);
    try {
      sendEmail(formData);
    } catch (error) {
      console.error(error);
      alert("Failed to send emails.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const socketInstance = createSocket();
    setSocket(socketInstance);

    socketInstance.on("email-status", (data) => {
      setUpdates((prev) => [...prev, data]);
    });

    return () => {
      socketInstance.off("email-status");
      socketInstance.disconnect();
    };
  }, []);

  return (
    <div className="email-wrapper">
      <div className="email-container">
        <h1 className="email-heading">
          <FiMail /> Mail Pilot
        </h1>
        <p className="email-subheading">
          ✈️ Your bulk emails, now faster and smoother than ever.
        </p>

        <form onSubmit={handleSubmit} className="email-form">
          <div className="form-group">
            <label className="form-label">
              <FiUpload /> Upload Excel File
            </label>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={(e) => setFile(e.target.files[0])}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="form-input"
              placeholder="Enter email subject"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Template</label>
            <textarea
              rows={8}
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="form-input"
              placeholder="Hi {{name}}, welcome to {{company}}!"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`submit-button ${loading ? "disabled" : ""}`}
          >
            {loading ? <FiLoader className="spin" /> : <FiSend />}
            {loading ? "Sending..." : "Send Emails"}
          </button>
        </form>

        {updates.length > 0 && (
          <div className="results">
            <h3 className="results-heading">
              <FiMail /> Email Send Results
            </h3>
            <ul className="results-list">
              {updates.map((r, i) => (
                <li
                  key={i}
                  className={`result-item ${
                    r.status === "success" ? "success" : "failed"
                  }`}
                >
                  <span className="result-index">{i + 1}.</span>
                  {r.status === "success" ? <FiCheckCircle /> : <FiXCircle />}
                  <div className="result-content">
                    <span className="result-email">{r.email}</span>
                    {r.status === "failed" && (
                      <span className="result-error">Error: {r.error}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailSenderForm;
