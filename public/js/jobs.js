let requestJob = new XMLHttpRequest();
requestJob.open("GET", "http://localhost:3000/api/jobs");
requestJob.responseType = "json";
requestJob.send();

requestJob.onload = () => {

    if (requestJob.status >= 200 && requestJob.status < 300) {

        let jobs = requestJob.response;
        let showedJobs = "";

        const colors = [
            "job-icon-indigo",
            "job-icon-red",
            "job-icon-yellow",
            "job-icon-teal",
            "job-icon-blue",
            "job-icon-purple",
            "job-icon-green",
            "job-icon-orange",
            "job-icon-pink"
        ];

        const icons = [
            "fa-code",
            "fa-server",
            "fa-paint-brush",
            "fa-chart-bar",
            "fa-mobile-alt",
            "fa-robot",
            "fa-cloud",
            "fa-tasks",
            "fa-shield-alt"
        ];

        for (let i = 0; i < jobs.length; i++) {

            let job = jobs[i];

            let title = job.title;
            let description = job.description;
            let type = job.type;
            let salary = job.salary;

            let colorClass = colors[i % colors.length]
            let iconClass = icons[i % icons.length]

            showedJobs += `
                <div class="job-card">
                    <div class="job-card-header">
                        <div class="job-icon ${colorClass}">
                            <i class="fas ${iconClass}"></i>
                        </div>
                        <div class="job-info">
                            <h3>${title}</h3>
                            <p>${type}</p>
                        </div>
                    </div>
                    <p class="job-description">
                        ${description}
                    </p>
                    <div class="job-footer">
                        <span class="job-salary">
                            ${salary} EGP
                        </span>
                        <button class="btn-apply">
                            Apply Now
                        </button>
                    </div>
                </div>
            `
        }
        document.getElementById("jobs").innerHTML = showedJobs;
    }
};