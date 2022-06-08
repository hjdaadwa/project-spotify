/**
 * Конвертирует строку с количеством миллисекунд в строку в формате MM:SS
 * @param {string} ms - миллисекунды 
 */
export const convertMsToMTime = (ms) => {
    const durationMs = new Date(ms);
    let durationSec =  durationMs.getSeconds();
    if (durationSec <= 9) {
        durationSec = '0' + durationSec;
    }

    return durationMs.getMinutes() + ':' + durationSec;
}

/**
 * Генерация рандомного цвета hex
 * @returns {string} 
 */
export const getRandomColorHex = () => '#' + Math.random().toString(16).slice(-6);
