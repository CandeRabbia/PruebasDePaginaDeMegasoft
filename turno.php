<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Incluye los archivos de la librería PHPMailer
// Asegúrate de que la carpeta 'src' de PHPMailer esté en el mismo directorio.
require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';

// Verifica si la solicitud es de tipo POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Validar campos vacíos
    if (
        empty($_POST['nombre']) ||
        empty($_POST['email']) ||
        empty($_POST['company']) ||
        empty($_POST['rubro']) ||
        empty($_POST['servicio']) ||
        empty($_POST['mensaje']) ||
        !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
    ) {
        // Redirige o muestra un error al usuario si faltan datos
        echo "Faltan datos o el email no es válido.";
        exit;
    }

    // Recoger y limpiar los datos del formulario
    $nombre = htmlspecialchars(trim($_POST['nombre']));
    $email = htmlspecialchars(trim($_POST['email']));
    $company = htmlspecialchars(trim($_POST['company']));
    $rubro = htmlspecialchars(trim($_POST['rubro']));
    $servicio = htmlspecialchars(trim($_POST['servicio']));
    $mensaje = htmlspecialchars(trim($_POST['mensaje']));

    // Configura PHPMailer para usar SMTP
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP según tus credenciales
        $mail->isSMTP();
        $mail->Host       = 'mail.megasoft.com.ar';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'web@megasoft.com.ar';
        $mail->Password   = '011091Mandrake';
        $mail->SMTPSecure = false; // Deshabilitado según tu configuración
        $mail->Port       = 25; // Puerto 25 para SMTP sin SSL

        // Remitente y destinatario
        $mail->setFrom('web@megasoft.com.ar', 'Sitio Web Megasoft');
        $mail->addAddress('ventas@megasoft.com.ar'); // Destinatario del formulario
        $mail->addReplyTo($email, $nombre); // Para responder al correo del cliente

        // Contenido del correo
        $mail->isHTML(false); // Envía como texto plano
        $mail->Subject = "Nuevo contacto desde la web: $nombre";
        $mail->Body    = "Has recibido un nuevo mensaje desde el formulario de contacto.\n\n"
                       . "Detalles:\n"
                       . "Nombre: $nombre\n"
                       . "Email: $email\n"
                       . "Empresa: $company\n"
                       . "Rubro: $rubro\n"
                       . "Servicio: $servicio\n"
                       . "Mensaje:\n$mensaje\n";

        $mail->send();
        
        // ¡Solo imprime el mensaje de éxito!
        echo "Mensaje enviado correctamente.";

    } catch (Exception $e) {
        // ¡Solo imprime el mensaje de error!
        echo "Error al enviar el mensaje.";
    }
} else {
    // Si alguien intenta acceder directamente a turno.php
    echo "Acceso denegado.";
    exit;
}
?>