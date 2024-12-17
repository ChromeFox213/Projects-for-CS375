import * as THREE from '../node_modules/three/build/three.module.js';

export function createSpaceship() {
    const geometry = new THREE.ConeGeometry(0.5, 1, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffa500 }); // Orange
    const spaceship = new THREE.Mesh(geometry, material);
    spaceship.rotation.x = Math.PI / 2; // Rotate to be horizontal
    spaceship.position.z = 0; // Position in 2D plane
    spaceship.name = 'spaceship';
    return spaceship;
}

export function createAsteroid() {
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x888888 }); // Gray
    const asteroid = new THREE.Mesh(geometry, material);
    asteroid.position.set(Math.random() * 20 - 10, Math.random() * 20 - 10, 0); // Random position in 2D plane
    return asteroid;
}

export function createProjectile(position) {
    const geometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red projectile
    const projectile = new THREE.Mesh(geometry, material);
    projectile.rotation.x = Math.PI / 2; // Make it horizontal
    projectile.position.copy(position);
    projectile.position.z = 0; // Ensure the z-position is 0 for 2D appearance
    return projectile;
}
