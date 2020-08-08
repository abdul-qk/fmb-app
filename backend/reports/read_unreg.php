<?php

/**
 * Returns the list of policies.
 */
require '../api/database.php';
require_once '../api/date.php';

$sql_fri = "AND tiffinfreq <> 'F'";
if (date("l", strtotime($dateformatted)) == "Friday") {
    $sql_fri = "";
}

$userlist = [];

$sql = "SELECT t.tuk_name, s.debcode, debtype, debname, debmob, packqty,
        CASE
            WHEN tiffinsts LIKE 'not taking' THEN 'Not Taking'
            ELSE 'Unregistered'
        END AS reg_status
        FROM tbl_scan s
        LEFT JOIN tbl_tuk t ON t.tuk_id = s.tuk_id
        LEFT JOIN tbl_registrations r ON r.debcode = s.debcode
        WHERE s.debcode
            IN (SELECT debcode
            FROM tbl_registrations
            WHERE confirmed = 0 OR tiffinsts NOT LIKE 'taking') 
        AND DATE(scan_time) = '$dateformatted'";

if ($result = mysqli_query($con, $sql)) {
    $i = 0;

    while ($row = mysqli_fetch_assoc($result)) {
        $userlist[$i]['tuk_name']   = $row['tuk_name'];
        $userlist[$i]['debcode']    = $row['debcode'];
        $userlist[$i]['debtype']    = $row['debtype'];
        $userlist[$i]['debname']    = $row['debname'];
        $userlist[$i]['packqty']    = $row['packqty'];
        $userlist[$i]['debmob']     = $row['debmob'];
        $userlist[$i]['reg_status'] = $row['reg_status'];
        $i++;
    }

    echo json_encode($userlist);
} else {
    http_response_code(404);
}
