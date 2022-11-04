import createTaskManager from "./task-manager";
import { PRIORITIES } from "./priorities";

const taskManager = createTaskManager({
    execDuration: 100,
    sleepDuration: 100,
    priority: true
});

const priorityList: Array<keyof typeof PRIORITIES> = ['LOW', 'NORMAL', 'HIGHT', 'CRITICAL'];

for (let i = 0; i < 15; i++) {
    const 
        priority = Math.random() * 4 | 0,
        id = `thread-${i + 1}`,
        node = document.createElement('div');

    node.innerHTML = `${priorityList[priority]} - `;
    node.classList.add('thread', 'mt-10', `thread-${priorityList[priority].toLowerCase()}`);
    node.appendChild(document.createElement('span')).id = id;

    document.getElementById('container')?.appendChild(node)
    
    const timeStart = Date.now()

    taskManager.forEach(new Array(500_000), (_, i) => {
        document.getElementById(id)!.innerHTML = `${i}`
    }, priorityList[priority]).then(() => {
        document.getElementById(id)!.innerHTML = `reached in ${(Date.now() - timeStart) / 1000} seconds.`
    })
}