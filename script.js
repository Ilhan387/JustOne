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

const listesMots = Array.from({ length: 150 }, () =>
    Array.from({ length: 5 }, () => motsFrancais[Math.floor(Math.random() * motsFrancais.length)])
);

console.log(listesMots);

