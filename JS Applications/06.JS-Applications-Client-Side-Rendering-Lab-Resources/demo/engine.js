export function renderTemplate(templateString, data) {
    const regEx = /{{(.+)}}/gm;
    return templateString.replace(regEx, (match, propName) => data[propName]);
    

}