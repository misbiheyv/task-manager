import { intoIter, randomUuid } from "../helpers";

import TaskManager from "./TaskManager";

import PriorityTask from "../task/PriorityTask";

import { PRIORITIES, coefficients } from "../priorities";



export default class PriorityTaskManager extends TaskManager {
    protected prioritiesCount = {
        "LOW": 0,
        "NORMAL": 0,
        "HIGHT": 0,
        "CRITICAL": 0,
    }

    protected taskList: Map<string, PriorityTask> = new Map();

    constructor(execDuration: number, sleepDuration: number) {
        super(execDuration, sleepDuration);
    }

    public forEach<T>(
        iterable: Iterable<T>, 
        fn: (el?: T | undefined, index?: number | undefined) => void,
        priority: keyof typeof PRIORITIES = "NORMAL"
    ) : Promise<unknown> {
        const task = new PriorityTask(this.getPriorityTaskDuration(priority), this.sleepDuration, priority);
        const id = randomUuid();

        this.taskList.set(id, task);
        this.prioritiesCount[task.priority]++;

        for (const task of this.taskList.values()) {
            task.changeExecDuration(this.getPriorityTaskDuration(task.priority));
            task.changeSleepDuration(this.sleepDuration);
        }

        return this.taskList.get(id)!.forEach(<IterableIterator<T>>intoIter(iterable), fn).finally(() => {
            this.taskList.delete(id);
            this.prioritiesCount[task.priority]--;

            for (const task of this.taskList.values()) {
                task.changeExecDuration(this.getPriorityTaskDuration(task.priority));
                task.changeSleepDuration(this.sleepDuration);
            }
        })
    }

    protected getPriorityTaskDuration(priority: keyof typeof PRIORITIES) : number {
        /**
         * T - execTime
         * t(norm) - базовое время выполнения (задачи с приоритетом normal)
         * c(p) - кол-во задач приоритета p
         * k(p) - коэффициент для зачади приоритета p
         * t(p) - время выполнения задачи приоритета p
         * 
         * t(norm) = T/(∑(c(i)k(i))), где i это приоритеты
         * t(p) = t(norm) * k(p)
         */

        return this.execDuration / ( 
            this.prioritiesCount.CRITICAL * coefficients.CRITICAL
            + this.prioritiesCount.HIGHT * coefficients.HIGHT
            + this.prioritiesCount.NORMAL * coefficients.NORMAL
            + this.prioritiesCount.LOW * coefficients.LOW
        ) * coefficients[priority];

    }

}