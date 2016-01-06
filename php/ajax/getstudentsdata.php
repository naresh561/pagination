<?php 
require_once("../configurations/dbOperations.php");
		try{
			$resultArray = array(
				"status" => 0,
				"data" => array(),
				"error" => ""
			);
			$search_array = array();
			$pageination_data = array();
			$getCountOffields = array();
			if(isset($_POST['range'])) foreach($_POST['range'] as $key=>$value) $getCountOffields[$key] = array("min"=>$value['min'],"max"=>$value['max']);
			if(isset($_POST['rollnumber'])) $search_array['rollnumber'] = $_POST['rollnumber'];
			if(isset($_POST['first_name'])) $search_array['first_name'] = $_POST['first_name'];
			if(isset($_POST['last_name'])) $search_array['last_name'] = $_POST['last_name'];
			if(isset($_POST['email'])) $search_array['email'] = $_POST['email'];
			if(isset($_POST['marks'])) $search_array['marks'] = $_POST['marks'];
			
			if(isset($_POST['perpage'])) $pageination_data['perpage'] = $_POST['perpage'];
			if(isset($_POST['pageno'])) $pageination_data['pageno'] = $_POST['pageno'];
			if(isset($_POST['orderby'])) $pageination_data['orderby'] = $_POST['orderby'];
			if(isset($_POST['ordertype'])) $pageination_data['ordertype'] = $_POST[ 'ordertype'];
			
			$students = new dbOperations();
			$resultArray['data'] = $students->pagination($search_array,$pageination_data,$getCountOffields);
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