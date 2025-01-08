document.addEventListener("DOMContentLoaded", function() {
    const despliegue = document.getElementById("despliegue");
    despliegue.addEventListener("click", function() {
        const nav=document.getElementById("nav");
        if (nav.style.opacity == "1") {
            nav.style.opacity = "0";
            setTimeout(() => {
                nav.style.display="none";
            },600);
        } else {
            nav.style.display="block";
            setTimeout(() => {
                nav.style.opacity = "1";
            }, 3);
            
        }
    });
});
