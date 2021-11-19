document.addEventListener("mousemove", parallax)
function parallax(e) {
    // It moves every svg according to its data value
    document.querySelectorAll(".moving-parallax").forEach(move => {
        let movingValue = move.getAttribute("data-value")
        let x = e.clientX * movingValue/250
        let y = e.clientY * movingValue/250
        move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)"
    })
}