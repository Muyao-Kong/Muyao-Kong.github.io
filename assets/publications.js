(() => {
    function renderPublicationText(paragraph, publication) {
        if (typeof publication === "string") {
            paragraph.textContent = publication;
            return;
        }

        publication.segments.forEach(segment => {
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
        });
    }

    function renderPublications(container, sectionData) {
        const section = document.createElement("section");
        section.className = "publication-section";

        const heading = document.createElement("h1");
        heading.textContent = sectionData.title;
        section.appendChild(heading);

        const list = document.createElement("ul");
        sectionData.publications.forEach(publication => {
            const item = document.createElement("li");
            const paragraph = document.createElement("p");
            renderPublicationText(paragraph, publication);
            item.appendChild(paragraph);
            list.appendChild(item);
        });
        section.appendChild(list);
        container.replaceChildren(section);
    }

    document.querySelectorAll("[data-publications-source]").forEach(container => {
        const source = new URL(container.dataset.publicationsSource, document.baseURI);
        source.searchParams.set("v", "20261022-3");

        fetch(source.href)
            .then(res => {
                if (!res.ok) {
                    throw new Error("network response was not ok");
                }
                return res.json();
            })
            .then(data => {
                renderPublications(container, data.publications_and_manuscripts);
            })
            .catch(error => {
                console.error("There has been a problem loading publications:", error);
            });
    });
})();
