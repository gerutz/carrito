const operaciones = {
  sumar: (val1, val2) => val1 + val2,
  restar: (val1, val2) => val1 - val2,
  multiplicar: (val1, val2) => val1 * val2,
  dividir: (val1, val2) => val1 / val2,
};

function operar(val1, val2, operacion) {
  const fn = operaciones[operacion] || () => "operacion no permitida";
  return fn(val1, val2);
}

console.log(operar(5,5,"restar")); // 0
console.log(operar(5,5,"multiplicar")); // 25
console.log(operar(5,5,"sumar")); // 10
console.log(operar(5,5,"dividir")); // 1
console.log(operar(5,5,"pitufo enrique"));
