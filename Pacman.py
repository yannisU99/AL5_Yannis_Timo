import pygame
import random

# Initialisieren von Pygame
pygame.init()

# Fenstergröße und Titel festlegen
window_width = 480
window_height = 640
window_title = "Pacman"
screen = pygame.display.set_mode((window_width, window_height))
pygame.display.set_caption(window_title)

# Farben definieren
black = (0, 0, 0)
white = (255, 255, 255)
yellow = (255, 255, 0)
red = (255, 0, 0)

# Pacman und Geister definieren
pacman_x = 224
pacman_y = 416
pacman_radius = 15
ghosts = []
for i in range(4):
    ghost_x = random.randint(0, 448)
    ghost_y = random.randint(0, 576)
    ghosts.append([ghost_x, ghost_y, red])

# Punkte und Level
score = 0
level = 1

# Spiel-Schleife
running = True
while running:
    # Event-Schleife
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Bewegungen
    keys = pygame.key.get_pressed()
    if keys[pygame.K_LEFT]:
        pacman_x -= 5
    if keys[pygame.K_RIGHT]:
        pacman_x += 5
    if keys[pygame.K_UP]:
        pacman_y -= 5
    if keys[pygame.K_DOWN]:
        pacman_y += 5

    # Randprüfung
    if pacman_x < pacman_radius:
        pacman_x = pacman_radius
    if pacman_x > window_width - pacman_radius:
        pacman_x = window_width - pacman_radius
    if pacman_y < pacman_radius:
        pacman_y = pacman_radius
    if pacman_y > window_height - pacman_radius:
        pacman_y = window_height - pacman_radius

    # Hintergrund und Pacman zeichnen
    screen.fill(black)
    pygame.draw.circle(screen, yellow, (pacman_x, pacman_y), pacman_radius)

    # Geister zeichnen und prüfen, ob Pacman sie berührt
    for ghost in ghosts:
        pygame.draw.circle(screen, ghost[2], (ghost[0], ghost[1]), pacman_radius)
        if abs(pacman_x - ghost[0]) < pacman_radius and abs(pacman_y - ghost[1]) < pacman_radius:
            score -= 10
            ghost[0] = random.randint(0, 448)
            ghost[1] = random.randint(0, 576)

    # Punkte erhöhen und Level erhöhen, wenn nötig
    score += 1
    if score % 100 == 0:
        level += 1
        ghosts.append([random.randint(0, 448), random.randint(0, 576), red])

    # Score und Level anzeigen
    font = pygame.font.Font(None, 36)
    score_text = font.render(f"Score: {score}", True, white)
    level_text = font.render(f"Level: {level}", True, white)
    screen.blit(score_text, (10, 10))
    screen.blit(level_text, (10, 50))

    # Bildschirm aktualisieren
    pygame.display.update()

# Pygame beenden
pygame.quit()
