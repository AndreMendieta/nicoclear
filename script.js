// Parámetros base
const HALF_LIFE_H = 2.0; // horas
const NICOTINA_POR_CIGARRILLO = 1.0; // mg
const UMBRAL_MG = 0.001;

function calcular() {
  const cig = parseInt(document.getElementById("cigarrillos").value);
  const agua = parseInt(document.getElementById("agua").value);
  const actividad = document.getElementById("actividad").value;
  const resultado = document.getElementById("resultado");
  const mensaje = document.getElementById("mensaje");
  const tips = document.getElementById("tips");

  if (isNaN(cig) || cig <= 0) {
    resultado.classList.remove("oculto");
    mensaje.textContent = "Por favor ingresa la cantidad de cigarrillos fumados.";
    return;
  }

  // Cálculo del tiempo de eliminación
  const C0 = cig * NICOTINA_POR_CIGARRILLO;
  const lambda = Math.log(2) / HALF_LIFE_H;
  let T = (1 / lambda) * Math.log(C0 / UMBRAL_MG); // horas base

  // Ajuste según actividad y agua
  if (actividad === "medio") T *= 0.9;
  if (actividad === "alto") T *= 0.75;
  if (agua >= 8) T *= 0.85;
  else if (agua < 3) T *= 1.1;

  const dias = Math.floor(T / 24);
  const horas = Math.round(T % 24);

  // Mostrar resultados
  resultado.classList.remove("oculto");
  mensaje.innerHTML = `
    Fumaste <strong>${cig}</strong> cigarrillos hoy.<br>
    Tu cuerpo tardará aproximadamente <strong>${dias} días y ${horas} horas</strong> 
    en eliminar la nicotina y sus metabolitos. 
  `;

  // Generar recomendaciones dinámicas
  const recomendaciones = [];
  if (agua < 8)
    recomendaciones.push("💧 Aumenta tu consumo de agua (8 vasos o más al día).");
  if (actividad === "bajo")
    recomendaciones.push("🏃‍♂️ Realiza caminatas o ejercicio ligero para acelerar el metabolismo.");
  recomendaciones.push("🥗 Consume frutas ricas en antioxidantes como naranja, kiwi o brócoli.");
  recomendaciones.push("🫖 Toma té verde: ayuda a limpiar toxinas del organismo.");
  recomendaciones.push("😴 Duerme al menos 7-8 horas para apoyar la regeneración celular.");

  tips.innerHTML = recomendaciones.map(t => `<li>${t}</li>`).join("");
}
