const logoImg = document.querySelector(".logo");
const researchInfo = document.querySelector(".research-info");

function logoToHomepage(){
    logoImg.addEventListener("click", () => {
        window.location.href = "../../index.html";
    });
}

function addHeading(section, title) {
    const heading = document.createElement("h1");
    heading.textContent = title;
    section.appendChild(heading);
}

function renderParagraphSection(sectionData) {
    const section = document.createElement("section");
    section.className = "research-section";
    addHeading(section, sectionData.title);

    sectionData.paragraphs.forEach(paragraphText => {
        const paragraph = document.createElement("p");
        paragraph.textContent = paragraphText;
        section.appendChild(paragraph);
    });

    researchInfo.appendChild(section);
}

function renderPublicationSection(sectionData) {
    const section = document.createElement("section");
    section.className = "research-section";
    addHeading(section, sectionData.title);

    const list = document.createElement("ul");
    sectionData.publications.forEach(publicationText => {
        const item = document.createElement("li");
        const paragraph = document.createElement("p");
        paragraph.textContent = publicationText;
        item.appendChild(paragraph);
        list.appendChild(item);
    });

    section.appendChild(list);
    researchInfo.appendChild(section);
}

function fetchResearch() {
    fetch("./research.json")
        .then(res => {
            if (!res.ok) {
                throw new Error("network response was not ok");
            }
            return res.json();
        })
        .then(data => {
            renderParagraphSection(data.research_interest);
            renderPublicationSection(data.publications_and_manuscripts);
        })
        .catch(error => {
            console.error("There has been a problem with your fetch operation:", error);
        });
}

logoToHomepage();
fetchResearch();
