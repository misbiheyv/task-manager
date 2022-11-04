import PriorityTaskManager from "./PriorityTaskManager";
import TaskManager from "./TaskManager";

export default function createTaskManager(
    { execDuration, sleepDuration, priority }
    = { execDuration: 100, sleepDuration: 100, priority: false}
) : PriorityTaskManager | TaskManager {
    if (priority === true) {
        return new PriorityTaskManager(execDuration, sleepDuration);
    }

    return new TaskManager(execDuration, sleepDuration);
}