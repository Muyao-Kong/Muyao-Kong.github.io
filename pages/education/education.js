const logoImgHTML = document.querySelector(".logo");

const currentSchoolHTML = document.querySelector("#current-school");
const cLogo = document.getElementById("c-logo");
const cSchoolAndMajor = document.querySelector("#c-school-and-major");
const cLocAndGdate = document.querySelector("#c-location-and-gdate");
const cMoreInfo = document.querySelector("#c-more-info");
// const bachelor = document.querySelector("#bachelor");
const highSchoolHTML = document.querySelector("#high-school");
const hLogo = document.getElementById("h-logo");
const hSchool = document.querySelector("#h-school");
const hLocAndGdate = document.querySelector("#h-location-and-gdate");
const hMoreInfo = document.querySelector("#h-more-info");

//可能用得上？
const otherHTML = document.querySelector("#other");

const educationPromise = fetch('./education.json')

////-------------------------------窗口-------------------------------
function logoToHomepage(){
    logoImgHTML.addEventListener("click", () => {
        window.location.href = "../../index.html";
    });
}

//-------------------------------以下是education的数据和方法-------------------------------
function calculateCumGPA(scoreList) {
    var sum = 0.0;
    var count = 0;
    for (let i = 0; i < scoreList.length; i++) {
        sum += score;
        count++;
    }
    return score / count;
}


function displayEducation() {
    educationPromise.then(res => {
        if (!res.ok) {
            throw new Error("network is not ok" + res.statusText);
        }
        return res.json();
    })
    .then(data => {

        // Current School
        // current school data Decalred (用于复用)
        var currentSchoolData = data.current_school;

        // Add Logo
        cLogo.querySelector("img").src = currentSchoolData.logo_1x;
        cLogo.querySelector("img").srcset = `
            ${currentSchoolData.logo_1x} 1x,
            ${currentSchoolData.logo_2x} 2x
        `.trim();
        cLogo.querySelector("img").alt    = currentSchoolData.name + " logo";

        //Strings declared
        var cSchoolAndMajorString = `
            <header>
                <p>${currentSchoolData.name}</p>
                <p>Major in ${currentSchoolData.major}</p>
                <p>Minor in ${currentSchoolData.minor}</p>
            </header>
            
        `;
        var cLocAndGdateString = `
            <header>
                <p>${currentSchoolData.location}</p>
                <p>${currentSchoolData.graduation_date}</p>
            </header>
            
        `;
        var cMoreInfoString = currentSchoolData.more.map(m => {
            return `
                <p>${m}</p>
            `
        }).join("\n");

        // Add Strings to HTML
        cSchoolAndMajor.innerHTML += cSchoolAndMajorString;
        cLocAndGdate.innerHTML += cLocAndGdateString;
        cMoreInfo.innerHTML += cMoreInfoString;



        // High School
        // High School Data Declared (用于复用)
        var highSchoolData = data.high_school;

        // Add Logo
        hLogo.querySelector("img").src = highSchoolData.logo_1x;
        hLogo.querySelector("img").srcset = `
            ${highSchoolData.logo_1x} 1x,
            ${highSchoolData.logo_2x} 2x
        `
        hLogo.querySelector("img").alt = highSchoolData.name + " logo";

        // Strings declared
        var hSchoolString = 
        `
            <header>
                <p>${highSchoolData.name}</p>
                <p>${highSchoolData.dept}</p>
            </header>
            
        `;
        var hLocAndGdateString = 
        `
            <header>
                <p>${highSchoolData.location}</p>
                <p>${highSchoolData.graduation_date}</p>
            </header>
            
        `;
        // var hMoreInfoString = highSchoolData.coursework.map(course => {
        //     return `
        //     <p>
        //         ${course}
        //     </p>
        //     `
        // }).join("\n");

        // Add Strings to HTML
        hSchool.innerHTML += hSchoolString;
        hLocAndGdate.innerHTML += hLocAndGdateString;
        // hMoreInfo.innerHTML += hMoreInfoString;

    });
}

logoToHomepage();
displayEducation();