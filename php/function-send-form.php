<?php

//echo 111;

if(isset($_POST)) {

//    print_r($_POST);


    if (isset($_POST['fullname']) && isset($_POST['fullphone'])&& isset($_POST['email'])) {
        if (mb_strlen($_POST['fullname']) === false) {
            $data['error'] = "Заполните Ваше имя";
        }
        if (mb_strlen($_POST['fullphone']) === false) {
            $data['error'] = "Заполните поле телефон";
        }
        if (mb_strlen($_POST['email']) === false) {
            $data['error'] = "Заполните Ваш Емейл";
        }
    }
    else {
        $data['error'] = "Заполните пожалуйста все поля";
    }

    if (isset($data['error'])) {
        echo json_encode($data);
        die();
    }

//    echo 222;


    $body = '
        <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
        <tbody>
            <tr>
                <td align="center">
                    <table border="0" width="700" height="150px" cellspacing="0" cellpadding="0">
                    <tbody>
                    <tr>
                    <td>
                    <h1>Регистрация на школу управления коммерчиской недвижимостью</h1>
    ';
    $body .= "<p style='font-size: 16px;'>ФИО: " . htmlentities ( $_POST['fullname'] ) . "</p>";
    $body .= "<p style='font-size: 16px;'>Емейл:" .htmlentities ( $_POST['fullphone'] ) . "</p>";
    $body .= "<p style='font-size: 16px;'>Телефон:" .htmlentities ( $_POST['email'] ) . "</p>";
    if (isset($_POST['company'])) {
        $body .= "<p style='font-size: 16px;'>Компания: " . htmlentities ( $_POST['company'] ) . "</p>";
    }
    if (isset($_POST['message'])) {
        $body .= "<p style='font-size: 16px;'>ФИО: " . htmlentities ( $_POST['message'] ) . "</p>";
    }

    $body .= '
                </td>
                </tr>
                </tbody>
                </table>
                </td>
            </tr>
        </tbody>
        </table>
    ';

//    echo $body;
//    die();


	try{
        //путь до конфигурационного файла для вашего smtp сервера
        require_once('config.php');

        //путь до класса phpmailer
        require_once('phpmailer/PHPMailerAutoload.php');

        $mail = new PHPMailer(true);

        $mail->IsSMTP();
        $mail->Host       = $__smtp['host'];
        $mail->SMTPDebug  = $__smtp['debug'];
        $mail->SMTPAuth   = $__smtp['auth'];
        $mail->Port       = $__smtp['port'];
        $mail->SMTPSecure = $__smtp['secure'];
        $mail->CharSet    = "UTF-8";
        $mail->Username   = $__smtp['username'];
        $mail->Password   = $__smtp['password'];
        //кому письмо
        $mail->AddAddress($__smtp['addreply']);
        // $mail->AddReplyTo($email, $name);
        //от кого (желательно указывать свой реальный e-mail на используемом SMTP сервере
        $mail->SetFrom($__smtp['username'], $subject);
        $mail->Subject = $subject;
        $mail->MsgHTML($body);
        $mail->AddAddress('dimon200295@gmail.com');
        //           if (isset($_FILES)) {
        //           foreach ($_FILES as $key => $value) {
        //            if ($value['tmp_name']!="") {
        //              $mail->AddAttachment($value['tmp_name'],$key."-".$value['name']);
        //            }
        //           }
        //           }
        if ($mail->Send()) {
         $data['success'] = "Ваша заявка успешно отправлена!";
        }
        else {
         $data['error'] = "Не удалось отправить Ваш емейл! Повторите попытку позже или свяжитесь с нами по телефону.";
        }
        echo json_encode($data);
        die();
    }
    catch (Exception $e) {
        $mail->ErrorInfo;
        // Обрабатываем неудачную отправку
        $data['error'] = "Не удалось отправить Ваш емейл! Повторите попытку позже или свяжитесь с нами по телефону.";
        echo json_encode($data);
        die();
    }
}
exit;
 ?>