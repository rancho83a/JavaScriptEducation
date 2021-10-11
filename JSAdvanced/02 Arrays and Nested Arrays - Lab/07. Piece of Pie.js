function solve(input, s1, s2) {
   let index1 = input.indexOf(s1);

  let  index2 = input.indexOf(s2);
    let res = input.slice(index1, index2 + 1);
    return res;
}

// solve(['Pumpkin Pie',
// 'Key Lime Pie',
// 'Cherry Pie',
// 'Lemon Meringue Pie',
// 'Sugar Cream Pie'],
// 'Key Lime Pie',
// 'Lemon Meringue Pie');

solve(['Apple Crisp',
    'Mississippi Mud Pie',
    'Pot Pie',
    'Steak and Cheese Pie',
    'Butter Chicken Pie',
    'Smoked Fish Pie'],
    'Pot Pie',
    'Smoked Fish Pie');