/**
 * Module de gestion des sons pour l'interface
 * Utilise Howler.js pour la lecture des fichiers audio
 */

class SoundManager {
    constructor() {
        this.backgroundNoise = null;
        this.clickSound = null;
        this.keyboardSoundDownUp = null;
        this.keyboardSoundHover = null;
        this.keystrokesSound = null;
        this.isInitialized = false;
        this.isBackgroundStarted = false;
        this.elementsWithCustomSounds = new Set();
    }

    /**
     * Initialise tous les sons
     */
    init() {
        if (this.isInitialized) return;

        // Son d'ambiance en boucle
        this.backgroundNoise = new Howl({
            loop: true,
            src: ["hub_elements/sons/backgroundnoise.ogg"],
            volume: 0.05
        });

        // Son de clic par défaut (down: 0-30ms, up: 30-100ms)
        this.clickSound = new Howl({
            loop: false,
            src: ["hub_elements/sons/clic.wav"],
            sprite: {
                down: [0, 30],      // 0ms à 30ms (0.00 à 0.03 secondes)
                up: [30, 70]        // 30ms à 100ms (0.03 à 0.10 secondes, durée = 70ms)
            },
            volume: 0.8
        });

        // Sons pour les clics (down/up)
        this.keyboardSoundDownUp = new Howl({
            loop: false,
            src: ["hub_elements/sons/keyboard.ogg"],
            sprite: {
                down1: [200, 100],
                up1: [900, 100],
                down2: [1900, 100],
                up2: [2700, 100],
                down3: [3600, 100],
                up3: [4300, 100],
                down4: [5100, 100],
                up4: [5700, 100],
                down5: [6400, 100],
                up5: [7200, 100]
            },
            volume: 1.0
        });

        // Sons pour le hover (survol)
        this.keyboardSoundHover = new Howl({
            loop: false,
            src: ["hub_elements/sons/keyboard.ogg"],
            sprite: {
                hover1: [900, 100],
                hover2: [2700, 100],
                hover3: [4300, 100],
                hover4: [5700, 100],
                hover5: [7200, 100]
            },
            volume: 0.2
        });

        // Sons pour les frappes de clavier (keystrokes)
        this.keystrokesSound = new Howl({
            loop: false,
            src: ["hub_elements/sons/keystrokes.ogg"],
            sprite: {
                1: [41, 548],
                2: [521, 468],
                3: [1441, 1180],
                4: [3041, 980],
                5: [4609, 951],
                6: [6111, 1169]
            },
            volume: 0.6
        });

        this.isInitialized = true;
    }

    /**
     * Obtient un nombre aléatoire entre min et max (inclus)
     */
    _getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Joue un son "down" (appui sur bouton)
     */
    playDown() {
        if (!this.keyboardSoundDownUp) return;
        const randomNum = this._getRandomNumber(1, 5);
        this.keyboardSoundDownUp.play(`down${randomNum}`);
        this._startBackgroundIfNeeded();
    }

    /**
     * Joue un son "up" (relâchement de bouton)
     */
    playUp() {
        if (!this.keyboardSoundDownUp) return;
        const randomNum = this._getRandomNumber(1, 5);
        this.keyboardSoundDownUp.play(`up${randomNum}`);
    }

    /**
     * Joue un son de hover (survol)
     * @param {number} variant - Numéro de variant (1-5), si non fourni, choisi aléatoirement
     */
    playHover(variant = null) {
        if (!this.keyboardSoundHover) return;
        const hoverVariant = variant || this._getRandomNumber(1, 5);
        this.keyboardSoundHover.play(`hover${hoverVariant}`);
    }

    /**
     * Joue un son de frappe de clavier
     */
    playKeystroke() {
        if (!this.keystrokesSound) return;
        const randomNum = this._getRandomNumber(1, 6);
        this.keystrokesSound.play(String(randomNum));
    }

    /**
     * Joue le son de clic "down" (appui)
     */
    playClickDown() {
        if (!this.clickSound) return;
        this.clickSound.play('down');
        this._startBackgroundIfNeeded();
    }

    /**
     * Joue le son de clic "up" (relâchement)
     */
    playClickUp() {
        if (!this.clickSound) return;
        this.clickSound.play('up');
    }

    /**
     * Marque un élément comme ayant un son personnalisé
     * @param {HTMLElement} element - Élément à marquer
     */
    markElementWithCustomSound(element) {
        this.elementsWithCustomSounds.add(element);
    }

    /**
     * Vérifie si un élément ou un de ses parents a un son personnalisé
     * @param {HTMLElement} element - Élément à vérifier
     * @returns {boolean} - True si l'élément a un son personnalisé
     */
    hasCustomSound(element) {
        let current = element;
        while (current && current !== document.body) {
            if (this.elementsWithCustomSounds.has(current)) {
                return true;
            }
            current = current.parentElement;
        }
        return false;
    }

    /**
     * Démarre le son d'ambiance après la première interaction utilisateur
     */
    _startBackgroundIfNeeded() {
        if (!this.isBackgroundStarted && this.backgroundNoise) {
            this.backgroundNoise.play();
            this.isBackgroundStarted = true;
        }
    }

    /**
     * Démarre le son d'ambiance manuellement
     */
    startBackground() {
        if (this.backgroundNoise && !this.backgroundNoise.playing()) {
            this.backgroundNoise.play();
            this.isBackgroundStarted = true;
        }
    }

    /**
     * Arrête le son d'ambiance
     */
    stopBackground() {
        if (this.backgroundNoise && this.backgroundNoise.playing()) {
            this.backgroundNoise.stop();
            this.isBackgroundStarted = false;
        }
    }
}

// Instance globale du gestionnaire de sons
const soundManager = new SoundManager();

/**
 * Initialise le gestionnaire de sons au chargement de la page
 */
function initSounds() {
    soundManager.init();
}

/**
 * Ajoute les événements de clic (down/up) à un élément
 * @param {HTMLElement|NodeList|string} element - Élément(s) ou sélecteur CSS
 */
function attachButtonSounds(element) {
    const elements = typeof element === 'string' 
        ? document.querySelectorAll(element) 
        : (element.length !== undefined ? element : [element]);

    elements.forEach(el => {
        // Marquer l'élément comme ayant un son personnalisé
        soundManager.markElementWithCustomSound(el);
        
        // Son "down" quand on appuie
        el.addEventListener('mousedown', (e) => {
            soundManager.playDown();
        }, true); // Utiliser la phase de capture pour être sûr d'être appelé avant l'écouteur global

        // Son "up" quand on relâche
        el.addEventListener('mouseup', (e) => {
            soundManager.playUp();
        }, true); // Utiliser la phase de capture pour être sûr d'être appelé avant l'écouteur global

        // Gérer le cas où la souris quitte l'élément pendant le clic
        el.addEventListener('mouseleave', (e) => {
            if (e.buttons === 1) { // Si le bouton est toujours pressé
                soundManager.playUp();
            }
        });
    });
}

/**
 * Ajoute un son de hover à un élément
 * @param {HTMLElement|NodeList|string} element - Élément(s) ou sélecteur CSS
 * @param {number} variant - Variant du son (optionnel, 1-5)
 */
function attachHoverSound(element, variant = null) {
    const elements = typeof element === 'string' 
        ? document.querySelectorAll(element) 
        : (element.length !== undefined ? element : [element]);

    elements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            soundManager.playHover(variant);
        });
    });
}

// Variable pour savoir si l'écouteur global est déjà initialisé
let globalClickSoundInitialized = false;

/**
 * Initialise l'écouteur global pour le son de clic par défaut
 * Cette fonction joue le son de clic par défaut sur tous les clics,
 * sauf si l'élément a déjà un son personnalisé
 */
function initGlobalClickSound() {
    // Ne créer qu'un seul écouteur global
    if (globalClickSoundInitialized) return;
    globalClickSoundInitialized = true;

    // Écouteur pour mousedown (down)
    // Utiliser la phase de bubbling pour être appelé après les écouteurs en phase de capture
    // mais vérifier si l'élément a un son personnalisé avant de jouer
    document.addEventListener('mousedown', (e) => {
        // Vérifier si l'élément ou un de ses parents a un son personnalisé
        if (!soundManager.hasCustomSound(e.target)) {
            soundManager.playClickDown();
        }
    }, false); // Phase de bubbling normale

    // Écouteur pour mouseup (up)
    document.addEventListener('mouseup', (e) => {
        // Vérifier si l'élément ou un de ses parents a un son personnalisé
        if (!soundManager.hasCustomSound(e.target)) {
            soundManager.playClickUp();
        }
    }, false); // Phase de bubbling normale
}

// Initialiser les sons au chargement de la page
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSounds);
} else {
    initSounds();
}

// Note: L'écouteur global (initGlobalClickSound) doit être initialisé
// après que tous les éléments avec sons personnalisés aient été marqués
// via attachButtonSounds. Cela doit être fait dans le code de la page HTML.

// Exporter pour utilisation globale
window.soundManager = soundManager;
window.attachButtonSounds = attachButtonSounds;
window.attachHoverSound = attachHoverSound;
window.initSounds = initSounds;
window.initGlobalClickSound = initGlobalClickSound;
