function lockedProfile() {
    // let allProfiles = document.querySelectorAll('div.profile');

    // for (divProfile of allProfiles) {
    //     let btn = divProfile.querySelector('button');
    //     btn.addEventListener('click', onclick);
    // }
    
    document.getElementById('container').addEventListener('click', onclick);
    function onclick(ev) {
        let button = ev.target;
        if(button.tagName==='BUTTON'){

        if( button.parentNode.querySelector('input').checked) return;
       
        let info = button.parentNode.querySelector('div');
        info.style.display = info.style.display === 'block' ? 'none' : 'block';
        button.textContent = button.textContent === 'Hide it' ? 'Show more' : 'Hide it';
        }
    }
}