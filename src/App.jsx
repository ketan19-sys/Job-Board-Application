import { useState } from "react";
import "./App.css";
import Auth from "./components/Auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [appliedJobs, setAppliedJobs] = useState([]);

  const jobs = [
    {
      title: "MERN Stack Developer",
      company: "Tech Solutions",
      location: "Mumbai",
      tags: ["Full-time", "Remote"],
    },
    {
      title: "Frontend Developer",
      company: "Creative Studio",
      location: "Pune",
      tags: ["Internship", "On-site"],
    },
    {
      title: "Backend Developer",
      company: "CloudX",
      location: "Bangalore",
      tags: ["Full-time", "Hybrid"],
    },
  ];

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleApply = async (title) => {
    try {
      await fetch("http://localhost:5000/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobTitle: title }),
      });

      setAppliedJobs([...appliedJobs, title]);
      alert(`Applied for ${title}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isLoggedIn) {
    return <Auth onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <>
      <div className="navbar">
        <h1>JobFinder</h1>
        <button onClick={() => setIsLoggedIn(false)}>Logout</button>
      </div>

      <div className="hero">
        <h2>Find Your Dream Job 🚀</h2>
        <p>Browse thousands of job listings</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search jobs..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="jobs">
        {filteredJobs.map((job, index) => (
          <div key={index} className="job-card">
            <h3>{job.title}</h3>
            <p>{job.company}</p>
            <p>{job.location}</p>

            {job.tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}

            <button
              className="apply-btn"
              onClick={() => handleApply(job.title)}
              disabled={appliedJobs.includes(job.title)}
            >
              {appliedJobs.includes(job.title)
                ? "Applied ✅"
                : "Apply Now"}
            </button>
          </div>
        ))}
      </div>

      <footer>© 2026 JobFinder | Built with ❤️</footer>
    </>
  );
}

export default App;