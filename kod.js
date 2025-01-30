let isImageHidden = false;
let rotationAngle = 0;

function showSection(sectionId) {
    document.querySelectorAll('.content').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    if (sectionId === 'obavijest') {
        alert("2. kolokvij - grupa B");
    } else if (sectionId === 'slika') {
        toggleImage();
    } else if (sectionId === 'rezultati') {
        // Kada se odabere 'Rezultati', prikazujemo podatke u JSON formatu
        if (rezultat.ime && rezultat.prezime && rezultat.kolegij && rezultat.bodovi >= 0) {
            document.getElementById("jsonDisplay").style.display = "block";
            document.getElementById("jsonData").textContent = JSON.stringify(rezultat, null, 4); // Formatirano za čitljivost
        } else {
            document.getElementById("jsonDisplay").style.display = "none";
        }
    }
}

function toggleImage() {
    const image = document.getElementById("slika");

    if (isImageHidden) {
        // Prikazujemo sliku i rotiramo je za 90 stupnjeva
        rotationAngle = (rotationAngle + 90) % 360;
        image.style.transform = `rotate(${rotationAngle}deg)`;
        image.classList.remove("hidden");
    } else {
        // Sakrijemo sliku pomoću CSS klase
        image.classList.add("hidden");
    }

    isImageHidden = !isImageHidden;
}

function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('current-time').textContent = `${hours}:${minutes}`;
}

// Inicijalizacija objekta 'rezultat'
let rezultat = {
    ime: "",
    prezime: "",
    kolegij: "",
    bodovi: 0,
    ocjena: ""
};

// Funkcija za preuzimanje podataka iz forme
function preuzmiPodatkeIzForme() {
    // Preuzimanje podataka iz forme
    let ime = document.getElementById("ime").value;
    let prezime = document.getElementById("prezime").value;
    let kolegij = document.getElementById("kolegij").value;
    let bodovi = parseInt(document.getElementById("bodovi").value);

    // Ažuriranje objekta 'rezultat' s podacima iz forme
    rezultat.ime = ime;
    rezultat.prezime = prezime;
    rezultat.kolegij = kolegij;
    rezultat.bodovi = bodovi;

    // Izračun ocjene na temelju bodova
    rezultat.ocjena = izracunajOcjenu(bodovi);

    // Provjera ocjene, ako je 1 ne prikazuj podatke
    if (rezultat.ocjena > 1) {
        // Prikazivanje rezultata u HTML-u
        document.getElementById("rezIme").textContent = rezultat.ime;
        document.getElementById("rezPrezime").textContent = rezultat.prezime;
        document.getElementById("rezKolegij").textContent = rezultat.kolegij;
        document.getElementById("rezBodovi").textContent = rezultat.bodovi;
        document.getElementById("rezOcjena").textContent = rezultat.ocjena;

        // Prikazivanje div-a s rezultatima
        document.getElementById("rezultatiDisplay").style.display = "block";
    } else {
        // Ako je ocjena 1, sakrij rezultate
        document.getElementById("rezultatiDisplay").style.display = "none";
    }
}

// Funkcija za izračun ocjene
function izracunajOcjenu(bodovi) {
    if (bodovi < 0 || bodovi > 40) {
        return "Bodovi moraju biti između 0 i 40";
    }

    let ocjena;

    if (bodovi >= 36) {
        ocjena = 5;
    } else if (bodovi >= 31) {
        ocjena = 4;
    } else if (bodovi >= 21) {
        ocjena = 3;
    } else if (bodovi >= 11) {
        ocjena = 2;
    } else {
        ocjena = 1;
    }

    return ocjena;
}

// Event listener za automatski izračun ocjene prilikom promjene bodova
document.getElementById("bodovi").addEventListener("input", function() {
    let bodovi = parseInt(this.value);
    let ocjena = izracunajOcjenu(bodovi);

    // Ažuriranje polja za ocjenu
    document.getElementById("ocjena").value = ocjena > 1 ? ocjena : "";

    // Ako je ocjena 1, sakrij rezultate
    if (ocjena === 1) {
        document.getElementById("rezultatiDisplay").style.display = "none";
    } else {
        document.getElementById("rezultatiDisplay").style.display = "block";
    }
});

setInterval(updateTime, 60000);
updateTime();
