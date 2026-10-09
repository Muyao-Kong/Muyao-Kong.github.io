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
    if (sectionData.title) {
        addHeading(section, sectionData.title);
    }

    sectionData.paragraphs.forEach(paragraphText => {
        const paragraph = document.createElement("p");
        paragraph.textContent = paragraphText;
        section.appendChild(paragraph);
    });

    researchInfo.appendChild(section);
}

function renderProjectSection(sectionData) {
    if (!sectionData || !Array.isArray(sectionData.projects)) {
        return;
    }

    const section = document.createElement("section");
    section.className = "research-section";
    addHeading(section, sectionData.title);

    sectionData.projects.forEach(projectData => {
        const article = document.createElement("article");
        article.className = "research-project";

        const projectTitle = document.createElement("h2");
        projectTitle.textContent = projectData.name;
        article.appendChild(projectTitle);

        if (projectData.role) {
            const role = document.createElement("p");
            role.className = "research-role";
            role.textContent = projectData.role;
            article.appendChild(role);
        }

        const projectBody = projectData.figure ? document.createElement("div") : article;
        const projectCopy = projectData.figure ? document.createElement("div") : article;
        if (projectData.figure) {
            projectBody.className = "research-project-body";
            projectCopy.className = "research-project-copy";
            projectBody.appendChild(projectCopy);
            article.appendChild(projectBody);
        }

        if (projectData.description.length > 0) {
            const details = document.createElement("ul");
            projectData.description.forEach(descriptionText => {
                const item = document.createElement("li");
                const paragraph = document.createElement("p");
                paragraph.textContent = descriptionText;
                item.appendChild(paragraph);
                details.appendChild(item);
            });
            projectCopy.appendChild(details);
        }

        if (projectData.figure) {
            const figure = document.createElement("figure");
            figure.className = "research-figure";

            const link = document.createElement("a");
            link.href = projectData.figure.pdf;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.title = "View the original diagram (PDF)";

            const image = document.createElement("img");
            image.src = projectData.figure.src;
            image.alt = projectData.figure.alt;
            image.width = projectData.figure.width;
            image.height = projectData.figure.height;
            image.loading = "lazy";
            image.decoding = "async";
            link.appendChild(image);
            figure.appendChild(link);
            projectBody.appendChild(figure);
        }

        section.appendChild(article);
    });

    researchInfo.appendChild(section);
}

function appendPublicationSegment(paragraph, segment) {
    if (typeof segment === "string") {
        paragraph.appendChild(document.createTextNode(segment));
        return;
    }

    const span = document.createElement("span");
    span.textContent = segment.text || "";

    if (segment.kind === "venue") {
        span.className = "publication-venue";
    }

    paragraph.appendChild(span);
}

function renderPublicationText(paragraph, publication) {
    if (typeof publication === "string") {
        paragraph.textContent = publication;
        return;
    }

    publication.segments.forEach(segment => {
        appendPublicationSegment(paragraph, segment);
    });
}

function renderPublicationSection(sectionData) {
    const section = document.createElement("section");
    section.className = "research-section";
    addHeading(section, sectionData.title);

    const list = document.createElement("ul");
    sectionData.publications.forEach(publicationText => {
        const item = document.createElement("li");
        const paragraph = document.createElement("p");
        renderPublicationText(paragraph, publicationText);
        item.appendChild(paragraph);
        list.appendChild(item);
    });

    section.appendChild(list);
    researchInfo.appendChild(section);
}

function fetchResearch() {
    const dataSource = researchInfo.dataset.source || "./research.json";
    fetch(`${dataSource}?v=20261009-2`)
        .then(res => {
            if (!res.ok) {
                throw new Error("network response was not ok");
            }
            return res.json();
        })
        .then(data => {
            if (researchInfo.dataset.view === "publications") {
                renderPublicationSection(data.publications_and_manuscripts);
                return;
            }

            renderParagraphSection(data.research_statement);
            renderParagraphSection(data.research_interest);
            renderProjectSection(data.research_projects);
        })
        .catch(error => {
            console.error("There has been a problem with your fetch operation:", error);
        });
}

logoToHomepage();
fetchResearch();
