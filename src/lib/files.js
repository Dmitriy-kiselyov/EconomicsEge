const fs = require('fs');
const path = require('path');

const fileName = 'file.txt';
const dirPath = 'C:\\Users\\dmitr\\Documents\\Projects\\ReactNative\\EconomicsEge\\android\\app\\src\\main\\assets\\tasks\\tests\\1.Проценты\\3.Уровень 3';

const filePath = path.join(dirPath, fileName);
const text = String(fs.readFileSync(filePath));

const tasks = text.split('\r\n\r\n').filter(text => text.length > 5);

console.log(tasks);

writeTasks(tasks, 2);

function writeTasks(tasks, repeat = 1) {
    let num = 1;

    for (let i = 0; i < repeat; i++) {
        tasks.forEach((task) => {
            const taskPath = path.join(dirPath, (num++) + '.txt');
            fs.writeFileSync(taskPath, task.trim());
        })
    }
}
