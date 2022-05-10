import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs'


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

const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('');

export const randomColor = () => {
    const r = Math.floor(Math.random() * (256));
    const g = Math.floor(Math.random() * (256));
    const b = Math.floor(Math.random() * (256));
    const color = rgbToHex(r, g, b);
    return color;
}

export default getColor