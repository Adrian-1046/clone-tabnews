const calculadora = require("../..calculadora.js");

test("calcular média com argumentos VÁLIDOS", () => {
  const resultado = calculadora.calcularMedia([7.8, 9, 8.4, 9.6]);
  expect(resultado).toBe(8.7);
});

test("calcular média com argumentos INVÁLIDOS", () => {
  const resultado = calculadora.calcularMedia([7.8, "aa", 8.4, 9.6]);
  expect(resultado).toBe("Erro, Entrada não numérica");
});

test("[copiado do curso] Somar 2 + 2 deve retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("[copiado do curso] Somar 5 + 100 deve retornar 105", () => {
  const resultado = calculadora.somar(5, 100);
  expect(resultado).toBe(105);
});

test("[copiado do curso] Somar 'banana' + 100 deve retornar Erro", () => {
  const resultado = calculadora.somar("banana", 100);
  expect(resultado).toBe("Erro");
});
