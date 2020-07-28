<?php

require 'database.php';

// Extract, validate and sanitize the id.
$scan_id = $_GET['scan_id'];

// Delete SQL
$sql = "DELETE FROM tbl_scan WHERE scan_id = $scan_id";

if(mysqli_query($con, $sql))
{
  http_response_code(204);
}
else
{
  return http_response_code(422);
}