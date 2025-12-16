import Header from './Header.js';
import Outdoor from './Outdoor.js';
import ExploreWorld from './ExploreWorld.js';
import Journal from './Journal.js'
import Footer from './Footer.js'

export default function Page() {
    const main = document.createElement('div');
    main.id = "main-page";

    main.appendChild(Header());
    main.appendChild(Outdoor());
    main.appendChild(ExploreWorld());
    main.appendChild(Journal());
    main.appendChild(Footer());

    return main;
}