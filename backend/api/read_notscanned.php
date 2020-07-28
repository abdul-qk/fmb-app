<?php

/**
 * Returns the list of policies.
 */
require 'database.php';
require_once 'date.php';

$sql_fri = "AND tiffinfreq <> 'F'";
if(date("l", strtotime($dateformatted)) == "Friday"){
  $sql_fri = "";
}

$userlist = [];

$sql = "SELECT debcode, debtype, debname, debmob, tuk_id, ejamathno, tiffinsts,
      CASE
          WHEN tiffinsts LIKE 'taking' THEN 'R'
          ELSE 'U'
      END AS reg_status
      FROM tbl_registrations 
      WHERE debcode NOT IN (SELECT debcode FROM tbl_scan WHERE DATE(scan_time) = '$dateformatted') $sql_fri";

if ($result = mysqli_query($con, $sql)) {
  $i = 0;
  while ($row = mysqli_fetch_assoc($result)) {
    $userlist[$i]['debcode']      = $row['debcode'];
    $userlist[$i]['debname']      = $row['debname'];
    $userlist[$i]['debtype']      = $row['debtype'];
    $userlist[$i]['debmob']       = $row['debmob'];
    $userlist[$i]['tuk_id']       = $row['tuk_id'];
    $userlist[$i]['ejamathno']    = $row['ejamathno'];
    $userlist[$i]['reg_status']   = $row['reg_status'];
    $i++;
  }

  echo json_encode($userlist);
} else {
  http_response_code(404);
}
