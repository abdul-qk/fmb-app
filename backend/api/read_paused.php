<?php

/**
 * Returns the list of policies.
 */
require 'database.php';
require_once 'date.php';

$scanned_list = [];
$sql = "SELECT d.debcode, debtype, debname, debmob, ejamathno, r.tuk_id, req_startdate, req_stopdate FROM tbl_deliveryreq d
        LEFT JOIN tbl_registrations r ON r.debcode = d.debcode
        WHERE $dateformatted BETWEEN DATE(d.req_stopdate) AND DATE(d.req_startdate);";

if ($result = mysqli_query($con, $sql)) {
    $i = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $scanned_list[$i]['debcode']        = $row['debcode'];
        $scanned_list[$i]['debtype']        = $row['debtype'];
        $scanned_list[$i]['debname']        = $row['debname'];
        $scanned_list[$i]['debmob']         = $row['debmob'];
        $scanned_list[$i]['ejamathno']      = $row['ejamathno'];
        $scanned_list[$i]['tuk_id']         = $row['tuk_id'];
        $scanned_list[$i]['req_stopdate']   = $row['req_stopdate'];
        $scanned_list[$i]['req_startdate']  = $row['req_startdate'];
        $i++;
    }

    echo json_encode($scanned_list);
} else {
    http_response_code(404);
}
