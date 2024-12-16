const canvas = document.getElementById("solarSystemCanvas");
const ctx = canvas.getContext("2d");

// Adjust canvas size
canvas.width = 600;
canvas.height = 600;

// Planets data
const planets = [
  { name: "Earth", size: 30, color: "#00f", distance: 150, angle: 0, speed: 0.02, gravity: 1 },
  { name: "Jupiter", size: 50, color: "#ff9800", distance: 250, angle: 0, speed: 0.015, gravity: 2 },
  { name: "Saturn", size: 40, color: "#ffcc00", distance: 350, angle: 0, speed: 0.01, gravity: 1.5 },
];

// Constants
const G = 1; // Gravity constant

// Get slider values for gravity and speed
const gravitySlider = document.getElementById("gravity");
const speedSlider = document.getElementById("speed");
const gravityValue = document.getElementById("gravityValue");
const speedValue = document.getElementById("speedValue");

// Update values when sliders are adjusted
gravitySlider.addEventListener("input", () => {
  gravityValue.textContent = gravitySlider.value;
  planets.forEach(planet => {
    planet.gravity = parseFloat(gravitySlider.value);
  });
});
speedSlider.addEventListener("input", () => {
  speedValue.textContent = speedSlider.value;
  planets.forEach(planet => {
    planet.speed = parseFloat(speedSlider.value) * 0.01;
  });
});

// Function to draw the Sun
function drawSun() {
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, Math.PI * 2);
  ctx.fillStyle = "#ffcc00";
  ctx.fill();
  ctx.closePath();
}

// Function to draw the planets
function drawPlanets() {
  planets.forEach(planet => {
    planet.angle += planet.speed;
    const x = canvas.width / 2 + planet.distance * Math.cos(planet.angle);
    const y = canvas.height / 2 + planet.distance * Math.sin(planet.angle);
    
    ctx.beginPath();
    ctx.arc(x, y, planet.size, 0, Math.PI * 2);
    ctx.fillStyle = planet.color;
    ctx.fill();
    ctx.closePath();
  });
}

// Main animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawSun();
  drawPlanets();
  
  requestAnimationFrame(animate);
}

animate();
