function solve() {
   document.querySelector('#btnSend').addEventListener('click', onClick);


   function onClick() {
      let inputStr = document.querySelector('textarea').value;
      let arr = JSON.parse(inputStr);
      let info = {};

      arr.forEach(str => {

         [rest, woker] = str.split(' - ');

         let wokerArr = woker.split(', ');
         let arrObjwoker = []
         wokerArr.forEach(w => {
            [name, salary] = w.split(" ");
            salary = Number(salary);
            arrObjwoker.push({ name, salary })
         });

         if (info[rest]) {
            arrObjwoker = arrObjwoker.concat(info[rest].arrObjwoker)
         }
         arrObjwoker.sort((a, b) => b.salary - a.salary);
         let bestSalary = arrObjwoker[0].salary;
         let avg = arrObjwoker.reduce((sum, woker) => sum + woker.salary, 0) / arrObjwoker.length;

         info[rest] = { arrObjwoker, avg, bestSalary };
      });
      console.log(info);

      let bestAvgRest = 0;
      let nameRest = undefined;

      for (let rest in info) {
         if (info[rest].avg > bestAvgRest) {
            bestAvgRest = info[rest].avg;
            nameRest = rest;
         }
      }
      document.querySelector('#bestRestaurant p').textContent =
         `Name: ${nameRest} Average Salary: ${info[nameRest].avg.toFixed(2)} Best Salary: ${info[nameRest].bestSalary.toFixed(2)}`
      result = [];
      info[nameRest].arrObjwoker.forEach(w => {
         result.push(`Name: ${w.name} With Salary: ${w.salary}`)
      });

      document.querySelector('#workers p').textContent = result.join(' ');
   }
}