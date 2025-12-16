export default function Footer() {
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    footer.innerHTML = `
        <p>&copy; 2025 The Great Outdoors. All rights reserved.</p>
        <nav>
            <a href="#">ABOUT</a>
            <a href="#explore">EXPLORE</a>
            <a href="#journal">JOURNAL</a>
            <a href="#">SEARCH</a>
        </nav>
    `;

    return footer;
}