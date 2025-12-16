const places = [
    { city: "Rio de Janeiro", country: "Brazil", image: "assets/img1.jpg" },
    { city: "Paris", country: "France", image: "assets/img2.jpg" },
    { city: "Tokyo", country: "Japan", image: "assets/img3.jpg" }
];

function Card(city, country, image) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    card.innerHTML = `
        <img src="${image}" alt="${city}">
        <div class="card-content" style="text-align: center;">
            <h3>${city}</h3>
            <span class="card-info">${country}</span>
        </div>
    `;
    return card;
}

export default function ExploreWorld() {
    const section = document.createElement('section');
    section.classList.add('container');
    section.id = "explore";

    section.innerHTML = `
        <h2 class="section-title">Explore the World</h2>
        <p class="section-desc">We seek to provide the most authentic content...</p>
        <div class="card-grid" id="explore-grid"></div>
    `;

    const grid = section.querySelector('#explore-grid');
    
    for (let i = 0; i < places.length; i++) {
        const p = places[i];
        grid.appendChild(Card(p.city, p.country, p.image));
    }
    
    return section;
}