<?php

require 'database.php';

// Extract, validate and sanitize the id.
$tuk_id = $_GET['tuk_id'];
echo $tuk_id;
exit();

// Delete SQL
$sql = "DELETE FROM tbl_tuk WHERE tuk_id = $tuk_id";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}