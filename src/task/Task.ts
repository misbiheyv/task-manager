export default class Task {
    
    protected execDuration: number;

    protected sleepDuration: number;

    constructor(execDuration: number, sleepDuration: number) {
        this.execDuration = execDuration;
        this.sleepDuration = sleepDuration;
    }

    public changeExecDuration(v: number) {
        this.execDuration = v;
    }

    public changeSleepDuration(v: number) {
        this.sleepDuration = v;
    }

    public forEach<T>(iter: IterableIterator<T>, fn: (el: T, index: number, self: typeof iter) => void): Promise<unknown> {
        return this.executor(this._forEach(iter, fn))
    }

    private *_forEach<T>(
        iter: IterableIterator<T>, 
        fn: (el: T, index: number, self: typeof iter) => void
    ): Generator {

        let 
            i = 0,
            time = Date.now();

        for (const el of iter) {
            fn(el, i++, iter);
    
            if (Date.now() - time > this.execDuration) {
                yield;
                time = Date.now();
            }
        }
    }    

    private sleep(ms: number): Promise<never> {
        return new Promise(res => setTimeout(res, ms))
    }

    private async executor(iter: IterableIterator<unknown>, value?: any): Promise<unknown> {
        await this.sleep(this.sleepDuration);
    
        let 
            res         = iter.next(value),
            promisified = Promise.resolve(res);
    
        if (res.done) return promisified;
    
        return promisified
            .then((res) => {
                return this.executor(iter, res.value)
            })
    
            .catch((err) => {
                if (typeof iter.throw === 'function') {
                    res = iter.throw(err)
                }
    
                if (res.done) return res.value;
    
                return this.executor(iter, res.value);
            })
    }
}