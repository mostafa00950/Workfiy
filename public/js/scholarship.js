let requestFullScholars = new XMLHttpRequest()
requestFullScholars.open("GET", "http://localhost:3000/api/scholarships")
requestFullScholars.responseType = "json"
requestFullScholars.send()
requestFullScholars.onload = () => {

    if(requestFullScholars.status >= 200 && requestFullScholars.status < 300) {

        let scholarships = requestFullScholars.response

        let showedFullScholarships = ""

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
            "fa-laptop-code",
            "fa-chart-line",
            "fa-palette",
            "fa-bullhorn",
            "fa-users",
            "fa-newspaper",
            "fa-mobile-alt",
            "fa-shield-alt",
            "fa-chart-bar",
            "fa-camera",
            "fa-coins",
            "fa-graduation-cap"
        ];

        for(let i = 0; i < scholarships.length; i++) {

            let item = scholarships[i]

            let title = item.title
            let description = item.description
            let details = item.details

            let colorClass = colors[i % colors.length]
            let iconClass = icons[i % icons.length]

            showedFullScholarships += `
            
            <div class="job-card">
                <div class="job-card-header">
                    <div class="job-icon ${colorClass}">
                        <i class="fa-solid ${iconClass}"></i>
                    </div>
                    <div class="job-info">
                        <h3>${title}</h3>
                    </div>
                </div>
                <p class="job-description">
                    ${description}
                </p>
                <div class="job-footer">
                    <span>
                        ${details}
                    </span>
                    <button class="btn-apply">
                        Learn More
                    </button>
                </div>
            </div>

            `
        }

        document.getElementById("scholarship").innerHTML = showedFullScholarships
    }
}