<?php

/**
 * Returns the list of policies.
 */
require 'database.php';

$notuserlist = [];

$sql = "SELECT debcode, debtype, debname, debmob, tuk_id, ejamathno 
        FROM tbl_registrations 
        WHERE debcode NOT IN (SELECT debcode FROM tbl_scan WHERE DATE(scan_time) = CURDATE()) && tiffinsts NOT LIKE 'TAKING'";

if ($result = mysqli_query($con, $sql)) {
  $i = 0;
  while ($row = mysqli_fetch_assoc($result)) {
    $notuserlist[$i]['debcode']    = $row['debcode'];
    $notuserlist[$i]['debname']    = $row['debname'];
    $notuserlist[$i]['debtype']    = $row['debtype'];
    $notuserlist[$i]['debmob']     = $row['debmob'];
    $notuserlist[$i]['tuk_id']     = $row['tuk_id'];
    $notuserlist[$i]['ejamathno']  = $row['ejamathno'];
    $i++;
  }

  echo json_encode($notuserlist);
} else {
  http_response_code(404);
}
