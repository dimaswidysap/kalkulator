const display = document.getElementById("display");

/**
 * @param {string} karakter
 */
function inputAngka(karakter) {
  const nilaiSekarang = display.value;
  const karakterTerakhir = nilaiSekarang.slice(-1);
  const daftarOperator = ["+", "-", "*", "/", "%"];

  let karakterVisual = karakter;
  if (karakter === "*") karakterVisual = "x";

  const isOperatorBaru = daftarOperator.includes(karakter);
  const isOperatorTerakhir =
    daftarOperator.includes(karakterTerakhir) || karakterTerakhir === "x";

  if (isOperatorBaru && isOperatorTerakhir) {
    display.value = nilaiSekarang.slice(0, -1) + karakterVisual;
    return;
  }

  if (nilaiSekarang === "" && ["*", "/", "%"].includes(karakter)) return;

  display.value += karakterVisual;
}

function hapusSemua() {
  display.value = "";
}

function hapusSatu() {
  display.value = display.value.slice(0, -1);
}

function hitungHasil() {
  let ekspresi = display.value;

  if (!ekspresi) return;

  try {
    let rumusSiapHitung = ekspresi.replace(/x/g, "*");

    let hasil = eval(rumusSiapHitung);

    if (!isFinite(hasil)) {
      display.value = "Error";
    } else {
      display.value = Number(hasil.toFixed(8)).toString();
    }
  } catch (error) {
    display.value = "Error";
  }
}

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (/[0-9]/.test(key)) inputAngka(key);
  if (["+", "-", "*", "/", "%"].includes(key)) inputAngka(key);
  if (key === "Enter" || key === "=") hitungHasil();
  if (key === "Backspace") hapusSatu();
  if (key === "Escape") hapusSemua();
  if (key === ".") inputAngka(".");
});
