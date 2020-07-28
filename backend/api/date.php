<?php

//Get the date from the picker
$date = $_GET['curDate'];
$gmtTimezone = new DateTimeZone('Asia/Colombo');
$dtFormat = new DateTime("@$date");
$dtFormat->setTimezone($gmtTimezone);
$dateformatted = $dtFormat->format('Y-m-d');    