<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Horloge Minimaliste</title>
  <link rel="icon" href="http://51.210.102.53/2ACAPON/hub/favicon.png" type="image/png">
  <link rel="icon" href="http://51.210.102.53/2ACAPON/hub/favicon.svg" type="image/svg+xml">
  <?php
  $allowed_styles = ['style1', 'style2'];
  $style = isset($_GET['style']) ? $_GET['style'] : 'style2';
  if (!in_array($style, $allowed_styles, true)) {
    $style = 'style2';
  }

  $la_wight = isset($_GET['la_wight']) ? (int) $_GET['la_wight'] : 400;
  if ($la_wight < 200) {
    $la_wight = 200;
  } elseif ($la_wight > 800) {
    $la_wight = 800;
  }
  ?>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Monoton&family=Notable&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Tourney:ital,wght@0,100..900;1,100..900&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');
    body {
      margin: 0;
      padding: 0;
      background-color: #000;
      color: #fff;
      font-family: 'Plus Jakarta Sans', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      font-variation-settings: 'wght' 400;
      overflow: hidden;
    }

    .clock {
      display: flex;
      align-items: center;
      justify-content: center;
      width: min(92vw, 56rem);
      font-size: 5rem;
      font-weight: 300;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .hours, .minutes, .seconds {
      display: flex;
    }

    .digit-container {
      position: relative;
      height: 7rem;
      width: 3.2rem;
      margin: 0 0.15rem;
      overflow: hidden;
    }

    .hours .digit-container, .minutes .digit-container {
      width: 6rem;
    }

    .separator {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 5rem;
      margin: 0 0.15rem;
      min-width: 1ch;
    }

    .digit {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      opacity: 0;
      transform: translateY(100%);
      filter: blur(10px);
      transition: all 1s cubic-bezier(0.4, 0, 0, 1);
    }

    .digit.current {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
      <?php echo "font-variation-settings: 'wght' " . $la_wight . ";"; ?>
    }

    .digit.previous {
      opacity: 0;
      transform: translateY(-90%);
      filter: blur(20px);
        
      font-variation-settings: 'wght' 200;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    .choix_style {
        z-index: 1;
        position: fixed;
        left: 0;
        height: 100vh;
        width: 15rem;
        opacity: 0;
        transition: all 0.3s ;

        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;

        background: rgb(52,52,52);
        background: linear-gradient(90deg, rgba(52,52,52,1) 0%, rgba(24,24,24,0.8307984790874525) 47%, rgba(0,0,0,0) 100%);
    }

    .choix_style:hover {
        width: 26rem;
        opacity: 1;
    }

    h1 {
        font-family: 'monoton';
        font-size: 4rem;
        font-weight: 100;
        margin: 3vh 0;
    }

    img {
        border: 1px solid #fff;
        border-radius: 2.5rem;
        width: 15rem;
        height: 7.5rem;
        background-size: cover;
        object-fit: cover;
        background-position: center;
        margin: 3vh 0;
    }
    <?php if ($style === 'style1'): ?>
        .separator {
          animation: pulse 1s infinite;
        }
    <?php else: ?>

    <?php endif; ?>

    p {
        margin: 0; 
    }

    input[type="range"] {
      -webkit-appearance: none;
      width: 100%;
      height: 8px;
      background: #fff;
      border-radius: 5.2rem;
      outline: none;
    }
    
    .slide_bare {
        border: 1px solid #fff;
        border-radius: 2.5rem;
        width: 15rem;
        height: 7.5rem;
        background-color: black;
        object-fit: cover;
        background-position: center;
        margin: 3vh 0;
        
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center;
    }

    form {
      width: 100%;
      padding: 0 1rem;
      box-sizing: border-box;
      display: grid;
      gap: 0.5rem;
    }

    input[type="submit"] {
      background: #fff;
      border: none;
      border-radius: 1rem;
      padding: 0.5rem 0.8rem;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .clock {
        font-size: 3.2rem;
      }

      .digit-container {
        height: 4.5rem;
        width: 2.4rem;
      }

      .hours .digit-container, .minutes .digit-container {
        width: 4.6rem;
      }

      .separator {
        font-size: 3.2rem;
      }

      .choix_style {
        width: 4rem;
      }

      .choix_style:hover {
        width: min(95vw, 26rem);
      }
    }
  </style>
</head>
<body>

    <div class="choix_style">
        <h1>Style:</h1>
        <a href="?style=style1&la_wight=<?php echo $la_wight; ?>">
          <img src="style1.png" class="hover-image" alt="Style 1">
        </a>
        <a href="?style=style2&la_wight=<?php echo $la_wight; ?>">
          <img src="style2.png" alt="Style 2">
        </a>
        <div class="slide_bare">
            <p id="preview-text">L'épaisseur des nombres</p>
            <form method="GET" action="">
                <input type="hidden" name="style" value="<?php echo htmlspecialchars($style, ENT_QUOTES, 'UTF-8'); ?>">
                <input type="range" id="la_wight" name="la_wight" min="200" max="800" value="<?php echo $la_wight; ?>">
                <input type="submit" value="Envoyer"/>
            </form>
        </div>
    <script>
        const rangeInput = document.getElementById('la_wight');
        const previewText = document.getElementById('preview-text');

        rangeInput.addEventListener('input', () => {
            previewText.style.fontVariationSettings = `'wght' ${rangeInput.value}`;
        });
    </script>
    </div>

    <div class="clock">
        <div class="hours">
            <div class="digit-container" id="hour">
                <div class="digit current">00</div>
            </div>
        </div>
        <div class="separator">:</div>
        <div class="minutes">
            <div class="digit-container" id="minute">
                <div class="digit current">00</div>
            </div>
        </div>
        <?php if ($style === 'style1'): ?>

        <?php else: ?>
            <div class="separator">:</div>
            <div class="seconds">
                <div class="digit-container" id="second-tens">
                    <div class="digit current">0</div>
                </div>
                <div class="digit-container" id="second-units">
                    <div class="digit current">0</div>
                </div>
            </div>
        <?php endif; ?>

    </div>

    <script>
        // Fonction pour mettre à jour l'affichage de l'horloge
        function updateClock() {
        // Obtenir la date et l'heure actuelles
        const now = new Date();

        // Obtenir les heures, minutes et secondes actuelles et les formater en chaîne de caractères avec deux chiffres
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        // Mettre à jour les chiffres de l'horloge pour les heures, minutes et secondes
        updateDigit('hour', hours);
        updateDigit('minute', minutes );
        updateDigit('second-tens', seconds[0]);
        updateDigit('second-units', seconds[1]);
        }

        // Fonction pour mettre à jour un chiffre dans un conteneur spécifique
        function updateDigit(containerId, newValue) {
        // Obtenir le conteneur du chiffre à mettre à jour
        const container = document.getElementById(containerId);
        if (!container) return;

        // Obtenir le chiffre actuel dans le conteneur
        const currentDigit = container.querySelector('.digit.current');

        // Vérifier si le chiffre actuel est différent du nouveau chiffre
        if (!currentDigit || currentDigit.textContent !== newValue) {
            // Si un chiffre actuel existe, le marquer comme précédent et le supprimer après un délai
            if (currentDigit) {
            currentDigit.classList.remove('current');
            currentDigit.classList.add('previous');

            setTimeout(() => {
                if (currentDigit.parentNode) {
                currentDigit.remove();
                }
            }, 500);
            }

            // Créer un nouvel élément pour le nouveau chiffre
            const newDigit = document.createElement('div');
            newDigit.classList.add('digit');
            newDigit.textContent = newValue;
            container.appendChild(newDigit);

            // Forcer le recalcul du style pour s'assurer que l'animation fonctionne correctement
            void newDigit.offsetHeight;
            newDigit.classList.add('current');
        }
        }

        // Mettre à jour l'horloge toutes les 100 millisecondes
        setInterval(updateClock, 100);

        // Mettre à jour l'horloge immédiatement au chargement de la page
        updateClock();
    </script>

</body>
</html>
