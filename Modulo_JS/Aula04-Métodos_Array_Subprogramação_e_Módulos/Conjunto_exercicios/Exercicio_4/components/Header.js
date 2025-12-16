export default function Header() {
    const header = document.createElement('header');
    header.classList.add('header');

    header.innerHTML = `
        <nav>
            <a href="#">ABOUT</a>
            <a href="#explore">EXPLORE</a>
            <a href="#journal">JOURNAL</a>
            <a href="#">SEARCH</a>
        </nav>
    `;

    return header;
}