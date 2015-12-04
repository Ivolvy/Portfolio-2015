<?php


if(isset($_POST["submit"])){
    // Checking For Blank Fields..
    if($_POST["name"]==""||$_POST["email"]==""||$_POST["message"]==""){
        echo "Fill All Fields..";
    }
}else{
    // Check if the "Sender's Email" input field is filled out
    $email2=$_POST['email'];
    // Sanitize E-mail Address
    $email2=filter_var($email2, FILTER_SANITIZE_EMAIL);
    // Validate E-mail Address
    $email2= filter_var($email2, FILTER_VALIDATE_EMAIL);

    $to = 'michael.genty@free.fr';
    $subject = 'portfolio-contact';
    $message = 'message';
    $headers = 'headers';

    if (!$email2){
        echo "Invalid Sender's Email";
    }
    else{
        $message = $_POST['message'];
        $headers = 'From:'. $email2 . "\r\n"; // Sender's Email
        $headers .= 'Cc:'. $email2 . "\r\n"; // Carbon copy to Sender
        // Message lines should not exceed 70 characters (PHP rule), so wrap it
        $message = wordwrap($message, 70);
        // Send Mail By PHP Mail Function
        mail($to, $subject, $message, $headers);
        echo "Your mail has been sent successfuly ! Thank you for your feedback";
    }
}


?>