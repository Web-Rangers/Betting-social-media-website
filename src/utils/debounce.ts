export default function debounce(func: Function, delay: number) {
    let timer: NodeJS.Timeout;
    return function (this: Function) {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args)
        }, delay);
    }
}