function somar(numero1, numero2) {
  if (typeof numero1 !== "number" || typeof numero2 !== "number") {
    return "Erro";
  }
  return numero1 + numero2;
}
exports.somar = somar;

function calcularMedia(listaNumerica) {
  let resultado = 0;

  for (let i = 0; i < listaNumerica.length; i++) resultado += listaNumerica[i];

  if (typeof resultado != "number") return "Erro, Entrada não numérica";
  return parseFloat(resultado.toFixed(2)) / listaNumerica.length;
}
exports.calcularMedia = calcularMedia;
