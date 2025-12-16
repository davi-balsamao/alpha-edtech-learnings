const news = [ 
    { date: "19/02/2019", title: "The Colosseum", description: "The Colosseum could be flooded to simulate naval battles (naumachiae), as well as to host gladiatorial combats and animal hunts.", image: "assets/img4.jpg" }, // Corrigido ponto extra no path
    { date: "17/05/2017", title: "Mickey Mouse", description: "Come meet Mickey and his friends at Disney!", image: "assets/img5.jpg" }
];

function Card(title, description, image, date) {
    const card = document.createElement('div');
    card.classList.add('card');
    
    card.innerHTML = `
        <img src="${image}" alt="${title}">
        <div class="card-content">
            <span class="card-info">${date}</span>
            <h3>${title}</h3>
            <p>${description}</p>
        </div>
    `;
    return card;
}

export default function Journal() {
    const section = document.createElement('section');
    section.classList.add('container');
    section.id = "journal";

    section.innerHTML = `
        <h2 class="section-title">The Journal</h2>
        <p class="section-desc">Our favorite stories about public lands...</p>
        <div class="card-grid" id="journal-grid"></div>
    `;

    const grid = section.querySelector('#journal-grid');
    
    for (let i = 0; i < news.length; i++) {
        const n = news[i];
        grid.appendChild(Card(n.title, n.description, n.image, n.date));
    }
    
    return section;
}