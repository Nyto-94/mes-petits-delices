import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBq5EdIl3eyS3Ima3FIHfkWEnzPoczkXFc",
  authDomain: "site-boutique-96f52.firebaseapp.com",
  projectId: "site-boutique-96f52",
  storageBucket: "site-boutique-96f52.firebasestorage.app",
  messagingSenderId: "1075677172691",
  appId: "1:1075677172691:web:8caae8a9d3b455e1011526",
  measurementId: "G-Q2MQR2P0WS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const avisCol = collection(db, "avis");

// NAVIGATION & MENU
window.toggleMenu = function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

window.addEventListener('scroll', function(){
    const header = document.querySelector('header');
    header.classList.toggle("sticky", window.scrollY > 0);
});

// GALERIE
window.ouvrirGalerie = function(type) {
    const modale = document.getElementById('fenetreGalerie');
    const titre = document.getElementById('titreGalerie');
    const grille = document.getElementById('contenuPhotos');
    grille.innerHTML = "";
    if (type === 'gateaux') {
        titre.innerText = "Nos Spécialités Sucrées";
        grille.innerHTML = `<div><img src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg" style="width:100%"><p>Gâteau Royal</p></div>`;
    } else {
        titre.innerText = "Nos Burgers Gourmet";
        grille.innerHTML = `<div><img src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg" style="width:100%"><p>Le Classique</p></div>`;
    }
    modale.style.display = "block";
}

window.fermerGalerie = function() {
    document.getElementById('fenetreGalerie').style.display = "none";
}

// SYSTÈME AVIS
const form = document.querySelector('#formAvis');
if(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            await addDoc(avisCol, {
                name: form.name.value,
                message: form.message.value,
                date: new Date()
            });
            form.reset();
            alert("Merci ! Votre avis est en ligne.");
        } catch (err) { console.error(err); }
    });
}

const q = query(avisCol, orderBy("date", "desc"));
onSnapshot(q, (snapshot) => {
    const liste = document.getElementById('listeAvis');
    if(liste) {
        liste.innerHTML = "";
        snapshot.forEach((doc) => {
            const data = doc.data();
            liste.innerHTML += `<div class="bulle-avis"><p>"${data.message}"</p><h4>- ${data.name}</h4></div>`;
        });
    }
});
