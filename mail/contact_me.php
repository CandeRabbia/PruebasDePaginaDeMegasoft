<?php
// Verificar campos vacíos
if (
    empty($_POST['nombre']) ||
    empty($_POST['email']) ||
    empty($_POST['company']) ||
    empty($_POST['rubro']) ||
    empty($_POST['servicio']) ||
    empty($_POST['mensaje']) ||
    !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
) {
    echo "Faltan datos o el email no es válido.";
    return false;
}

$nombre   = $_POST['nombre'];
$email    = $_POST['email'];
$company  = $_POST['company'];
$rubro    = $_POST['rubro'];
$servicio = $_POST['servicio'];
$mensaje  = $_POST['mensaje'];

// Configuración del correo
$to = 'rabbiacandela@gmail.com'; // 👉 reemplaza con tu correo real
$subject = "Nuevo contacto desde la web: $nombre";
$body = "Has recibido un nuevo mensaje desde el formulario de contacto.\n\n".
        "Detalles:\n".
        "Nombre: $nombre\n".
        "Email: $email\n".
        "Empresa: $company\n".
        "Rubro: $rubro\n".
        "Servicio: $servicio\n".
        "Mensaje:\n$mensaje\n";

$headers = "From: joaquin_sola@hotmail.com\r\n"; // remitente recomendado
$headers .= "Reply-To: $email\r\n";

// Enviar correo
if(mail($to, $subject, $body, $headers)){
    echo "Mensaje enviado correctamente.";
    return true;
} else {
    echo "Error al enviar el mensaje.";
    return false;
}
?>