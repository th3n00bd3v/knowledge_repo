async function loadData(jsonFile) {

    try {

        const response = await fetch(jsonFile);

        if (!response.ok) {
            throw new Error(`Failed to load ${jsonFile}`);
        }

        const data = await response.json();

        renderCards(data);

        const searchInput =
            document.getElementById("searchInput");

        if (searchInput) {

            searchInput.addEventListener("input", () => {

                const term =
                    searchInput.value.toLowerCase();

                const filtered =
                    data.filter(item =>
                        JSON.stringify(item)
                            .toLowerCase()
                            .includes(term)
                    );

                renderCards(filtered);

            });

        }

    } catch (error) {

        console.error(error);

        const container =
            document.getElementById("contentGrid");

        if (container) {

            container.innerHTML = `
                <div class="item-card">
                    <div class="item-title">
                        Error
                    </div>

                    <div class="item-subtitle">
                        Unable to load data.
                    </div>
                </div>
            `;
        }
    }
}

function renderCards(data) {

    const container =
        document.getElementById("contentGrid");

    if (!container) return;

    container.innerHTML = "";

    if (!data.length) {

        container.innerHTML = `
            <div class="item-card">
                <div class="item-title">
                    No Results
                </div>

                <div class="item-subtitle">
                    No matching entries found.
                </div>
            </div>
        `;

        return;
    }

    const groups =
        data.reduce((acc, item) => {

            const category =
                item.category || "Others";

            if (!acc.has(category)) {
                acc.set(category, []);
            }

            acc.get(category).push(item);

            return acc;

        }, new Map());

    groups.forEach((items, category) => {

        const section =
            document.createElement("section");

        section.className = "category-section";

        const heading =
            document.createElement("div");

        heading.className = "category-header";
        heading.innerHTML = `
            <h3>${category}</h3>
            <span class="category-count">
                ${items.length} ${items.length === 1 ? "item" : "items"}
            </span>
        `;

        const grid =
            document.createElement("div");

        grid.className = "category-grid";

        items.forEach(item => {

            grid.appendChild(createCard(item));

        });

        section.appendChild(heading);
        section.appendChild(grid);
        container.appendChild(section);

    });

}

function createCard(item) {

        let card;

        // Create clickable cards if URL exists
        if (item.url) {

            card = document.createElement("a");

            card.href = item.url;
            card.target = "_blank";
            card.rel = "noopener noreferrer";

            card.style.textDecoration = "none";
            card.style.color = "inherit";

        } else {

            card = document.createElement("div");

        }

        card.className = "item-card";

        // Platform Section
        let platformHtml = "";

        if (item.platform) {

            platformHtml = `
                <div class="item-meta">
                    Platform: ${item.platform}
                </div>
            `;
        }

        // Status Badge
        let statusHtml = "";

        if (item.status) {

            statusHtml = `
                <div class="badge">
                    ${item.status}
                </div>
            `;
        }

        // Progress Bar
        let progressHtml = "";

        if (
            item.progress !== undefined &&
            item.progress !== null
        ) {

            progressHtml = `
                <div class="progress">

                    <div
                        class="progress-fill"
                        style="width:${item.progress}%">
                    </div>

                </div>

                <div class="progress-label">
                    ${item.progress}% Complete
                </div>
            `;
        }

        // Open Button
        let openButton = "";

        if (item.url) {

            openButton = `
                <div class="open-link">
                    Open →
                </div>
            `;
        }

        card.innerHTML = `
            <div class="item-title">
                ${item.title || ""}
            </div>

            <div class="item-subtitle">
                ${item.subtitle || ""}
            </div>

            ${platformHtml}

            ${statusHtml}

            ${progressHtml}

            ${openButton}
        `;

        return card;
}
