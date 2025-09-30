let score = 0; // Variable pour stocker le score
const image = document.getElementById('kaguya');
let isAnimating = false
let add = 1
let upgrades = [
    { 
        id: 1,
        name: "Tasukete ERIIIIN",
        description: "+2 Score per Click", 
        cost: 20, 
        effect: 2 
       },
    {   
        id: 2, 
        name: "Bunny", 
        description: "+1 Score per second", 
        cost: 50,
        effect: 1 
       },
    {   
        id: 4, 
        name: "Mokou Clicker", 
        description: "Mokou Bald", 
        cost: 5, 
        effect: 0 
       },
    {
        id: 5,
        name: "Yukari Gap Portal",
        description: "The world becomes unstable... for 15 seconds score doubled",
        cost: 222,
        effect: 1.2
       }
];

const info = document.getElementById("message-box")
const shopContainer = document.querySelector('.shop');

// Fonction pour générer les éléments de la boutique
function generateShopItems() {
    shopContainer.innerHTML = "<h2>Upgrades:</h2>"
    upgrades.forEach(upgrade => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.setAttribute('data-id', upgrade.id);

        item.innerHTML = `
            <h3>${upgrade.name}</h3>
            <p class="desc">${upgrade.description}</p>
            <p class="cost">Cost: ${upgrade.cost}</p>
            <button class="buy" data-id="${upgrade.id}">Buy</button>
        `;

        shopContainer.appendChild(item);
    });

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
                setTimeout(() => {
                    info.innerHTML= ""
                },2000)
            } else {
                info.innerHTML="Not Enough Points !";
            }
        });
    });
}
generateShopItems();


// Fonction pour appliquer l'upgrade
function applyUpgrade(upgrade) {
    switch(upgrade.id){
        case 1:
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
        case 2:
            document.getElementById("bunny-container").classList.remove("hidden");

            let bunnyinterv = setInterval(() => {
                score += upgrade.effect; // Ajoute +1 au score à chaque loop
                document.getElementById('score').textContent = score;
            }, 400);

            upgrades = upgrades.filter(u => u.id !== upgrade.id);

            const newUpgrade = {
                id: 3,
                name: "Summon Yuyuko",
                description: "Summon Yuyuko to help you!",
                cost: 100,
                effect: 5 
            };

            upgrades.push(newUpgrade); 
            shopContainer.innerHTML = ''; 
            generateShopItems();
            break;

        case 3:
            document.getElementById("yuyuko-container").classList.remove("hidden");

            let yuyuinterv = setInterval(() => {
                score += upgrade.effect;
                document.getElementById('score').textContent = score;

                // Vérifie l'image actuelle et change le GIF en conséquence
                if (image.src.includes("kaguya-boom.png")) {
                    image.src = "./images/explode300.gif"; // GIF pour Kaguya
                } else if (image.src.includes("mokou.png")) {
                    image.src = "./images/mokouboom.gif"; // GIF pour Mokou
                }
            }, 420)

            upgrades = upgrades.filter(u => u.id !== upgrade.id); // Supprime l'upgrade de la liste
            shopContainer.innerHTML = '';
            generateShopItems();
            break;
        case 4: 
            changeKaguyaButton.classList.remove("hidden")
            upgrades = upgrades.filter(u => u.id !== upgrade.id); // Supprime l'upgrade de la liste
            shopContainer.innerHTML = '';
            generateShopItems();
            break;

        case 5:
            const isDark = body.classList.contains("dark-mode")
            const yukariAudio = new Audio('./images/yukaritheme.mp3'); 
            yukariAudio.volume = 0.1; 
            yukariAudio.play();
            body.classList.add("yukari")
            add*=2
            themeToggle.classList.add("hidden");

            setTimeout(() => {
                document.body.classList.add("active");
                info.innerHTML = "The boundary between realities shifts..."
                info.style.color = "red"
                shopContainer.classList.add("hidden")
            }, 5)

            setTimeout(() => {
                body.classList.remove("active")
                setTimeout(() => {body.classList.remove("yukari")}, 200)
                info.style.color = "white"
                yukariAudio.pause();
                shopContainer.classList.remove("hidden")
                shopContainer.classList.add("fade-in");

                body.classList.add(isDark ? "dark-mode" : "light-mode");
                themeToggle.disabled=false
                themeToggle.classList.remove("hidden");
                add=add/2
                info.innerHTML = "Yukari disappears into the void"
            }, 12000)
            break;
}
}

document.getElementById('stop-music').addEventListener('click', function() {
    let song = document.getElementById("erin");
    if(song.paused){
        song.play()
    }
    else{
    song.pause(); 
    }
});

image.addEventListener('click', function () {
    if (isAnimating) return; // Ignore les clics si l'animation est en cours

    const randomChance = Math.floor(Math.random() * 100) + 1;

    if (randomChance === 1) {
        triggerJumpscare();
    }
       

    isAnimating = true; // Désactive les clics
    score += add; // Incrémente le score
    document.getElementById('score').textContent = score; // Met à jour l'affichage du score

    const boom = document.getElementById("boom");
    boom.currentTime = 0;
    boom.volume = 0.2;
    boom.play();

    // Détermine quel GIF jouer en fonction de l'image actuelle
    let explodeGif;
    if (image.src.includes("kaguya-boom.png") || image.src.includes("explode300.gif")) {
        explodeGif = "./images/explode300.gif"; // GIF pour l'image de base
    } else if (image.src.includes("mokou.png") || image.src.includes("boom.gif")) {
        explodeGif = "./images/mokouboom.gif"; // GIF pour l'image alternative
    }

    // Change la source de l'image pour le GIF animé
    image.src = explodeGif;

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
        if (explodeGif.includes("explode300.gif")) {
            image.src = "https://media.tenor.com/Xk-mBqoSLX0AAAAe/kaguya-boom.png"; // Image de base
        } else if (explodeGif.includes("boom.gif")) {
            image.src = "./images/mokou.png"; // Image alternative
        }
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
            ? "Light Mode"
            : "Dark Mode";
      });


const changeKaguyaButton = document.getElementById('change-kaguya');
const kaguyaImage = document.getElementById('kaguya');     
const kaguyaImages = [
        "https://media.tenor.com/Xk-mBqoSLX0AAAAe/kaguya-boom.png", // Image par défaut
        "./images/mokou.png", 
      ];
let currentImageIndex = 0;

changeKaguyaButton.addEventListener('click', function () {
    currentImageIndex = (currentImageIndex + 1) % kaguyaImages.length;
      
    kaguyaImage.src = kaguyaImages[currentImageIndex];
    });

function triggerJumpscare() {
    const jumpscareContainer = document.getElementById("jumpscare-container");
    const jumpscareImage = document.getElementById("jumpscare-image");

    // Définit l'image du jumpscare comme l'image actuelle de Kaguya ou Mokou
    jumpscareImage.src = image.src;

    jumpscareContainer.classList.remove("hidden"); // Supprime la classe "hidden"
    jumpscareContainer.classList.add("active"); // Ajoute la classe "active"

    // Cache le jumpscare après 500 ms (moins d'une seconde)
    setTimeout(() => {
        jumpscareContainer.classList.remove("active"); // Supprime la classe "active"
        jumpscareContainer.classList.add("hidden"); // Ajoute la classe "hidden"
    }, 300); // Durée du jumpscare (500 ms)
}
