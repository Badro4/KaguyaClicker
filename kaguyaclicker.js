let score = 0; // Variable pour stocker le score
const image = document.getElementById('kaguya');
let isAnimating = false
let add = 1
let upgrades = [
    { id: 1, name: "Tasukete ERIIIIN",description:"Obtain +2 Clicks", cost: 20, effect: 2 },
];
const info = document.getElementById("message-box")
const shopContainer = document.querySelector('.shop');

// Fonction pour générer les éléments de la boutique
function generateShopItems() {
    upgrades.forEach(upgrade => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('data-id', upgrade.id);

        item.innerHTML = `
            <h3>${upgrade.name}</h3>
            <p>${upgrade.description}</p>
            <p>Cost: ${upgrade.cost}</p>
            <button class="buy" data-id="${upgrade.id}">Buy</button>
        `;

        shopContainer.appendChild(item);
    });
}
generateShopItems();
const buyButtons = document.querySelectorAll('.buy');



buyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const upgradeId = parseInt(button.getAttribute('data-id')); // Récupère l'ID de l'upgrade
        const upgrade = upgrades.find(u => u.id === upgradeId); // Trouve l'upgrade correspondante

        if (score >= upgrade.cost) { // Vérifie si le score est suffisant
            score -= upgrade.cost; // Déduit le coût du score
            document.getElementById('score').textContent = score; // Met à jour l'affichage du score
            applyUpgrade(upgrade); // Applique l'upgrade
            info.innerHTML = `Obtained : ${upgrade.name}`
        } else {
            info.innerHTML="Not Enough Points !";
        }
    });
});

// Fonction pour appliquer l'upgrade
function applyUpgrade(upgrade) {
    switch(upgrade.id){
        case 1:
            console.log(`Effet appliqué : +${upgrade.effect} Click`);
            add += upgrade.effect;

            let gif = document.getElementById("erin-container");
            gif.classList.remove("hidden");

            let song = document.getElementById("erin");
            song.volume = 0.2;

            // Ne joue la musique que si elle n'est pas déjà en cours de lecture
            if (song.paused) {
                song.loop = true; // Active la lecture en boucle
                song.play();
            }
            break;
    }
}

document.getElementById('stop-music').addEventListener('click', function() {
    let song = document.getElementById("erin");
    if(song.paused){
        song.play()
    }
    else{
    song.pause(); // Arrête la musique
    }
});


image.addEventListener('click', function() {
    if (isAnimating) return; // Ignore les clics si l'animation est en cours

    isAnimating = true; // Désactive les clics
    score+=add; // Incrémente le score
    document.getElementById('score').textContent = score; // Met à jour l'affichage du score
    const boom = document.getElementById("boom")
    boom.currentTime = 0;
    boom.volume = 0.2
    boom.play()

    // Change la source de l'image pour le GIF animé
    image.src = "/WebProjects/images/explode300.gif";

    const plusOne = document.createElement('span');
    plusOne.classList.add('plus-one');
    plusOne.textContent = `+${add}`;

    // Ajoute l'élément "+1" au conteneur
    image.parentElement.appendChild(plusOne);

    // Supprime l'élément "+1" après la fin de l'animation
    plusOne.addEventListener('animationend', () => {
        plusOne.remove();
    });

    // Réinitialise la source de l'image après la durée du GIF
    setTimeout(() => {
        image.src = "https://media.tenor.com/Xk-mBqoSLX0AAAAe/kaguya-boom.png";
        isAnimating = false; // Réactive les clics
    }, 450); // Délai correspondant à la durée du GIF (en millisecondes)
});

const themeToggle = document.getElementById("theme-toggle");
      const body = document.body;

      themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");
        body.classList.toggle("light-mode");

        themeToggle.textContent =
          body.classList.contains("dark-mode")
            ? "Switch to Light Mode"
            : "Switch to Dark Mode";
      });