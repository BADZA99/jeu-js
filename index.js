var mots = ["BALLON", "ÉTÉ", "HEURE", "BLANC", "COUP"];

var images = [
  ["ballon1.jpg", "ballon2.jpg", "ballon3.jpg", "ballon4.jpg"],
  ["ete1.jpg", "ete2.jpg", "ete3.jpg", "ete4.jpg"],
  ["heure1.jpg", "heure2.jpg", "heure3.jpg", "heure4.jpeg"],
  ["neige1.jpg", "blanc2.jpg", "blanc3.png", "blanc4.jpg"],
  ["coup1.jpg", "coup2.png", "coup3.jpg", "coup4.jpg"],
];

var lettres = [
  ["A", "L", "T", "E", "N", "H", "S", "L", "B", "O"],
  ["A", "É", "T", "L", "O", "H", "S", "É", "B", "N"],
  ["R", "L", "T", "E", "O", "H", "S", "E", "B", "U"],
  ["A", "L", "T", "L", "O", "B", "S", "C", "B", "N"],
  ["U", "L", "0", "L", "O", "H", "P", "É", "B", "C"],
];

// Premiere section
function initialiseNiveau(x) {
  var img = document.getElementsByClassName("imageJeu");
  for (let i = 0; i < img.length; i++) {
    var chemin = "img/";
    var image = chemin + images[x][i];
    img[i].setAttribute("src", image);
  }

  // section Choix des lettres
  var cases = document.getElementsByClassName("choix");
  for (let i = 0; i < cases.length; i++) {
    cases[i].textContent = lettres[x][i];
    cases[i].setAttribute("ok", "1");
  }
  // pour vider les cases et ajouter le nombre de case correspondant a chaque mot
  var divLettres = document.getElementById("LettreReponse");
  divLettres.innerHTML = "";
  for (let i = 0; i < mots[x].length; i++) {
    divLettres.innerHTML += '<a class="case btn btn-dark" ok="0"></a>';
  }
  // la fonction verification du mot

  function verifierMot() {
    var trouve = true;
    var choixuser = document.getElementsByClassName("case");
    for (let i = 0; i < mots[x].length; i++) {
      if (mots[x][i] != choixuser[i].textContent) {
        trouve = false;
      }
    }
    return trouve;
  }

  // Troisieme section
  var nbrLettreSaisi = 0;
  var choix = document.getElementsByClassName("choix");
  var choisi = document.getElementsByClassName("case");
  for (let i = 0; i < choix.length; i++) {
    choix[i].onclick = function () {
      if (choix[i].getAttribute("ok") === "1") {
        pos = -1;
        for (let j = 0; j < choisi.length; j++) {
          if (choisi[j].getAttribute("ok") === "0") {
            pos = j;
            break;
          }
        }
        if (pos !== -1) {
          choisi[pos].textContent = choix[i].textContent;
          choisi[pos].setAttribute("ok", "1");
          choix[i].setAttribute("ok", "0");
          choix[i].textContent = "";
          nbrLettreSaisi++;
          if (nbrLettreSaisi === mots[x].length) {
            verifierMot();
            if (verifierMot() == true) {
              nextlevel();
            } else {
              nbrLettreSaisi--;
            }
          }
        }
      }
    };
  }
  // Derniere section
  for (let i = 0; i < choisi.length; i++) {
    choisi[i].onclick = function () {
      if (choisi[i].getAttribute("ok") === "1") {
        pos = -1;
        for (let j = 0; j < choix.length; j++) {
          if (choix[j].getAttribute("ok") === "0") {
            pos = j;
            break;
          }
        }
        if (pos !== -1) {
          choix[pos].textContent = choisi[i].textContent;
          choix[pos].setAttribute("ok", "1");
          choisi[i].setAttribute("ok", "0");
          choisi[i].textContent = "";
          nbrLettreSaisi;
        }
      }
    };
  }
}
var niveau = -1,
  M = 1;
  const score = document.getElementById("score");
  score.innerText = 0;
  function nextlevel() {
  niveau++;
  score.innerText = parseInt(score.innerText) + 100;
  if (M > 5) {
    M = 1;
  }
  if (niveau >= 5) {
    alert("Vous avez gagné");
    score.innerHTML = 0;
    niveau = 0;
  }
  initialiseNiveau(niveau);
}
nextlevel();
