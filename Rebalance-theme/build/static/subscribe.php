<?php
$errors = '';
$myemail = 'admin@website.com';//<-----Put Your admin email address here.
if(empty($_POST['subscribe']) )
{
  $errors .= "\n Error: all fields are required";
}

$email_address = $_POST['subscribe'];

if (!preg_match(
  "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i",
  $email_address))
{
  $errors .= "\n Error: Invalid email address";
}

if( empty($errors))
{
  $to = $myemail;
  $email_subject = "Contact form submission";
  $email_body = "You have received a new subscriber email. ".
    " Here are the details:\n Email: $email_address ";

  $headers = "From: $myemail\n";
  $headers .= "Reply-To: $email_address";

  mail($to,$email_subject,$email_body,$headers);
  //redirect to the 'thank you' page
  echo "Thank you for submitting the form. We will contact you soon!";
}
?>
