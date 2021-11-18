const mainSection = document.getElementById('mainSection')
const orangeSection = document.getElementById('orangeSection')
const cyanSection = document.getElementById('cyanSection')

if(window.innerWidth > 1200) {
    $('#fullpage').fullpage({
        sectionSelector: '.vertical-scrolling',
        navigation: true,
        slidesNavigation: true,
        controlArrows: false,
    })
}

window.addEventListener('resize', (event => {
    location.reload()
}))



