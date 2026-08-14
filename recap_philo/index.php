<?php

$totalNotions = 15;
$csvFilePath = __DIR__ . '/TOUCHE_PAS_-_vas_sur_le_site_--recup--.csv';
$page = isset($_GET['page']) && is_scalar($_GET['page']) ? (string) $_GET['page'] : '';

function getNotionNumber($page, $totalNotions) {
    if (preg_match('/^n?([1-9][0-9]*)$/', (string) $page, $matches)) {
        $numero = (int) $matches[1];
        if ($numero >= 1 && $numero <= $totalNotions) {
            return $numero;
        }
    }

    return null;
}

$notionNumber = getNotionNumber($page, $totalNotions);

// Download handler for ?page=recup — must run before any output
if ($page === 'recup') {
    $filePath = $csvFilePath;
    if (file_exists($filePath)) {
        header('Content-Description: File Transfer');
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="TOUCHE_PAS_-_vas_sur_le_site_--recup--.csv"');
        header('Content-Transfer-Encoding: binary');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($filePath));
        while (ob_get_level()) { ob_end_clean(); }
        readfile($filePath);
        exit;
    } else {
        http_response_code(404);
        echo 'Fichier introuvable.';
        exit;
    }
}


// Clear handler — ?page=clear
if ($page === 'clear') {
    $filePath = $csvFilePath;
    if (file_exists($filePath)) {
        file_put_contents($filePath, ''); // vide le fichier sans le supprimer
        echo 'Fichier vidé.';
    } else {
        echo 'Fichier introuvable.';
    }
    exit;
}


?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Philo - Recup</title>
    
    <!-- Open Graph / Meta Tags -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Récap de Philosophie">
    <meta property="og:description" content="Récapitulatif des notions clés de philosophie : La Vérité, Le Devoir, Le Bonheur, La Conscience">
    <meta property="og:image" content="http://51.210.102.53/ALECAPON/font-favicon/img_presentation.png">
    <meta property="og:url" content="http://51.210.102.53/ALECAPON/">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Récap de Philosophie">
    <meta name="twitter:description" content="Récapitulatif des notions clés de philosophie : La Vérité, Le Devoir, Le Bonheur, La Conscience">
    <meta name="twitter:image" content="http://51.210.102.53/ALECAPON/font-favicon/img_presentation.png">

    <link rel="icon" href="font-favicon/favicon.png" type="image/png">
    <link rel="icon" href="font-favicon/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="font-favicon/style.css">
</head>
<body>
    <nav class="footer" role="navigation" aria-label="Bas de page">
        <a class="footer-item" href="index.php" title="Accueil" aria-label="Accueil">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 18.8118C1 19.7678 1.63293 20.2511 2.42648 20.2511C2.82062 20.2511 3.12866 20.0558 3.60534 19.7753C4.67024 19.0771 5.9021 18.6744 7.14462 18.6842C8.48255 18.694 9.77345 19.1805 10.8113 20.1575C11.2938 20.6072 11.6963 20.7776 12.1508 20.7776C12.5956 20.7776 13.0048 20.6072 13.4837 20.1575C14.5184 19.1871 15.8093 18.694 17.1539 18.6842C18.3965 18.6744 19.6217 19.0771 20.6866 19.7753C21.1663 20.0558 21.4713 20.2511 21.8721 20.2511C22.659 20.2511 23.2919 19.7678 23.2919 18.8118V5.55673C23.2919 5.34103 23.2604 5.14841 23.1437 4.96066C22.1969 3.29793 19.8532 2 17.1118 2C15.0605 2 13.2148 2.77508 12.1508 3.92035C11.0838 2.77508 9.2314 2 7.1899 2C4.43869 2 2.09502 3.29793 1.14824 4.96066C1.03816 5.14841 1 5.34103 1 5.55673V18.8118ZM3.17471 17.5439V5.89003C3.93468 4.86235 5.523 4.17471 7.1899 4.17471C8.89631 4.17471 10.4056 4.86901 11.0586 5.92999V17.6757C10.0687 16.9934 8.6464 16.5095 7.1899 16.5095C5.65526 16.5095 4.20055 16.9041 3.17471 17.5439ZM13.2333 17.6757V5.92999C13.8863 4.86901 15.4023 4.17471 17.1118 4.17471C18.772 4.17471 20.3572 4.86235 21.1172 5.89003V17.5439C20.0913 16.9041 18.6397 16.5095 17.1118 16.5095C15.6455 16.5095 14.2232 16.9934 13.2333 17.6757Z" fill="#2F2D29"/>
            </svg>
        </a>




<?php
$numero = $notionNumber ?? 1;

if ( $numero < 2 ) $numero = 2;
if ( $numero > $totalNotions - 2 ) $numero = $totalNotions - 2;

$prev  = $numero -1;
$next  = $numero +1;
$next2 = $numero +2;

echo '<a class="footer-item" href="index.php?page=' . $prev . '">№' . $prev . '</a> ';
echo '<a class="footer-item" href="index.php?page=' . $numero . '">№' . $numero . '</a> ';
echo '<a class="footer-item" href="index.php?page=' . $next . '">№' . $next . '</a> ';
echo '<a class="footer-item" href="index.php?page=' . $next2 . '">№' . $next2 . '</a>';
?>






        <a class="footer-item" id="shareBtn" href="#" title="Partager cette page" aria-label="Partager cette page">
            <svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.09506 8.88654H4.35531C2.96181 8.88654 2.17471 9.67004 2.17471 11.0671V18.422C2.17471 19.8222 2.96181 20.6057 4.35531 20.6057H13.531C14.928 20.6057 15.7151 19.8222 15.7151 18.422V11.0671C15.7151 9.67004 14.928 8.88654 13.531 8.88654H11.7881V6.71179H13.6179C16.3567 6.71179 17.8899 8.23519 17.8899 10.977V18.5121C17.8899 21.2472 16.3567 22.7804 13.6179 22.7804H4.26836C1.5265 22.7804 0 21.2472 0 18.5121V10.977C0 8.23519 1.5265 6.71179 4.26836 6.71179H6.09506V8.88654Z" fill="#2F2D29"/>
                <path d="M9.85416 2.62387L9.94637 4.05856V13.7671C9.94637 14.2953 9.49499 14.7458 8.94154 14.7458C8.38808 14.7458 7.94336 14.2953 7.94336 13.7671V4.05856L8.03745 2.61832L8.94154 1.4314L9.85416 2.62387Z" fill="#2F2D29"/>
                <path d="M5.55959 4.95714C5.80725 4.95714 6.05625 4.85417 6.22713 4.66687L7.53895 3.27292L8.94157 1.4315L10.3509 3.27292L11.656 4.66687C11.8269 4.85417 12.0693 4.95714 12.3169 4.95714C12.7923 4.95714 13.1975 4.60517 13.1975 4.11207C13.1975 3.85064 13.1038 3.66023 12.9263 3.48269L9.71603 0.398955C9.45861 0.144645 9.21186 0.0581055 8.94157 0.0581055C8.67793 0.0581055 8.43428 0.144645 8.1671 0.398955L4.96352 3.48269C4.78909 3.66023 4.68567 3.85064 4.68567 4.11207C4.68567 4.60517 5.08422 4.95714 5.55959 4.95714Z" fill="#2F2D29"/>
            </svg>
        </a>
    </nav>

    <main>


<?php

    if ($notionNumber !== null) {
        include __DIR__ . '/n' . $notionNumber . '.html';
    } else {
        include __DIR__ . '/home.html';
    }
?>


<?php
// Fonction pour enregistrer les données de visite dans un fichier externe
function logVisitorData($filePath) {

    $logData = [
        date('Y-m-d H:i:s'),
        $_SERVER['PHP_SELF'] ?? 'unknown',
        $_SERVER['REMOTE_ADDR'] ?? 'unknown',
        $_SERVER['HTTP_USER_AGENT'] ?? 'unknown',
        $_SERVER['HTTP_REFERER'] ?? 'none',
        $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? 'unknown'
    ];

    $file = fopen($filePath, 'a');

    if ($file) {
        flock($file, LOCK_EX);
        fputcsv($file, $logData, ';'); // séparateur CSV
        flock($file, LOCK_UN);
        fclose($file);
    }
}

// Appel de la fonction (ex. : au début du script)
logVisitorData($csvFilePath);
?>

<br><br><br><br>
    </main>

    <script src="font-favicon/js.js" defer></script>
</body>
</html>
