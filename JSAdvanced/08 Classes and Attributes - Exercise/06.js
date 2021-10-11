class Company {
    constructor() {
        this.departments = [];
    }
    addEmployee(username, salary, position, department) {
        if (!username || !salary || !position || !department || Number(salary) <= 0) {
            throw new Error('"Invalid input!"');
        }
        const newEmployer = {
            username,
            salary: Number(salary),
            position
        }

        if (!this.departments[department]) {
            this.departments[department] = [];
        }
        this.departments[department].push(newEmployer);
        return (`New employee is hired. Name: ${username}. Position: ${position}`);
    }

    bestDepartment() {
        let res = [];
        let bestAvg = 0;
        let bestDep = '';
        for (let iter in this.departments) {
            let avg = this.departments[iter].reduce((sum, dep) => sum + dep.salary, 0) / this.departments[iter].length;
            if (avg > bestAvg) {
                bestAvg = avg;
                bestDep = iter;
            }
        }
        res.push(`Best Department is: ${bestDep}`);
        res.push(`Average salary: ${bestAvg.toFixed(2)}`)
        this.departments[bestDep].sort((a, b) =>  b.salary - a.salary ||  a.username.localeCompare(b.username));
        this.departments[bestDep].forEach(e => {
            res.push(e.username + ' ' + e.salary + ' ' + e.position)
        });
        return res.join('\n');
    }
}

let c = new Company();
c.addEmployee("Stanimir", 2000, "engineer", "Human resources");
console.log(c.bestDepartment());