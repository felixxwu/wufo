export function debounce<Fn extends (...args: any[]) => any>(func: Fn, timeout = 300) {
    let timer: NodeJS.Timeout
    return (...args: Parameters<Fn>) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(...args)
        }, timeout)
    }
}
