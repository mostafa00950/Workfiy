let requestJob = new XMLHttpRequest()
requestJob.open("GET", "http://localhost:3000/api/jobHome?limit=6")
requestJob.responseType = "json"
requestJob.send()
requestJob.onload = () => {

    if(requestJob.status >= 200 && requestJob.status < 300) {

        let jobs = requestJob.response

        let showedJobs = ""

        let colors = [
            "job-icon-indigo",
            "job-icon-green",
            "job-icon-purple",
            "job-icon-yellow",
            "job-icon-red",
            "job-icon-blue"
        ]

        let icons = [
            "fa-code",
            "fa-chart-line",
            "fa-paint-brush",
            "fa-database",
            "fa-mobile-alt",
            "fa-server"
        ]

        for(let i = 0; i < jobs.length; i++) {

            let singleJob = jobs[i]

            let title = singleJob.title
            let description = singleJob.description
            let type = singleJob.type
            let salary = singleJob.salary

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
        document.getElementById("showedJobs").innerHTML = showedJobs
    }
}