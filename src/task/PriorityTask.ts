import { PRIORITIES } from "../priorities";
import Task from "./Task";

export default class PriorityTask extends Task {

    private _priority!: keyof typeof PRIORITIES;

    public get priority() : keyof typeof PRIORITIES {
        return this._priority;
    }
    protected set priority(v : keyof typeof PRIORITIES) {
        this._priority = v;
    }

    constructor(execDuration: number, sleepDuration: number, priority: keyof typeof PRIORITIES) {
        super(execDuration, sleepDuration)
        this.priority = priority;
    }

}