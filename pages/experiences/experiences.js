const logoImgHTML = document.querySelector(".logo");
const internsHTML = document.querySelector(".interns");

const experincePromise = fetch('./experiences.json');
////-------------------------------窗口-------------------------------
function logoToHomepage(){
    logoImgHTML.addEventListener("click", () => {
        window.location.href = "../../index.html";
    });
}

//-------------------------------以下是experience的数据和方法-------------------------------
function displayExperiences(){
    experincePromise.then(res => {
        if (!res.ok) {
            throw new Error("network is not ok" + res.statusText);
        }
        return res.json();
    })
    .then(data => {

        var internsHTMLList = internsHTML.querySelector("ul");
        var internsData = data.interns || [];
        var internsString = "";

        for (const job of internsData) {

            let jobDescriptionHTML = "";
            const jobDescriptions = job.description.split("\n");
            // Generate description list items
            for (const jobDescription of jobDescriptions) {
                jobDescriptionHTML += `${jobDescription}<br>`;
            }

            internsString += `
            <li>
                <div class="company">
                    <div class="left">
                        <div class="logo">
                            <img src="${job.logo_1x}" srcset="${job.logo_2x} 2x, ${job.logo_1x} 1x"
                                alt="${job.name} logo">
                        </div>
                        <p>${job.name}</p>
                    </div>

                    <p>${job.duration}</p>
                </div>
                <div class="detailed-info hidden">
                    <div class="position"> <p>${job.position}</p> </div>
                    <div class="description"><span>${jobDescriptionHTML}</span></div>
                </div>
            </li>
        `
        }
        internsHTMLList.innerHTML += internsString;
    })
}

function displayDescription() {

}

logoToHomepage();
displayExperiences();
