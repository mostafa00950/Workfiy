// Add Job Form
const addJobForm = document.getElementById("add-job-form");

addJobForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const jobData = {
    jobId: Date.now(),
    title: document.getElementById("job-title").value,
    description: document.getElementById("job-description").value,
    type: document.getElementById("job-shift").value,
    salary: Number(document.getElementById("job-salary").value),
  };

  try {
    const response = await fetch("http://localhost:3000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });

    const data = await response.json();

    if (data.msg === "Job Added Success") {
      showMessage("Job Added Successfully!", "success");
      addJobForm.reset();
      loadJobs();
    } else {
      showMessage("Something went wrong!", "error");
    }

  } catch (error) {
    console.log(error);
    showMessage("Server Error", "error");
  }
});

// Reset Form
function resetForm() {
  document.getElementById("add-job-form").reset();
}

// Show Message
function showMessage(text, type) {
  const container = document.getElementById("message-container");
  container.innerHTML = `<div class="admin-message admin-message-${type}">${text}</div>`;
  setTimeout(() => container.innerHTML = "", 3000);
}

// Load All Jobs
async function loadJobs() {
  try {
    const response = await fetch("http://localhost:3000/api/jobs");
    const jobs = await response.json();

    const container = document.getElementById("jobs-container");
    container.innerHTML = "";

    if (jobs.length === 0) {
      container.innerHTML = `<p style="color: gray;">No jobs found.</p>`;
      return;
    }

    jobs.forEach(job => {
      container.innerHTML += `
        <div class="job-card" id="card-${job.jobId}">
          
          <!-- View Mode -->
          <div id="view-${job.jobId}">
            <h3>${job.title}</h3>
            <p><strong>Type:</strong> ${job.type}</p>
            <p><strong>Salary:</strong> $${job.salary}</p>
            <p><strong>Description:</strong> ${job.description}</p>
            <div style="display: flex; gap: 10px; margin-top: 10px;">
              <button onclick="showEditForm(${job.jobId}, '${job.title}', '${job.type}', ${job.salary}, '${job.description}')" 
                class="admin-btn admin-btn-primary">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button onclick="deleteJob(${job.jobId})" class="admin-btn admin-btn-danger">
                <i class="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>

          <!-- Edit Mode (مخفي في الأول) -->
          <div id="edit-${job.jobId}" style="display: none;">
            <div class="admin-form-group">
              <label class="admin-form-label">Job Title</label>
              <input type="text" id="edit-title-${job.jobId}" class="admin-form-input" value="${job.title}">
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Type</label>
              <select id="edit-type-${job.jobId}" class="admin-form-select">
                <option value="Full-time" ${job.type === "Full-time" ? "selected" : ""}>Full-time</option>
                <option value="Part-time" ${job.type === "Part-time" ? "selected" : ""}>Part-time</option>
                <option value="Contract" ${job.type === "Contract" ? "selected" : ""}>Contract</option>
                <option value="Remote" ${job.type === "Remote" ? "selected" : ""}>Remote</option>
              </select>
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Salary</label>
              <input type="number" id="edit-salary-${job.jobId}" class="admin-form-input" value="${job.salary}">
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Description</label>
              <textarea id="edit-desc-${job.jobId}" class="admin-form-textarea" rows="3">${job.description}</textarea>
            </div>
            <div style="display: flex; gap: 10px; margin-top: 10px;">
              <button onclick="updateJob(${job.jobId})" class="admin-btn admin-btn-primary">
                <i class="fas fa-save"></i> Save
              </button>
              <button onclick="cancelEdit(${job.jobId})" class="admin-btn admin-btn-secondary">
                <i class="fas fa-times"></i> Cancel
              </button>
            </div>
          </div>

        </div>
      `;
    });

  } catch (error) {
    console.log(error);
    showMessage("Failed to load jobs", "error");
  }
}

// Show Edit Form
function showEditForm(jobId, title, type, salary, description) {
  document.getElementById(`view-${jobId}`).style.display = "none";
  document.getElementById(`edit-${jobId}`).style.display = "block";
}

// Cancel Edit
function cancelEdit(jobId) {
  document.getElementById(`edit-${jobId}`).style.display = "none";
  document.getElementById(`view-${jobId}`).style.display = "block";
}

// Update Job
async function updateJob(jobId) {
  const updatedData = {
    title: document.getElementById(`edit-title-${jobId}`).value,
    type: document.getElementById(`edit-type-${jobId}`).value,
    salary: Number(document.getElementById(`edit-salary-${jobId}`).value),
    description: document.getElementById(`edit-desc-${jobId}`).value,
  };

  try {
    const response = await fetch(`http://localhost:3000/api/jobs/${jobId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    if (data.msg === "Job Updated Success") {
      showMessage("Job Updated Successfully!", "success");
      loadJobs();
    } else {
      showMessage("Something went wrong!", "error");
    }

  } catch (error) {
    console.log(error);
    showMessage("Server Error", "error");
  }
}

// Delete Job
async function deleteJob(jobId) {
  try {
    const response = await fetch(`http://localhost:3000/api/jobs/${jobId}`, {
      method: "DELETE",
    });

    const data = await response.json();
    showMessage("Job Deleted Successfully!", "success");
    loadJobs();

  } catch (error) {
    console.log(error);
    showMessage("Server Error", "error");
  }
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("isLoggedIn");
  window.location.href = "http://127.0.0.1:5500/Views/login.html";
});

// Load Jobs on Page Load
loadJobs();

// ============================================================ //
// Scholarship Section

// Add Scholarship Form
const addScholarshipForm = document.getElementById("add-scholarship-form")

addScholarshipForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const scholarData = {
        scholarshipId: Date.now(),
        title: document.getElementById("scholar-title").value,
        description: document.getElementById("scholar-description").value,
        details: document.getElementById("scholar-details").value,
    }

    try {
        const response = await fetch("http://localhost:3000/api/scholarships", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(scholarData),
        })

        const data = await response.json()

        if (data.msg === "Scholarship added Success") {
            showMessage("Scholarship Added Successfully!", "success")
            addScholarshipForm.reset()
            loadScholarships()
        } else {
            showMessage("Something went wrong!", "error")
        }

    } catch (error) {
        console.log(error)
        showMessage("Server Error", "error")
    }
})

// Reset Scholarship Form
function resetScholarForm() {
    document.getElementById("add-scholarship-form").reset()
}

// Load All Scholarships
async function loadScholarships() {
    try {
        const response = await fetch("http://localhost:3000/api/scholarships")
        const scholarships = await response.json()

        const container = document.getElementById("scholarships-container")
        container.innerHTML = ""

        if (scholarships.length === 0) {
            container.innerHTML = `<p style="color: gray;">No scholarships found.</p>`
            return
        }

        scholarships.forEach(item => {
            container.innerHTML += `
                <div class="job-card" id="card-${item.scholarshipId}">

                    <!-- View Mode -->
                    <div id="view-${item.scholarshipId}">
                        <h3>${item.title}</h3>
                        <p><strong>Description:</strong> ${item.description}</p>
                        <p><strong>Details:</strong> ${item.details}</p>
                        <div style="display: flex; gap: 10px; margin-top: 10px;">
                            <button onclick="showEditScholar(${item.scholarshipId}, '${item.title}', '${item.description}', '${item.details}')"
                                class="admin-btn admin-btn-primary">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button onclick="deleteScholarship(${item.scholarshipId})"
                                class="admin-btn admin-btn-danger">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>

                    <!-- Edit Mode -->
                    <div id="edit-${item.scholarshipId}" style="display: none;">
                        <div class="admin-form-group">
                            <label class="admin-form-label">Title</label>
                            <input type="text" id="edit-scholar-title-${item.scholarshipId}"
                                class="admin-form-input" value="${item.title}">
                        </div>
                        <div class="admin-form-group">
                            <label class="admin-form-label">Description</label>
                            <textarea id="edit-scholar-desc-${item.scholarshipId}"
                                class="admin-form-textarea" rows="3">${item.description}</textarea>
                        </div>
                        <div class="admin-form-group">
                            <label class="admin-form-label">Details</label>
                            <input type="text" id="edit-scholar-details-${item.scholarshipId}"
                                class="admin-form-input" value="${item.details}">
                        </div>
                        <div style="display: flex; gap: 10px; margin-top: 10px;">
                            <button onclick="updateScholarship(${item.scholarshipId})"
                                class="admin-btn admin-btn-primary">
                                <i class="fas fa-save"></i> Save
                            </button>
                            <button onclick="cancelScholarEdit(${item.scholarshipId})"
                                class="admin-btn admin-btn-secondary">
                                <i class="fas fa-times"></i> Cancel
                            </button>
                        </div>
                    </div>

                </div>
            `
        })

    } catch (error) {
        console.log(error)
        showMessage("Failed to load scholarships", "error")
    }
}

// Show Edit Form
function showEditScholar(scholarshipId, title, description, details) {
    document.getElementById(`view-${scholarshipId}`).style.display = "none"
    document.getElementById(`edit-${scholarshipId}`).style.display = "block"
}

// Cancel Edit
function cancelScholarEdit(scholarshipId) {
    document.getElementById(`edit-${scholarshipId}`).style.display = "none"
    document.getElementById(`view-${scholarshipId}`).style.display = "block"
}

// Update Scholarship
async function updateScholarship(scholarshipId) {
    const updatedData = {
        title: document.getElementById(`edit-scholar-title-${scholarshipId}`).value,
        description: document.getElementById(`edit-scholar-desc-${scholarshipId}`).value,
        details: document.getElementById(`edit-scholar-details-${scholarshipId}`).value,
    }

    try {
        const response = await fetch(`http://localhost:3000/api/scholarships/${scholarshipId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        })

        const data = await response.json()

        if (data.msg === "Scholarship Updated Success") {
            showMessage("Scholarship Updated Successfully!", "success")
            loadScholarships()
        } else {
            showMessage("Something went wrong!", "error")
        }

    } catch (error) {
        console.log(error)
        showMessage("Server Error", "error")
    }
}

// Delete Scholarship
async function deleteScholarship(scholarshipId) {
    try {
        const response = await fetch(`http://localhost:3000/api/scholarships/${scholarshipId}`, {
            method: "DELETE",
        })

        showMessage("Scholarship Deleted Successfully!", "success")
        loadScholarships()

    } catch (error) {
        console.log(error)
        showMessage("Server Error", "error")
    }
}

// Load on Page Start
loadScholarships()