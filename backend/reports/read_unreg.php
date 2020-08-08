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

$sql = "SELECT t.tuk_name, r.debcode, COUNT(r.debcode) as count, debtype, debname, debmob, packqty 
        FROM tbl_scan s 
        LEFT JOIN tbl_tuk t ON t.tuk_id = s.tuk_id 
        LEFT JOIN tbl_registrations r ON r.tuk_id = s.tuk_id 
        WHERE s.debcode IN 
        ( 
            SELECT r.debcode 
            FROM tbl_registrations 
            WHERE confirmed = 0 
        ) 
        AND DATE(scan_time) = '$dateformatted'";

if ($result = mysqli_query($con, $sql)) {
    $i = 0;

    while ($row = mysqli_fetch_assoc($result)) {
        $userlist[$i]['tuk_name']   = $row['tuk_name'];
        $userlist[$i]['debcode']    = $row['debcode'];
        $userlist[$i]['debtype']    = $row['debtype'];
        $userlist[$i]['debname']    = $row['debname'];
        $userlist[$i]['packqty']    = $row['packqty'];
        $i++;
    }

    echo json_encode($userlist);
} else {
    http_response_code(404);
}
