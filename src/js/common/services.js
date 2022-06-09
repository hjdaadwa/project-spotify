    /**
     * Функция задержки
     * @param {number} ms - длительность 
     * @returns 
     */
     export const delay = (callback, ms) => {
        let timer = 0;
        return function() {
          let context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
            callback.apply(context, args);
          }, ms || 0);
        };
      }
