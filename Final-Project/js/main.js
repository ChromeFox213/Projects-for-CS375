import { handleControls, resetControls } from './controls.js';
import { createSpaceship, createAsteroid, createProjectile } from './entities.js';
import * as THREE from '../node_modules/three/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(
    window.innerWidth / -100,
    window.innerWidth / 100,
    window.innerHeight / 100,
    window.innerHeight / -100,
    0.1,
    1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 10;

let spaceship = createSpaceship();
scene.add(spaceship);

let asteroids = [];
for (let i = 0; i < 10; i++) {
    const asteroid = createAsteroid();
    asteroids.push(asteroid);
    scene.add(asteroid);
}

let projectiles = [];
let score = 0;
const scoreElement = document.getElementById('score');
let lastShotTime = 0;
let scoreInterval;

function incrementScore() {
    score++;
    updateScore();
}

function resetGame() {
    // Clear the scene
    asteroids.forEach(asteroid => scene.remove(asteroid));
    projectiles.forEach(projectile => scene.remove(projectile));
    scene.remove(spaceship);

    // Reset arrays
    asteroids = [];
    projectiles = [];

    // Create new spaceship
    spaceship = createSpaceship();
    scene.add(spaceship);

    // Create new asteroids
    for (let i = 0; i < 10; i++) {
        const asteroid = createAsteroid();
        asteroids.push(asteroid);
        scene.add(asteroid);
    }

    // Reset score
    score = 0;
    updateScore();

    // Reset controls
    resetControls();

    // Restart animation
    clearInterval(scoreInterval);
    scoreInterval = setInterval(incrementScore, 1000);
    animate();
}

function animateAsteroids() {
    asteroids.forEach(asteroid => {
        asteroid.position.x -= 0.05; // Adjusted movement for 2.5D
        if (asteroid.position.x < -window.innerWidth / 100) {
            asteroid.position.x = window.innerWidth / 100;
            asteroid.position.y = Math.random() * 20 - 10; // Reset y position for randomness
        }
    });
}

function updateProjectiles() {
    projectiles.forEach((projectile, index) => {
        projectile.position.x += 0.2; // Adjusted movement for 2.5D
        if (projectile.position.x > window.innerWidth / 100) {
            scene.remove(projectile);
            projectiles.splice(index, 1);
        }
    });
}

function checkCollisions() {
    const spaceshipBox = new THREE.Box3().setFromObject(spaceship);

    let gameOver = false;
    asteroids.forEach(asteroid => {
        const asteroidBox = new THREE.Box3().setFromObject(asteroid);
        if (spaceshipBox.intersectsBox(asteroidBox)) {
            console.log('Game Over!');
            gameOver = true;
        }
    });

    if (gameOver) {
        cancelAnimationFrame(animationId);
        clearInterval(scoreInterval); // Stop incrementing score
        alert('Game Over!');
        resetGame(); // Restart the game
    }

    projectiles.forEach((projectile, projIndex) => {
        const projectileBox = new THREE.Box3().setFromObject(projectile);
        asteroids.forEach((asteroid, astIndex) => {
            const asteroidBox = new THREE.Box3().setFromObject(asteroid);
            if (projectileBox.intersectsBox(asteroidBox)) {
                console.log('Hit!');
                scene.remove(asteroid);
                asteroids.splice(astIndex, 1);
                scene.remove(projectile);
                projectiles.splice(projIndex, 1);
                score++;
                updateScore();
            }
        });
    });
}

function updateScore() {
    scoreElement.innerHTML = `Score: ${score}`;
}

let animationId;
function animate() {
    animationId = requestAnimationFrame(animate);

    lastShotTime = handleControls(spaceship, projectiles, scene, lastShotTime);
    animateAsteroids();
    updateProjectiles();
    checkCollisions();

    renderer.render(scene, camera);
}

// Start incrementing score every second
scoreInterval = setInterval(incrementScore, 1000);

animate();
