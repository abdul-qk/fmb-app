<?php
require 'database.php';

$tuk_id = $_GET['tuk_id'];
$debcode = $_GET['debcode'];
$reg_status = $_GET['reg_status'];


$date_add = 'DATE_ADD(NOW(), INTERVAL 750 MINUTE)';
// $date_add = 'NOW()';

  // Update.
  $sql = "INSERT INTO tbl_scan (scan_time, debcode, tuk_id, reg_status)
          VALUES ($date_add, '$debcode', $tuk_id, '$reg_status')";

  if(mysqli_query($con, $sql))
  {
    http_response_code(204);
  }
  else
  {
    return http_response_code(422);
  }