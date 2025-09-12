Imports System.Net
Imports System.Web.Services
Imports System.Net.Mail
Imports System.Data.SqlClient ' Add this import for SQL
Imports System.cdosys


Partial Class contacto
    Inherits System.Web.UI.Page

    Protected Shared ReCaptcha_Key As String = "6Le9shwUAAAAAOeFRowQ_ad4Tnl6Kx2Ih1VoT0bA"
    Protected Shared ReCaptcha_Secret As String = "6Le9shwUAAAAACReu_mi1zFCORbmXrdkk63ybv3I"
    Public asd As String = "0"
    Public cook As HttpCookie = Nothing
    Private cadena As String = "0"
    Private numero1 As String = "0"
    Private numero2 As String = "0"
    Public Property validarSuma As String = "¿Cuanto es 0 + 0 ?"
    Private senia As Integer = 0

    Protected Sub enviar_Click(sender As Object, e As EventArgs) Handles enviar.Click

        Dim nombre As String = LTrim(RTrim(Me.nombre.Value))
        Dim mail As String = LTrim(RTrim(Me.email.Value))
        numero1 = CStr(Session("n1"))
        numero2 = CStr(Session("n2"))
        Dim operacion As String = CStr(CInt(numero1) + CInt(numero2))

        If operacion.Equals(LTrim(RTrim(Me.suma.Value))) Then

            If nombre.Length > 0 And verificarMail(mail) = True And Not Me.comentario.Value.Contains("http") = True And Not verificarMail(Me.empresa.Value) = True And Not mail.Contains("http") = True And Not Me.empresa.Value.Contains("http") = True Then

                Dim telefono As String = Me.telefono.Value
                Dim comentario As String = Me.comentario.Value
                Dim empresa As String = Me.empresa.Value
                Dim rubro As String = Me.rubro.Value
                Dim servicio As String = Me.servicio.Value
                Dim fecha As String = DateTime.Now()

                Dim conn As System.Data.SqlClient.SqlConnection = Nothing
                Dim sql As System.Data.SqlClient.SqlCommand
                Dim i As Integer = 0

                abrirConexion(conn)

                sql = New System.Data.SqlClient.SqlCommand
                sql.CommandText = "INSERT INTO contactoTemporal (nombre, mail, telefono, comentario, fecha, empresa, rubro, servicio) VALUES('" & nombre & "', '" & mail & "', '" & telefono & "', '" & comentario & "', '" & empresa & "', '" & rubro & "', '" & servicio & "') "
                sql.Connection = conn
                i = sql.ExecuteNonQuery()

                If i = 1 Then
                    Response.Write("<script language=javascript>alert('Se ha enviado exitosamente!!!');</script>")
                Else
                    Response.Write("<script language=javascript>alert('Error al enviar el contacto.');</script>")
                End If

                cerrarConexion(conn)

                System.Threading.Thread.Sleep(3000)

                If Not Right(mail, 3).Equals(".ru") Then

                    If Not comentario.Contains("24crypto.de") = True Then

                        Dim titulo As String = "Un nuevo contacto desde el Sitio Web ha dejado su comentario:"
                        Dim cuerpo As String = ""

                        cuerpo = titulo & vbCrLf & vbCrLf & "Nombre Y Apellido :" & nombre & vbCrLf & "Empresa: " & empresa & vbCrLf & "Teléfono: " & telefono & vbCrLf & "E-mail: " & mail & vbCrLf & "Rubro: " & rubro & vbCrLf & "Servicio: " & servicio & vbCrLf & "Comentario: " & vbCrLf & comentario

                        Dim mensaje As New MailMessage()
                        mensaje.From = New MailAddress("web@megasoft.com.ar")
                        mensaje.To.Add("ventas@megasoft.com.ar")
                        mensaje.Subject = "Nuevo Contacto Sitio Web Megasoft"
                        mensaje.Body = cuerpo
                        mensaje.IsBodyHtml = False

                        Dim clienteSmtp As New SmtpClient("mail.megasoft.com.ar")
                        clienteSmtp.Port = 25
                        clienteSmtp.Credentials = New NetworkCredential("web@megasoft.com.ar", "011091Mandrake")
                        clienteSmtp.EnableSsl = False

                        clienteSmtp.Send(mensaje)

                    End If

                End If


                Me.nombre.Value = ""
                Me.email.Value = ""
                Me.telefono.Value = ""
                Me.comentario.Value = ""
                Me.empresa.Value = ""
                Me.rubro.Value = ""
                Me.servicio.Value = ""
                senia = 1
                Response.Redirect("https://www.megasoft.com.ar/gracias.aspx")

            ElseIf Me.nombre.Value.Length = 0 Then
                Me.nombre.Style.Add("border-color", "red")
                numero1 = CStr(Session("n1"))
                numero2 = CStr(Session("n2"))
                validarSuma = "¿Cuanto es " & numero1 & " + " & numero2 & "?"

            ElseIf Me.comentario.Value.Contains("http") = True Then
                Me.comentario.Style.Add("border-color", "red")
                numero1 = CStr(Session("n1"))
                numero2 = CStr(Session("n2"))
                validarSuma = "¿Cuanto es " & numero1 & " + " & numero2 & "?"

            Else
                Me.email.Style.Add("border-color", "red")
                numero1 = CStr(Session("n1"))
                numero2 = CStr(Session("n2"))
                validarSuma = "¿Cuanto es " & numero1 & " + " & numero2 & "?"
            End If

        Else
            Me.suma.Style.Add("border-color", "red")
            numero1 = CStr(Session("n1"))
            numero2 = CStr(Session("n2"))
            validarSuma = "¿Cuanto es " & numero1 & " + " & numero2 & "?"
        End If

    End Sub

    Private Sub abrirConexion(ByRef conn As System.Data.SqlClient.SqlConnection)
        conn = New System.Data.SqlClient.SqlConnection()
        conn.ConnectionString = "Data Source=.;integrated security=SSPI;initial catalog=v0021214_MegaTemp"
        conn.Open()
    End Sub

    Private Sub cerrarConexion(ByRef conn As System.Data.SqlClient.SqlConnection)
        conn.Close()
    End Sub

    Protected Sub contacto_Load(sender As Object, e As EventArgs) Handles Me.Load
        If Not IsPostBack Then
            Me.nombre.Style.Remove("border-color")
            Me.nombre.Style.Remove("background-color")
            Me.email.Style.Remove("border-color")
            Me.email.Style.Remove("background-color")
            senia = 0
            Me.Hora()
        End If
    End Sub

    Private Function Hora()
        If senia = 0 Then
            cadena = Right(CStr(DateTime.Now()), 5)
            numero1 = cadena.Substring(0, 1)
            numero2 = cadena.Substring(1, 1)
            validarSuma = "¿Cuanto es " & numero1 & " + " & numero2 & "?"
            Session("n1") = numero1
            Session("n2") = numero2
        End If
    End Function

    Private Shared Function verificarMail(cadena As String) As Boolean
        If cadena.Length > 0 Then
            If cadena.Contains("@") = True Then
                If cadena.Contains(".") = True Then
                    If cadena.IndexOf("@") < cadena.IndexOf(".") Then
                        Return True
                    Else
                        Return False
                    End If
                Else
                    Return False
                End If
            Else
                Return False
            End If
        Else
            Return False
        End If
    End Function
End Class