console.log("\x1b[35m%s\x1b[0m", `          c,_.--.,y`);
console.log("\x1b[34m%s\x1b[0m", `            7 a.a(`);
console.log("\x1b[34m%s\x1b[0m", `           (   ,_Y)`);
console.log("\x1b[34m%s\x1b[0m", `           :  '---;`);
console.log("\x1b[34m%s\x1b[0m", `       ___.'\\.  - (`);
console.log("\x1b[34m%s\x1b[0m", `     .'"""S,._'--'_2..,_`);
console.log("\x1b[34m%s\x1b[0m", `     |    ':::::=:::::  \\`);
console.log("\x1b[34m%s\x1b[0m", `     .     f== ;-,---.' T`);
console.log("\x1b[34m%s\x1b[0m", `      Y.   r,-,_/_      |`);
console.log("\x1b[34m%s\x1b[0m", `      |:\\___.---' '---./`);
console.log("\x1b[34m%s\x1b[0m", `      |'              )`);
console.log("\x1b[34m%s\x1b[0m", `       \\             ,`);
console.log("\x1b[34m%s\x1b[0m", `       ':;,.________.;L`);
console.log("\x1b[34m%s\x1b[0m", `       /  '---------' |`);
console.log("\x1b[34m%s\x1b[0m", `       |              \\`);
console.log("\x1b[34m%s\x1b[0m", `       L---'-,--.-'--,-'`);
console.log("\x1b[34m%s\x1b[0m", `        T    /   \\   Y`);
console.log("\x1b[34m%s\x1b[0m", `        |   Y    ,   |`);
console.log("\x1b[34m%s\x1b[0m", `        |   \\    (   |`);
console.log("\x1b[34m%s\x1b[0m", `        (   )     \\,_L`);
console.log("\x1b[34m%s\x1b[0m", `        7-./      )  `);
console.log("\x1b[31m%s\x1b[0m", `       /  _(      '._  \\`);
console.log("\x1b[31m%s\x1b[0m", `       made by insert.r on discord`);

const readline = require('readline');
const axios = require('axios');

function cleanInput(text) {
    // Supprimer les retours à la ligne et autres caractères indésirables
    return text.trim();
}

function blue(text) {
    return '\x1b[34m' + text + '\x1b[0m';
}

function green(text) {
    return '\x1b[32m' + text + '\x1b[0m';
}

function orange(text) {
    return '\x1b[33m' + text + '\x1b[0m';
}

function pink(text) {
    return '\x1b[35m' + text + '\x1b[0m';
}

function displayMenu() {
    console.log('Menu:');
    console.log(orange('1) IP Lookup'));
    console.log(pink('2) Phone Lookup (Format : +33683179299)'));
}

async function phoneLookup(phoneNumber) {
    try {
        console.log(green('Détails pour le numéro de téléphone ' + phoneNumber + ':'));
        console.log(green('Pays: France'));
        console.log(green('Opérateur: Orange'));
        // Fermer l'interface readline
        reLookup();
    } catch (error) {
        console.error('Une erreur est survenue :', error.message);
    }
}

async function ipLookup(ipAddress) {
    try {
        const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
        const data = response.data;
        console.log(green(`IP Lookup pour : ${ipAddress}`));
        console.log(green('Pays:'), data.country);
        console.log(green('Ville:'), data.city);
        console.log(green('Latitude:'), data.lat);
        console.log(green('Longitude:'), data.lon);
        // Ajoutez d'autres informations que vous souhaitez afficher
        reLookup();
    } catch (error) {
        console.error('Une erreur est survenue :', error.message);
    }
}

function reLookup() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question(blue('Voulez-vous rechercher une autre adresse IP ou numéro de téléphone ? (Oui/Non) '), (response) => {
        // Fermer l'interface readline
        rl.close();
        response = cleanInput(response.trim().toLowerCase());
        if (response === 'oui') {
            startSearch();
        } else if (response === 'non') {
            console.log('Fermeture du programme.');
        } else {
            console.log('Réponse invalide. Veuillez répondre par "Oui" ou "Non".');
            reLookup();
        }
    });
}

function startSearch() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Choisissez une option du menu : ', (option) => {
        option = cleanInput(option.trim());
        if (option === '1') {
            rl.question(blue('Entrez l\'adresse IP à rechercher : '), (ipAddress) => {
                rl.close();
                ipLookup(cleanInput(ipAddress.trim()));
            });
        } else if (option === '2') {
            rl.question(blue('Entrez le numéro de téléphone à rechercher : '), (phoneNumber) => {
                rl.close();
                phoneLookup(cleanInput(phoneNumber.trim()));
            });
        } else {
            console.log('Option invalide. Veuillez choisir une option valide.');
            startSearch();
        }
    });
}

displayMenu();

startSearch();
