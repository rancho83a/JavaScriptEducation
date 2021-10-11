import {setupHome, showHome} from "./home.js";
import {setupPostComments, showPostComments} from "./postComments.js";

const main = document.querySelector('main');
setupSection('home-page', setupHome);
setupSection('post-comments', setupPostComments);


function setupSection(sectionId, setup) {
    const section = document.getElementById(sectionId);
    setup(main, section);
}
function setupNav(){
    document.getElementById('homeBtn').addEventListener('click', showHome);
    main.addEventListener('click', (ev) => {
        if (ev.target.tagName == 'H2' && ev.target.classList.contains('homePage')) {
            showPostComments(ev.target.parentNode.id);
        }
    })
}
showHome();
setupNav();





