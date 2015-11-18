<?php
require_once 'dbconfiguration.php';
class dbOperations extends configuration{
	private $tableName = '`student`';
	
	//returns all the sub-categories with ids from sub_service table for a particular service id 
	public function search($search_array){
		try {
			$selectQuery = "SELECT count(*) as count FROM $this->tableName WHERE" ;
			$search_conditions = '';
			foreach ($search_array as $key =>$value)
			if($search_conditions == "")
				$search_conditions = " `$key` LIKE '%$value%'";
			else
				$search_conditions .= " AND `$key` LIKE '%$value%'";
			$objConnection = $this->Connect();
			$result = $objConnection->query( $selectQuery.$search_conditions );
			$result = mysqli_fetch_assoc($result);
			return $result['count'];
		}
		catch ( Exception $e ) {
			print "Error!: " . $e->getMessage() . "<br/>";
			return false;
		}
	}
	
	public function pagination($search_array,$pageination_data){
		try {
			$selectQuery = "SELECT * FROM $this->tableName WHERE" ;
			$search_conditions = "";
			foreach ($search_array as $key =>$value)
				if($search_conditions == "")
					$search_conditions = " `$key` LIKE '%$value%'";
				else
					$search_conditions .= " AND `$key` LIKE '%$value%'";
				if($pageination_data['orderby'] != "") $search_conditions .= " ORDER BY ".$pageination_data['orderby']." ".$pageination_data['ordertype'];
				if($pageination_data['pageno'] != ""){
					$start = ($pageination_data['pageno']-1) * $pageination_data['perpage'];
					$search_conditions .= " LIMIT ".$start.",".$pageination_data['perpage'];
				}
				
				$objConnection = $this->Connect();
				$result = $objConnection->query( $selectQuery.$search_conditions );
				$data = array();
				while($row = mysqli_fetch_assoc($result)) array_push($data,$row);
				return $data;
	
		}
		catch ( Exception $e ) {
			print "Error!: " . $e->getMessage() . "<br/>";
			return false;
		}
	}
}
?>
