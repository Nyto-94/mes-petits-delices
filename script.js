import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// TA CONFIGURATION (Image 1)
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

// --- NAVIGATION DE BASE ---
window.toggleMenu = function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('active');
}

window.addEventListener('scroll', function(){
    const header = document.querySelector('header');
    header.classList.toggle("sticky", window.scrollY > 0);
});

// --- GALERIE DE BASE ---
window.ouvrirGalerie = function(type) {
    const modale = document.getElementById('fenetreGalerie');
    const grille = document.getElementById('contenuPhotos');
    grille.innerHTML = "";
    if (type === 'gateaux') {
        grille.innerHTML = `<img src="https://images.pexels.com/photos/1070850/pexels-photo-1070850.jpeg" style="width:100%">`;
    } else {
        grille.innerHTML = `<img src="https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg" style="width:100%">`;
    }
    modale.style.display = "block";
}

window.fermerGalerie = function() {
    document.getElementById('fenetreGalerie').style.display = "none";
}

// --- SYSTÈME D'AVIS FIREBASE ---
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
        } catch (err) { console.error(err); }
    });
}

onSnapshot(query(avisCol, orderBy("date", "desc")), (snapshot) => {
    const liste = document.getElementById('listeAvis');
    liste.innerHTML = "";
    snapshot.forEach((doc) => {
        const data = doc.data();
        liste.innerHTML += `<div class="bulle-avis"><p>"${data.message}"</p><h4>- ${data.name}</h4></div>`;
    });
});
