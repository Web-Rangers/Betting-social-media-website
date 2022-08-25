export default function shortenNumber(number: number, decimals?: number) {
    switch (true) {
        case (number > 999999):
            return `${(number / 1000000).toFixed(decimals ? decimals : 1)}m`
        case (number > 999):
            return `${(number / 1000).toFixed(decimals ? decimals : 1)}k`
        default:
            return number
    }
}