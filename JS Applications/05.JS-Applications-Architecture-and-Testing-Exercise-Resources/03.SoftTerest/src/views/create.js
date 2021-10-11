import { createIdea } from "../api/data.js";

export function setupCreate(section, navigation ){

    const form = section.querySelector('form');
    form.addEventListener('submit', onsubmit);

        return showCreate;

    async function showCreate(){

        return section;
    }
    async function onsubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(form);
        const title = formData.get('title');
        const description = formData.get('description');
        const img = formData.get('imageURL');

        if(title.length<6){
           return alert('The title should be at least 6 characters long.')
        }
        if(description.length<10){
           return alert('The description should be at least 10 characters long.')
        }
        if(img.length<5){
           return alert('The imageLink should be at least 5 characters long.')
        }
        const idea = {title,description,img};

        await createIdea(idea);
        navigation.goTo('dashboard');

    
    
    }
}