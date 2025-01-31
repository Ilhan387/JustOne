//cartes : Liste de 110 elements qui sont des listes de 5 strings
//joueurs : Liste de 5 joueurs
//score : int
//cartes_en_jeu : Liste de 13 elements qui sont des listes de 5 strings
//cartes_gagne : Liste de cartes bien devinées  qui sont des listes de 5 strings

//choisirCartes : Choisit 13 cartes parmi les 110
//choisirJoueur : Choisit aleatoirement un joueur

//choisirCartesJoueur : Choisit 1 carte parmi les 13 et la supprime des 13

//choisirMot : Chosit aleatoirement entre 1 et 5 le mot que les autres doivent deviner

//changerMot : Permet de choisir un autre mot parmi les 4 autres

//saisirMot : Prend le joueur en parametres et saisit le mot

//CompareMots : Prend 4 mots et retourne les mots sans identical et invalid clues

//ajouteCarteGagne : ajoute la carte gagne dans la liste des cartes gagnees

//comparePairMot : Prend juste 2 mots et fait les tests

//canceled : Teste si la liste sans identical et invalid clues est vide. Si oui replace la carte dans le paquet et va a la endPhase

//guess : Prend les indices valide, les affiche et demande a l'utilisateur de choisir le mot et renvoie true ou false si le joueur trouve le bon mot

//testDernierTour : Si il reste 1 carte parmi les 13 il en supprime une 

//choisirJoueurTourSuivant : Choisit le joueur a la gauche de celui choisit par choisirJoueur

//finJeu : teste si le paquet de 13 cartes est vide pour continuer le jeu ou non


const motsFrancais = [
    "bonjour", "maison", "chat", "soleil", "ordinateur",
    "voiture", "école", "fleur", "musique", "fromage",
    "pomme", "livre", "rivière", "montagne", "ciel",
    "forêt", "mer", "poisson", "oiseau", "vélo",
    "hiver", "été", "printemps", "automne", "fenêtre",
    "porte", "chaise", "table", "chocolat", "étoile",
    "lune", "arbre", "ami", "famille", "travail",
    "vacances", "train", "avion", "route", "pont",
    "jardin", "chemin", "pain", "sourire", "ballon",
    "bicyclette", "cheval", "danse", "histoire", "musée",
    "théâtre", "cinéma", "photo", "voyage", "aventure",
    "cascade", "pluie", "neige", "orage", "vent",
    "feuille", "herbe", "lac", "mont", "colline",
    "drapeau", "chant", "écriture", "poème", "roman",
    "journal", "lettre", "message", "clavier", "écran",
    "lampe", "horloge", "montre", "rêve", "nuit",
    "matin", "midi", "soir", "minuit", "heure",
    "seconde", "minute", "courir", "marcher", "sauter",
    "nager", "voler", "écouter", "regarder", "parler",
    "écrire", "dessiner", "chanter", "danser", "rire",
    "pleurer", "penser", "imaginer", "créer", "jouer",
    "dessin", "peinture", "sculpture", "photographie", "cuisine",
    "recette", "ingrédient", "goût", "odeur", "texture",
    "restaurant", "boulangerie", "marché", "commerce", "boutique",
    "magasin", "supermarché", "centre", "ville", "campagne",
    "village", "quartier", "rue", "avenue", "boulevard",
    "place", "statue", "fontaine", "pont", "gare"
];

const cartes = Array.from({ length: 150 }, () =>
    Array.from({ length: 5 }, () => motsFrancais[Math.floor(Math.random() * motsFrancais.length)])
)

function choisirCartes(liste, nombre) {
    return liste.sort(() => Math.random() - 0.5).slice(0, nombre);
}


let cartes_en_jeu = choisirCartes(cartes, 13);
let cartes_gagne = [];
let joueurs = ["J1", "J2", "J3", "J4", "J5"];

function choisirJoueur(liste){
    return liste[Math.floor(Math.random() * liste.length)];
}

function choisirCartesJoueur(liste) {
    if (liste.length === 0) return null; // Vérifie si la liste est vide
    const index = Math.floor(Math.random() * liste.length); // Choisit un index aléatoire
    return liste.splice(index, 1)[0]; // Supprime l'élément et le retourne en cdc
}

function choisirMot(liste){
    const index = Math.floor(Math.random() * liste.length); // Choisit un index aléatoire
    return liste[index] // Supprime l'élément et le retourne en cdc 
}

function changerMot(liste,mot){
    const index = Math.floor(Math.random() * liste.length);
    autre_mot = liste[index];
    if(autre_mot === mot){
        changerMot(liste,mot);
    }
}

let motsSaisies = [] ; 

//fait saisir une seul personne le mot 
function saisirMot(index){
    let word = prompt(`Entrez mot pour faire deviner le joueur:`);
    motsSaisies[index]= word;
    //for testing purposes
    console.log("Your words:", motsSaisies);
}

//faire saisir tout le monde les mots 
function saisirMotToutLeMonde(){
    for (let i = 0; i < 4; i++) {
        let word = prompt(`Entrez mot joueur ${i + 1}:`);
        motsSaisies[i]= word;
    }
    //for testing purposes
console.log("Your words:", motsSaisies);
}

// returns 1 if they are identical and 0 if they are different
function comparePairMot(word1, word2) {
    return word1.toLowerCase() === word2.toLowerCase();
}

// filtre les mots identiques
function compareMots(words) {
    let uniqueWords = [];
    for (let i = 0; i < words.length; i++) {
        let isDuplicate = false;
        for (let j = 0; j < uniqueWords.length; j++) {
            if (comparePairMot(words[i], uniqueWords[j])) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate && words[i].trim() !== "") {
            uniqueWords.push(words[i]);
        }
    }
    return uniqueWords;
}

// check si la liste de mots filtrés est vide
function canceled(words) {
    let filteredWords = compareMots(words);
    if (filteredWords.length === 0) {
        console.log("Liste de mots filtrés est vide");
        //Si oui replace la carte dans le paquet et va a la endPhase A FAIRE 
        return true;
    }
    return false;
    
}

function guess(indices_valides, mot_a_trouver){
    for(let i = 0; i < indices_valides.length; i++){
        console.log(indices_valides[i]);
    }
    let mot = prompt("Saisir la proposition");
    if(mot_a_trouver == mot){
        return true;
    }
    return false;

}

function ajouteCarteGagne(carte,liste){
    liste.push(carte);
}

function testDernierTour(cartes,cartes_gain){
    if(cartes.length == 1){
        if(cartes_gain.length != 0){
            cartes_gain.splice(index, 0);
        }
    }
}

//choisirJoueurTourSuivant : Choisit le joueur a la gauche de celui choisit par choisirJoueur
//based on current guesser chooses the guesser in the next game
function choisirJoueurTourSuivant(currentJouer){
    return ((currentJouer+1)%5);
}
// teste si le paquet de 13 cartes est vide pour continuer le jeu ou non
//returns true if on a fini le jeu false if not
function finJeu(paquet){
    if (paquet.length === 0){
        console.log("Vous avez terminé le jeu");
        return true;
    }
    console.log("The game must go on! Next round");
    return false;
}
