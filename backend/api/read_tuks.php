<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$tuklist = [];
$sql = "SELECT tuk_id, tuk_name, tuk_contact FROM tbl_tuk";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $tuklist[$i]['tuk_id']      = $row['tuk_id'];
    $tuklist[$i]['tuk_name']    = $row['tuk_name'];
    $tuklist[$i]['tuk_contact'] = $row['tuk_contact'];
    $i++;
  }

  echo json_encode($tuklist);
}
else
{
  http_response_code(404);
}