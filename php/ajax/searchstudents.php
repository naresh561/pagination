<?php
require_once("../configurations/dbOperations.php");
		try{
			$resultArray = array(
				"status" => 0,
				"data" => array(),
				"error" => ""
			);
			$search_array = array();
			$getCountOffields = array();
			$israngeChanged = false;
			if(isset($_POST['range'])) foreach($_POST['range'] as $key=>$value) $getCountOffields[$key] = array("min"=>$value['min'],"max"=>$value['max']);
			if(isset($_POST['rollnumber'])) $search_array['rollnumber'] = $_POST['rollnumber'];
			if(isset($_POST['first_name'])) $search_array['first_name'] = $_POST['first_name'];
			if(isset($_POST['last_name'])) $search_array['last_name'] = $_POST['last_name'];
			if(isset($_POST['email'])) $search_array['last_name'] = $_POST['email'];
			if(isset($_POST['marks'])) $search_array['marks'] = $_POST['marks'];
			if(isset($_POST['israngeChanged'])) $israngeChanged = $_POST['israngeChanged'] == "true" ? true : false;
			$students = new dbOperations();
			$studentslist = $students->search($search_array,$getCountOffields,$israngeChanged);
			$resultArray['data'] = $studentslist;
			$resultArray['status'] = 1;
			echo json_encode($resultArray);
		}
		catch(Exception $e)
		{
			$resultArray['status'] = 0;
			$resultArray['error'] = $e->getMessage();
			echo json_encode($resultArray);
		}
?>