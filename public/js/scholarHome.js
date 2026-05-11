function applyScholar(scholarshipId) {
    let cvInput = document.createElement("input")
    cvInput.type = "file"
    cvInput.accept = ".pdf,.doc,.docx"

    cvInput.onchange = () => {
        let file = cvInput.files[0]

        if (!file) return

        let formData = new FormData()
        formData.append("cv", file)
        formData.append("scholarshipId", scholarshipId)

        let uploadRequest = new XMLHttpRequest()
        uploadRequest.open("POST", "http://localhost:3000/api/applyScholarship")
        uploadRequest.send(formData)

        uploadRequest.onload = () => {
            if (uploadRequest.status >= 200 && uploadRequest.status < 300) {
                alert("✅ تم إرسال طلبك بنجاح!")
            } else {
                alert("❌ حصل خطأ، حاول تاني")
            }
        }
    }

    cvInput.click()
}
let requestScholars = new XMLHttpRequest()
requestScholars.open("GET", "http://localhost:3000/api/scholarships")
requestScholars.responseType = "json"
requestScholars.send()
requestScholars.onload = () => {

    if(requestScholars.status >= 200 && requestScholars.status < 300) {

        let scholarships = requestScholars.response

        let showedScholarships = ""

        let colors = [
            "job-icon-indigo",
            "job-icon-green",
            "job-icon-purple",
            "job-icon-yellow",
            "job-icon-red",
            "job-icon-blue"
        ]

        let icons = [
            "fa-brain",          
            "fa-code",           
            "fa-chart-line",     
            "fa-shield-halved",  
            "fa-mobile-alt",     
            "fa-pen-ruler"       
        ]

        for(let i = 0; i < scholarships.length; i++) {

            let item = scholarships[i]

            let title = item.title
            let description = item.description
            let details = item.details

            let colorClass = colors[i % colors.length]
            let iconClass = icons[i % icons.length]

            showedScholarships += `
            
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
                    <button class="btn-apply" onclick="applyScholar('${item.scholarshipId}')">
                        Learn Now
                    </button>
                </div>
            </div>

            `
        }
        document.getElementById("showedScholars").innerHTML = showedScholarships
    }
}