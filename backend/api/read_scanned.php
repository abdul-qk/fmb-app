<?php

/**
 * Returns the list of policies.
 */
require 'database.php';
require_once 'date.php';

// $date_add = 'DATE_ADD('.$dateformatted.', INTERVAL 750 MINUTE)';
$scanned_list = [];

$sql = "SELECT scan_id, s.debcode, debtype, debname, debmob, ejamathno, scan_time, s.tuk_id,
        CASE
          WHEN tiffinsts LIKE 'taking' THEN 'R'
          ELSE 'U'
        END AS reg_status
        FROM tbl_scan s
        LEFT JOIN tbl_registrations r ON r.debcode = s.debcode
        WHERE DATE(scan_time) = '$dateformatted'
        ORDER BY scan_id DESC";

if ($result = mysqli_query($con, $sql)) {
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $scanned_list[$i]['scan_id']    = $row['scan_id'];
        $scanned_list[$i]['debcode']    = $row['debcode'];
        $scanned_list[$i]['debtype']    = $row['debtype'];
        $scanned_list[$i]['debname']    = $row['debname'];
        $scanned_list[$i]['debmob']     = $row['debmob'];
        $scanned_list[$i]['ejamathno']  = $row['ejamathno'];
        $scanned_list[$i]['scan_time']  = $row['scan_time'];
        $scanned_list[$i]['tuk_id']     = $row['tuk_id'];
        $scanned_list[$i]['reg_status'] = $row['reg_status'];
        $i++;
    }
    echo json_encode($scanned_list);
    // echo $dateformatted;
} else {
    http_response_code(404);
}
