document.addEventListener("mousemove", parallax)
function parallax(e) {
    document.querySelectorAll(".moving-parallax").forEach(move => {
        let movingValue = move.getAttribute("data-value")
        let x = e.clientX * movingValue/250
        let y = e.clientY * movingValue/250
        console.log(x)
        move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)"
    })
}