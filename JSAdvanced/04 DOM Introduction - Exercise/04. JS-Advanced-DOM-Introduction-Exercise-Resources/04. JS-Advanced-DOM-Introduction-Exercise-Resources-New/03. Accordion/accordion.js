function toggle() {
    text = document.querySelector('span.button').textContent;
    // if(text === 'More'){
    // document.getElementById('extra').style.display = 'block';
    // document.querySelector('span.button').textContent="Less";
    // } else {
    //     document.getElementById('extra').style.display = 'none';
    //     document.querySelector('span.button').textContent="More";
    // }

    document.getElementById('extra').style.display = document.getElementById('extra').style.display === 'block' ? 'none' : 'block';
    document.querySelector('span.button').textContent = document.querySelector('span.button').textContent =="More" ? 'Less' : 'More';

    console.log('TODO:...');
} 