const constants = {
    routes: {
        index: '/',
        search: '/search(/:id)',
        playlist: '/playlist/:id',
        album: '/album/:id',
        artist: '/artist/:id',
        category: '/category/:id/:name',
        collection: '/collection/:id',
    },
    app: document.querySelector('.main-container'),
    main: document.querySelector('.main'),
    topPanel: document.querySelector('.top-panel'),
    other: document.querySelector('.top-panel__other'),
}

export default constants