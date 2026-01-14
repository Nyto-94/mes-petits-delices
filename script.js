function ouvrirGalerie(type) {
    const modale = document.getElementById('fenetreGalerie');
    const titre = document.getElementById('titreGalerie');
    const grille = document.getElementById('contenuPhotos');
    
    // On vide la grille avant de mettre les nouvelles photos
    grille.innerHTML = "";
    
    if (type === 'gateaux') {
        titre.innerText = "Toute notre gamme de Gâteaux";
        // Ajoute ici les liens vers tes photos de gâteaux
        grille.innerHTML = `
            <img src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg">
            <img src="https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg">
            <img src="https://images.pexels.com/photos/461060/pexels-photo-461060.jpeg">
        `;
    } else if (type === 'burgers') {
        titre.innerText = "Toute notre gamme Gourmet";
        grille.innerHTML = `
            <img src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg">
            <img src="https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg">
        `;
    }
    
    modale.style.display = "block";
}

function fermerGalerie() {
    document.getElementById('fenetreGalerie').style.display = "none";
}

// Pour fermer en cliquant en dehors de la fenêtre
window.onclick = function(event) {
    const modale = document.getElementById('fenetreGalerie');
    if (event.target == modale) {
        modale.style.display = "none";
    }
}
