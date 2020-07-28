<?php
require 'database.php';

$tuk_id = $_GET['tuk_id'];
$debcode = $_GET['debcode'];

  // Update.
  $sql = "UPDATE tbl_tuk
          SET tuk_id= $tuk_id
          WHERE debcode = '$debcode'";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }  