import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBq5EdIl3eyS3Ima3FIHfkWEnzPoczkXFc",
  authDomain: "site-boutique-96f52.firebaseapp.com",
  projectId: "site-boutique-96f52",
  storageBucket: "site-boutique-96f52.firebasestorage.app",
  messagingSenderId: "1075677172691",
  appId: "1:1075677172691:web:8caae8a9d3b455e1011526"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const avisCol = collection(db, "avis");

// --- TES FONCTIONS D'ORIGINE ---
window.addEventListener('scroll', function(){
    const header = document.querySelector('header');
    header.classList.toggle("sticky", window.scrollY > 0);
});

window.toggleMenu = function(){
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

window.ouvrirGalerie = function(type) {
    const modale = document.getElementById('fenetreGalerie');
    const titre = document.getElementById('titreGalerie');
    const grille = document.getElementById('contenuPhotos');
    grille.innerHTML = "";
    if (type === 'gateaux') {
        titre.innerText = "Nos Spécialités Sucrées";
        grille.innerHTML = `<div><img src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg"><p>Gâteau Royal</p></div><div><img src="https://images.pexels.com/photos/2144112/pexels-photo-2144112.jpeg"><p>Tarte Fraise</p></div>`;
    } else if (type === 'burgers') {
        titre.innerText = "Nos Burgers Gourmet";
        grille.innerHTML = `<div><img src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg"><p>Le Classique</p></div><div><img src="https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg"><p>Le Montagnard</p></div>`;
    }
    modale.style.display = "block";
}

window.fermerGalerie = function() {
    document.getElementById('fenetreGalerie').style.display = "none";
}

// --- GESTION DES AVIS ---
const form = document.querySelector('#formAvis');
if(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await addDoc(avisCol, {
            name: form.name.value,
            message: form.message.value,
            date: new Date()
        });
        form.reset();
    });
}

onSnapshot(query(avisCol, orderBy("date", "desc")), (snapshot) => {
    const listeAvis = document.getElementById('listeAvis');
    if(listeAvis) {
        listeAvis.innerHTML = ""; 
        snapshot.forEach((doc) => {
            const data = doc.data();
            listeAvis.innerHTML += `
                <div class="bulle-avis">
                    <p>"${data.message}"</p>
                    <h4>- ${data.name}</h4>
                </div>`;
        });
    }
});
