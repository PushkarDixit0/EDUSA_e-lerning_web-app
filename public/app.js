document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector("#header .hamburger")
    const mobileMenu = document.querySelector("#header .nav-list ul")
    const menuLinks = document.querySelectorAll("#header .nav-list ul a")

    if (!hamburger || !mobileMenu) {
        return
    }

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active")
        mobileMenu.classList.toggle("active")
    })

    menuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active")
            mobileMenu.classList.remove("active")
        })
    })
})
