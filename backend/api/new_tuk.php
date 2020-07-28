<?php
require 'database.php';

$tuk_name = $_GET['tuk_name'];
$address = $_GET['address'];
$mobile = $_GET['mobile'];
$email = $_GET['email'];

  // Update.
  $sql = "INSERT INTO tbl_tuk(tuk_name, tuk_address, tuk_contact, tuk_email)
          VALUES ('$tuk_name', '$address', '$mobile', '$email')";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  