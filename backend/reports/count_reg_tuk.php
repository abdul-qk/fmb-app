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

$sql = "SELECT t.tuk_name, COUNT( debcode ) AS count
        FROM tbl_scan s
        LEFT JOIN tbl_tuk t ON t.tuk_id = s.tuk_id
        WHERE s.debcode
        IN (
            SELECT r.debcode
            FROM tbl_registrations r
            WHERE tiffinsts LIKE 'TAKING'
            AND confirmed = 1
        ) 
        AND DATE(scan_time) = '$dateformatted'
        GROUP BY s.tuk_id";

if ($result = mysqli_query($con, $sql)) {
    $i = 0;

    while ($row = mysqli_fetch_assoc($result)) {
        $userlist[$i]['tuk_name']   = $row['tuk_name'];
        $userlist[$i]['count']      = $row['count'];
        $i++;
    }

    echo json_encode($userlist);
} else {
    http_response_code(404);
}
