function dayWeek(day){
    let num;
    switch(day){
        case "Monday": num=1;break;
        case "Tuesday": num=2;break;
        case "Wednesday": num=3;break;
        case "Thursday": num=4;break;
        case "Friday": num=5;break;
        case "Saturday": num=6;break;
        case "Sunday": num=7;break;
        default: num = 'error';
    }
    console.log(num);
}

dayWeek('rew');
