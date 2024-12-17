let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let shoot = false;

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyW':
            moveForward = true;
            break;
        case 'KeyS':
            moveBackward = true;
            break;
        case 'KeyA':
            moveLeft = true;
            break;
        case 'KeyD':
            moveRight = true;
            break;
        case 'Space':
            shoot = true;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    switch (event.code) {
        case 'KeyW':
            moveForward = false;
            break;
        case 'KeyS':
            moveBackward = false;
            break;
        case 'KeyA':
            moveLeft = false;
            break;
        case 'KeyD':
            moveRight = false;
            break;
        case 'Space':
            shoot = false;
            break;
    }
});

export function handleControls(spaceship, projectiles, scene) {
    if (moveForward) spaceship.position.y += 0.1;
    if (moveBackward) spaceship.position.y -= 0.1;
    if (moveLeft) spaceship.position.x -= 0.1;
    if (moveRight) spaceship.position.x += 0.1;

    if (shoot) {
        const projectile = createProjectile(spaceship.position.clone());
        projectiles.push(projectile);
        scene.add(projectile);
        shoot = false; // Prevent continuous shooting
    }
}

export function resetControls() {
    moveForward = false;
    moveBackward = false;
    moveLeft = false;
    moveRight = false;
    shoot = false;
}
