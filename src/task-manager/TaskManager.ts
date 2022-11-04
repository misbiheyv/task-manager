import { intoIter, randomUuid } from "../helpers";

import Task from "../task/Task";


export default class TaskManager {

    protected execDuration: number;

    protected sleepDuration: number;

    protected taskList: Map<string, Task> = new Map();

    protected get count() : number {
        return this.taskList.size;
    }    
    
    protected get taskDuration() : number {
        return this.taskList.size ? this.execDuration/this.taskList.size | 0 : this.execDuration;
    }


    constructor(execDuration: number, sleepDuration: number) {
        this.execDuration = execDuration;
        this.sleepDuration = sleepDuration;
    }


    public forEach<T>(iterable: Iterable<T>, fn: (el?: T, index?: number) => void):  Promise<unknown> {
        const 
            task = new Task(this.taskDuration, this.sleepDuration),
            id = randomUuid();

        this.taskList.set(id, task)

        for (const task of this.taskList.values()) {
            task.changeExecDuration(this.taskDuration);
            task.changeSleepDuration(this.sleepDuration);
        }

        return this.taskList.get(id)!.forEach(<IterableIterator<T>>intoIter(iterable), fn).finally(() => {
            this.taskList.delete(id);

            for (const task of this.taskList.values()) {
                task.changeExecDuration(this.taskDuration);
                task.changeSleepDuration(this.sleepDuration);
            }
        })
    }
}