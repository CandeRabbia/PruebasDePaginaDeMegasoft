<%@ Page Title="Nuestros Clientes" Language="VB" MasterPageFile="" AutoEventWireup="false" CodeFile="clientes3.aspx.vb" Inherits="clientes" %>

<!DOCTYPE html>
<html lang="es">
<head runat="server">
    <meta charset="utf-8" />
    <title>MEGASOFT - Nuestros Clientes</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
    <link rel="icon" type="image/png" href="./img/M.png" />

    <style> 
        .clientes-fila .clientes-cuadro .clientes-imagen {
            width: 30%;
            height: 100px;
        }
        .clientes-fila .clientes-cuadro .clientes-nombre {
            width: 50%;
            font-size: 1.2em;
            line-height: 150%; /*ESPACIO DEL TEXTO*/
        }
        .clientes-fila .clientes-cuadro .clientes-definicion {
            width: 75%;
            line-height: 150%;
            font-size: 1.0em;
        }

        
    </style>
</head>

<body>
    <!-- NAV -->
    <header class="header">
        <div class="navbar">
            <a href="index.html" class="logo">
                <img src="./img/Logo.png" alt="logo MEGASOFT">
            </a>

            <button class="menu-toggle" onclick="toggleMenu()">&#9776;</button>

            <nav class="menu">
                <a href="Empresa.html">Nosotros</a>
                <a href="clientes.html">Clientes</a>
                <a href="productos.html">Productos</a>
                <a href="https://www.admes.com.ar/MGUtilidades.aspx">Utilidades</a>
                <a href="contacto.html">Contáctanos</a>
                <a href="noticias.html">Noticias</a>
                <a href="https://www.admes.com.ar/ingreso.aspx" class="btn-acceso">Acceso clientes</a>
            </nav>
        </div>
    </header>

    <!-- CONTENIDO CENTRAL -->
    <main>
        		 <br ><br > <br >
         <div class="container">
            <div class="row">
                <div class="col-md-offset-3 col-md-6">

                    <h1>Nuestros Clientes</h1>
                    <h5>Para poder visualizarlos, seleccione un Producto y se listaran los datos correspondientes a cada uno de ellos. <br />
Tenga en cuenta que se encuentran distribuidos por todo el país.</h5>
                    <hr />
                </div>
            </div>
		  </div>

				<div class="clearfix"></div>
				   <div>
						<iframe id="siteframe" src="https://www.admes.com.ar/publico/a2/listaclientesmg.aspx"  width="100%" height="600" frameborder="0" scrolling="no" style="border:0;"></iframe>
					</div>
    </main>

    <!-- FOOTER -->
    <footer class="footer">
        <div class="footer-top">
            <div class="footer-col footer-logo">
                <img src="./img/megasoft-logo-blanco.webp" alt="MEGASOFT" loading="lazy">
            </div>

            <div class="footer-col footer-contacto">
                <h3>Contacto</h3>
                <ul class="contact-list">
                    <li><a href="mailto:ventas@megasoft.com.ar">ventas@megasoft.com.ar</a></li>
                    <li><a href="mailto:adm@megasoft.com.ar">adm@megasoft.com.ar</a></li>
                    <li><a href="mailto:soporte@megasoft.com.ar">soporte@megasoft.com.ar</a></li>
                    <li><a href="tel:+543426102434">Teléfono: (0342) 610-2434</a></li>
                    <li><address>Salta 3476 · CP 3000 · Santa Fe, Argentina</address></li>
                </ul>
            </div>

            <div class="footer-col footer-login">
                <h3>Inicio de sesión</h3>
                <p>Ingreso de clientes a la plataforma virtual.</p>
                <a class="btn-ingreso" href="https://www.admes.com.ar/ingreso.aspx" target="_blank" rel="noopener">Ingresar</a>
            </div>
        </div>

        <div class="footer-bottom">
            <p class="copyright">© 2025 MEGASOFT. Todos los derechos reservados.</p>
            <div class="social">
                <a href="https://www.facebook.com/tu_pagina" target="_blank" rel="noopener" aria-label="Facebook">
                    <i class="fa-brands fa-facebook"></i>
                </a>
                <a href="https://www.instagram.com/tu_usuario" target="_blank" rel="noopener" aria-label="Instagram">
                    <i class="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.tiktok.com/company/tu_empresa" target="_blank" rel="noopener" aria-label="TikTok">
                    <i class="fa-brands fa-tiktok"></i>
                </a>
                <a href="https://wa.me/543421234567" target="_blank" rel="noopener" aria-label="WhatsApp">
                    <i class="fa-brands fa-whatsapp"></i>
                </a>
            </div>
        </div>
    </footer>

    <!-- SCRIPT ajuste iframe -->
    <script type="text/javascript">
        window.addEventListener('message', function (event) {
            var iframe = document.getElementById('siteframe');
            if (event.data > 600) {
                iframe.style.height = (event.data + 90) + 'px';
            } else {
                iframe.style.height = '600px';
            }
        }, false);
    </script>
</body>
</html>
