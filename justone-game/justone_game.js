const fs = require('fs');
const readline = require('readline');

// async prompt helper
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const promptAsync = (query) => {
    return new Promise((resolve) => {
        rl.question(query, (answer) => resolve(answer.trim()));
    });
};

// creation des carted depuis les mots dans words.txt
async function creerCartesDepuisFichier(fichier, nombreCartes) {
    try {
        const contenu = fs.readFileSync(fichier, 'utf-8');
        const mots = contenu.split('\n').map(word => word.trim()).filter(word => word);
        const motsMelanges = mots.sort(() => Math.random() - 0.5);

        const cartes = [];
        for (let i = 0; i < nombreCartes; i++) {
            const carte = motsMelanges.splice(0, 5);
            if (carte.length === 5) cartes.push(carte);
        }

        return cartes;
    } catch (error) {
        console.error("Erreur lors de la lecture du fichier :", error);
        process.exit(1);
    }
}

// helper functions
const choisirMot = (carte) => {
    const index = Math.floor(Math.random() * carte.length);
    return [carte[index], index + 1];
};

const compareMots = (words) => {
    return [...new Set(words.map(word => word.toLowerCase().trim()))].filter(word => word);
};

async function saisirIndice(joueur) {
    return await promptAsync(`${joueur}, entrez votre indice : `);
}

async function saisirIndices(joueurs) {
    let indices = [];
    for (const joueur of joueurs) {
        const indice = await saisirIndice(joueur);
        indices.push(indice);
    }
    return indices;
}

async function comparerEtAnnulerIndices(indices) {
    let validIndices = [];
    let duplicates = new Set();

    for (let i = 0; i < indices.length; i++) {
        const lowerWord = indices[i].toLowerCase();
        if (indices.slice(i + 1).map(w => w.toLowerCase()).includes(lowerWord)) {
            duplicates.add(lowerWord);
        } else if (!duplicates.has(lowerWord)) {
            validIndices.push(indices[i]);
        }
    }

    return validIndices;
}

async function jouerTour(cartesEnJeu, joueurs, score, joueurActifIndex) {
    const joueurActif = joueurs[joueurActifIndex];
    console.log(`\n>>> Le joueur actif est : ${joueurActif} <<<`);

    const carte = cartesEnJeu.shift();
    const [motMystere, position] = choisirMot(carte);

    console.log(`Le mot Mystère se trouve à la position ${position} de la carte.`);
    console.log(`Les mots de la carte sont : ${carte.join(", ")}`);

    const joueursDonneurs = joueurs.filter(j => j !== joueurActif);
    const indices = await saisirIndices(joueursDonneurs);
    const indicesValides = await comparerEtAnnulerIndices(indices);

    if (indicesValides.length === 0) {
        console.log("Tous les indices ont été annulés. Carte retournée au paquet.");
        cartesEnJeu.push(carte);
    } else {
        console.log("\nIndices valides :", indicesValides.join(", "));
        const proposition = await promptAsync(`${joueurActif}, proposez le mot à deviner : `);

        if (proposition.toLowerCase() === motMystere.toLowerCase()) {
            console.log("Bravo ! Vous avez deviné le mot !");
            score++;
        } else {
            console.log("Mauvaise réponse.");
        }
    }

    return score;
}

async function main() {
    const joueurs = ["Joueur 1", "Joueur 2", "Joueur 3", "Joueur 4", "Joueur 5"];
    const cartesEnJeu = await creerCartesDepuisFichier('words.txt', 13);
    let score = 0;
    let joueurActifIndex = 0;

    console.log("Bienvenue dans le jeu Just One !");

    while (cartesEnJeu.length > 0) {
        console.log("\n----- Nouveau Tour -----");
        score = await jouerTour(cartesEnJeu, joueurs, score, joueurActifIndex);

        // next joueur ative
        joueurActifIndex = (joueurActifIndex + 1) % joueurs.length;

        console.log(`Score actuel : ${score}`);
    }

    console.log("\nLa partie est terminée !");
    console.log(`Score final : ${score}`);
    rl.close();
}

// run le jeu
main();

