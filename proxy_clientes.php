<?php
// proxy_clientes.php
// Descarga el HTML de admes y lo cachea para insertarlo en tu sitio.

$REMOTE_URL = 'https://www.admes.com.ar/publico/a2/listaclientesmg.aspx';
$CACHE_FILE = __DIR__ . '/cache/clientes_remote.html';
$CACHE_TTL  = 600; // 10 minutos

function fetch_remote($url) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_CONNECTTIMEOUT => 8,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_USERAGENT      => 'MegasoftBot/1.0 (+https://www.megasoft.com.ar/)',
        CURLOPT_SSL_VERIFYPEER => true,
    ]);
    $html = curl_exec($ch);
    $err  = curl_error($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($html === false || $code >= 400) {
        throw new Exception("No se pudo obtener el contenido remoto. HTTP $code - $err");
    }
    return $html;
}

function absolutize_urls($html, $base) {
    // Convierte href/src relativos a absolutos (simple, sin DOM pesado)
    $pattern = '/(href|src)=([\'"])(?!https?:|data:|\/\/)([^\'"]+)\2/i';
    $replacement = '$1=$2' . rtrim($base, '/') . '/$3$2';
    return preg_replace($pattern, $replacement, $html);
}

// 1) cache hit?
if (is_file($CACHE_FILE) && (time() - filemtime($CACHE_FILE) < $CACHE_TTL)) {
    $html = file_get_contents($CACHE_FILE);
} else {
    try {
        $html = fetch_remote($REMOTE_URL);
        // Normalizar rutas
        $html = absolutize_urls($html, 'https://www.admes.com.ar');
        // Guardar cache (crear carpeta si no existe)
        @is_dir(dirname($CACHE_FILE)) || @mkdir(dirname($CACHE_FILE), 0775, true);
        @file_put_contents($CACHE_FILE, $html);
    } catch (Exception $e) {
        // Fallback: si falla la descarga, usar cache viejo si existe
        if (is_file($CACHE_FILE)) {
            $html = file_get_contents($CACHE_FILE);
        } else {
            http_response_code(502);
            echo '<div class="alert-vacio">No se pudo cargar la lista de clientes en este momento.</div>';
            exit;
        }
    }
}

// 2) Opcional: extraer solo el cuerpo principal si el remoto tiene mucho markup.
// Por simplicidad, entregamos el HTML tal cual (ya con URLs absolutas).
// Si luego querés filtrar por un contenedor específico, lo ajustamos.

header('Content-Type: text/html; charset=UTF-8');
echo $html;
