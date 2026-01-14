// 1. Gestion du menu qui change de couleur au scroll
window.addEventListener('scroll', function(){
    const header = document.querySelector('header');
    header.classList.toggle("sticky", window.scrollY > 0);
});

// 2. Fonction pour ouvrir/fermer le menu sur Mobile
function toggleMenu(){
    const menuToggle = document.querySelector('.menuToggle');
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

// 3. Fonction pour ouvrir la galerie quand on clique sur une image
function ouvrirGalerie(type) {
    const modale = document.getElementById('fenetreGalerie');
    const titre = document.getElementById('titreGalerie');
    const grille = document.getElementById('contenuPhotos');
    
    // On vide la grille avant de mettre les nouvelles photos
    grille.innerHTML = "";
    
    if (type === 'gateaux') {
        titre.innerText = "Toute notre gamme de Gâteaux";
        grille.innerHTML = `
            <img src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg">
            <img src="https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg">
            <img src="https://images.pexels.com/photos/461060/pexels-photo-461060.jpeg">
            <img src="https://images.pexels.com/photos/132694/pexels-photo-132694.jpeg">
        `;
    } else if (type === 'burgers') {
        titre.innerText = "Toute notre gamme Gourmet";
        grille.innerHTML = `
            <img src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg">
            <img src="https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg">
            <img src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg">
        `;
    }
    
    modale.style.display = "block";
}

// 4. Fonction pour fermer la galerie
function fermerGalerie() {
    document.getElementById('fenetreGalerie').style.display = "none";
}

// 5. Fermer la galerie si on clique sur le fond noir
window.onclick = function(event) {
    const modale = document.getElementById('fenetreGalerie');
    if (event.target == modale) {
        modale.style.display = "none";
    }
}
