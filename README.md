# Реализация простого менеджера задач и менеджера задач с приоритетами

### Простой менеджер задач реализуется классом TaskManager:
### Менеджер задач с приоритетами реализуется классом PriorityTaskManager:

[Наглядный пример можно посмотреть здесь](https://misbiheyv.github.io/task-manager/)

### Конструктор:

- constructor(execDuration: number, sleepDuration: number) - принимает время работы и время задержки выполнения.

### Методы:

- TaskManager.prototype.forEach(iter, cb) - Обходит Iterable коллекцию любого размера, выполняя переданную функцию на элементах, при этом не блокирует поток. То есть параллельно могут выполняться другие задачи/ввод или вывод. Позволяет обходить сколько угодно элементов параллельно. В случае успешного обхода вернет fulfilled, а в случае ошибки rejected.

- PriorityTaskManager.prototype.forEach(iter, cb, priority?) - Делает все то же самое, что и TaskManager.prototype.forEach, но помимо этого позволяет задать приоритет задачи(по дефолту normal). При выполнении нескольких обходов одновременно эти приоритеты будут влиять на скорость обхода коллекции. (Чем выше приоритет, тем больше времени выделяется на задачу)

## Модуль task-manager предоставляет фабрику над классами TaskManager и PriorityTaskManager. API:

createTaskManager({execDuration, sleepDuration, priority}?) - создает TaskManager на основе полученных параметров. По делфолту создает обычный TaskManager, execDuration = sleepDuration = 100ms

## Пример использования

```js
const taskManager = createTaskManager({
    execDuration: 100,
    sleepDuration: 100,
    priority: true
});

taskManager.forEach(new Array(50e7), (el, index, self) => {
    console.log(index)
}, "CRITICAL").then(() => console.log('critical reached'))

taskManager.forEach(new Array(50e7), (el, index, self) => {
    console.log(index)
}).then(() => console.log('normal reached'))
```
