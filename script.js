// ===============================
// 🔥 Firebase imports
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ===============================
// 🔐 Firebase configuration
// ===============================
const firebaseConfig = {
    apiKey: "AIzaSyBq5EdIl3eyS3Ima3FIHfkWEnzPoczkXFc",
    authDomain: "site-boutique-96f52.firebaseapp.com",
    projectId: "site-boutique-96f52",
    storageBucket: "site-boutique-96f52.firebasestorage.app",
    messagingSenderId: "1075677172691",
    appId: "1:1075677172691:web:8caae8a9d3b455e1011526"
};

// ===============================
// 🚀 Initialisation Firebase
// ===============================
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const avisCol = collection(db, "avis");

// ===============================
// 📌 Header sticky au scroll
// ===============================
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
        header.classList.toggle("sticky", window.scrollY > 0);
    }
});

// ===============================
// 📱 Menu mobile
// ===============================
window.toggleMenu = () => {
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        navbar.classList.toggle("active");
    }
};

// ===============================
// ✍️ Ajouter un avis
// ===============================
const formAvis = document.getElementById("avisForm");

if (formAvis) {
    formAvis.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nom = document.getElementById("nom").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!nom || !message) return;

        try {
            await addDoc(avisCol, {
                nom: nom,
                message: message,
                date: new Date()
            });

            formAvis.reset();
        } catch (error) {
            console.error("Erreur ajout avis :", error);
        }
    });
}

// ===============================
// 📢 Affichage des avis en temps réel
// ===============================
const avisContainer = document.getElementById("avisContainer");

if (avisContainer) {
    const q = query(avisCol, orderBy("date", "desc"));

    onSnapshot(q, (snapshot) => {
        avisContainer.innerHTML = "";

        snapshot.forEach((doc) => {
            const avis = doc.data();

            const div = document.createElement("div");
            div.classList.add("avis");

            div.innerHTML = `
                <h4>${avis.nom}</h4>
                <p>${avis.message}</p>
            `;

            avisContainer.appendChild(div);
        });
    });
}
