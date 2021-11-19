// This modes is effective only when width is abovw 1200px
if(window.innerWidth > 1200) {
    $('#fullpage').fullpage({
        sectionSelector: '.vertical-scrolling',
        navigation: true,
        slidesNavigation: true,
        controlArrows: false,
    })
}

// Every time the window is resized, the page reloads
window.addEventListener('resize', (event => {
    location.reload()
}))



