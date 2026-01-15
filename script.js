// Header collant au scroll
window.addEventListener('scroll', function(){
    const header = document.querySelector('header');
    header.classList.toggle("sticky", window.scrollY > 0);
});

// Menu Mobile
function toggleMenu(){
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

// Galerie avec noms
function ouvrirGalerie(type) {
    const modale = document.getElementById('fenetreGalerie');
    const titre = document.getElementById('titreGalerie');
    const grille = document.getElementById('contenuPhotos');
    
    grille.innerHTML = ""; 
    
    if (type === 'gateaux') {
        titre.innerText = "Nos Spécialités Sucrées";
        grille.innerHTML = `
            <div class="item-galerie"><img src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg"><p>Gâteau Royal Chocolat</p></div>
            <div class="item-galerie"><img src="https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg"><p>Tartelette aux Fraises</p></div>
        `;
    } else if (type === 'burgers') {
        titre.innerText = "Nos Menus Gourmands";
        grille.innerHTML = `
            <div class="item-galerie"><img src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg"><p>Le Burger Signature</p></div>
            <div class="item-galerie"><img src="https://images.pexels.com/photos/1199941/pexels-photo-1199941.jpeg"><p>Burger Montagnard</p></div>
        `;
    }
    modale.style.display = "block";
}

function fermerGalerie() {
    document.getElementById('fenetreGalerie').style.display = "none";
}
