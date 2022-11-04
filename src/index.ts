import createTaskManager from "./task-manager";

const taskManager = createTaskManager({
    execDuration: 100,
    sleepDuration: 100,
    priority: true
});

taskManager.forEach(new Array(1_000_000), (_, i) => {
    document.getElementById('thread-1')!.innerHTML = `${i}`
}, "LOW").then((res) => {
    console.log('1 end', res)
})

taskManager.forEach(new Array(1_000_000), (_, i) => {
    document.getElementById('thread-2')!.innerHTML = `${i}`
}, "NORMAL").then((res) => {
    console.log('2 end', res)
})

taskManager.forEach(new Array(1_000_000), (_, i) => {
    document.getElementById('thread-3')!.innerHTML = `${i}`
}, "CRITICAL").then((res) => {
    console.log('3 end', res)
})