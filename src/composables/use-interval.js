export const useInterval = (cb) => {
    let internalID = null
    const stop = () => {
        if(internalID !== null) {
            clearInterval(internalID)
            internalID = null
        }
    }
    const start = (delay, callOnStart = false) => {
        stop()
        if(callOnStart) cb()
        internalID = setInterval(cb, delay)
    }
    return { start, stop }
}