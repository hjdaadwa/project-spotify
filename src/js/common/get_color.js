import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs'


/**
 * Присваивает новый цвет фону объекта, исходя из переданного изображения
 * @param {HTMLImageElement} img - изображение, которое находится в DOM дереве 
 * @param {HTMLElement} target - элемент, чей фон требуется сменить
 */
const getColor = (img, target) => {
    const colorThief = new ColorThief();
    if (img.complete) {
        const colors = colorThief.getColor(img);
        target.style.backgroundColor = rgbToHex(...colors);
    } else {
        img.addEventListener('load', function() {
            const colors = colorThief.getColor(img);
            target.style.backgroundColor = rgbToHex(...colors);
        })
    }
}

/**
 * Переводит из rgb формата в hex
 * @param {number} r 
 * @param {number} g 
 * @param {number} b 
 * @returns {string}
 */
const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('');


/**
 * Генератор рандмоного цвета
 * @returns {string}
 */
export const randomColor = () => {
    const r = Math.floor(Math.random() * (256));
    const g = Math.floor(Math.random() * (256));
    const b = Math.floor(Math.random() * (256));
    const color = rgbToHex(r, g, b);
    return color;
}

export default getColor