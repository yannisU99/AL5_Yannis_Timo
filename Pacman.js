// Variablen definieren
var canvas;
var ctx;
var pacman_x = 224;
var pacman_y = 416;
var pacman_radius = 15;
var ghosts = [];
for (var i = 0; i < 4; i++) {
    var ghost_x = Math.floor(Math.random() * 449);
    var ghost_y = Math.floor(Math.random() * 577);
    ghosts.push([ghost_x, ghost_y, "red"]);
}
var score = 0;
var level = 1;

// Spiel starten
window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    ctx = canvas.getContext("2d");
    setInterval(gameLoop, 20);
};

// Spiel-Loop
function gameLoop() {
    // Bewegungen
    if (keys[37]) {
        pacman_x -= 5;
    }
    if (keys[39]) {
        pacman_x += 5;
    }
    if (keys[38]) {
        pacman_y -= 5;
    }
    if (keys[40]) {
        pacman_y += 5;
    }

    // Randprüfung
    if (pacman_x < pacman_radius) {
        pacman_x = pacman_radius;
    }
    if (pacman_x > 480 - pacman_radius) {
        pacman_x = 480 - pacman_radius;
    }
    if (pacman_y < pacman_radius) {
        pacman_y = pacman_radius;
    }
    if (pacman_y > 640 - pacman_radius) {
        pacman_y = 640 - pacman_radius;
    }

    // Hintergrund und Pacman zeichnen
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "yellow";
    ctx.beginPath();
    ctx.arc(pacman_x, pacman_y, pacman_radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // Geister zeichnen und prüfen, ob Pacman sie berührt
    for (var i = 0; i < ghosts.length; i++) {
        ctx.fillStyle = ghosts[i][2];
        ctx.beginPath();
        ctx.arc(ghosts[i][0], ghosts[i][1], pacman_radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        if (Math.abs(pacman_x - ghosts[i][0]) < pacman_radius && Math.abs(pacman_y - ghosts[i][1]) < pacman_radius) {
            score -= 10;
            ghosts[i][0] = Math.floor(Math.random() * 449);
            ghosts[i][1] = Math.floor(Math.random() * 577);
        }
    }

    // Punkte erhöhen und Level erhöhen, wenn nötig
    score += 1;
    if (score % 100 == 0) {
        level += 1;
        ghosts.push([Math.floor(Math.random() * 449), Math.floor(Math.random()
