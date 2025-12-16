export default function Outdoor() {
    const outdoor = document.createElement('section'); 
    outdoor.classList.add('outdoor-section');

    outdoor.innerHTML = `
        <div>
            <h1>The Great Outdoors</h1>
            <p>Wander often. Wonder always.</p>
        </div>
    `;

    return outdoor;
}