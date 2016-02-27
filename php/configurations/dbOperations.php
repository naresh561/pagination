<?php
require_once 'dbconfiguration.php';
class dbOperations extends configuration{
	private $tableName = '`student`';
	
	//returns all the sub-categories with ids from sub_service table for a particular service id 
	public function search($search_array,$getCountOffields,$israngeChanged,$selectableFilds,$isselectionChanged){
		try {
			$search_conditions = '';
			foreach ($search_array as $key =>$value)
			if($search_conditions == "")
				$search_conditions = "WHERE `$key` LIKE '%$value%'";
			else
				$search_conditions .= " AND `$key` LIKE '%$value%'";
			$querystring = "";
			foreach ($getCountOffields as $fields => $valueArray){
				$querystring = $querystring . ", min(".$fields.") as " . $fields ."__min ". ", max(".$fields.") as " . $fields ."__max";
				if($israngeChanged){
					if($search_conditions == "")
						$search_conditions = "WHERE `$fields` BETWEEN ".$valueArray['min']. " AND ". $valueArray['max'];
					else
						$search_conditions .= " AND `$fields` BETWEEN ".$valueArray['min']. " AND ". $valueArray['max'];
				}
			}
			if($isselectionChanged){
				foreach ($selectableFilds as $fields => $valueArray){
					if(count($valueArray)>0){
						$selectabledata = '"'.implode('","',$valueArray).'"';
						if($search_conditions == "")
							$search_conditions = "WHERE `$fields` in ($selectabledata)";
						else
							$search_conditions .= " AND `$fields` in ($selectabledata)";
					}
				}
			}
			$selectQuery = "SELECT count(*) as count ".$querystring." FROM $this->tableName" ;
			$objConnection = $this->Connect();
			$result = $objConnection->query( $selectQuery.$search_conditions );
			$result = mysqli_fetch_assoc($result);
			$data['count'] = $result['count'];
			$data['range'] = array();
			$data['selectables'] = array();
			foreach ($getCountOffields as $fields => $valueArray){ array_push($data['range'],array("field" => $fields ,"min"=> $result[$fields.'__min'],"max"=> $result[$fields.'__max']));
			}
			if(!$isselectionChanged){
				foreach(array_keys($selectableFilds) as $key){
					$selectQuery = "SELECT DISTINCT $key FROM $this->tableName ";
					$objConnection = $this->Connect();
					$result = $objConnection->query( $selectQuery.$search_conditions );
					$newarray = array();
					while($row = mysqli_fetch_assoc($result)) array_push($newarray,$row[$key]);
					$data['selectables'][$key] = $newarray;
				}
			}
			return $data;
		}
		catch ( Exception $e ) {
			print "Error!: " . $e->getMessage() . "<br/>";
			return false;
		}
	}
	
	public function pagination($search_array,$pageination_data,$getCountOffields,$selectableFilds){
		try {
			$search_conditions = '';
			foreach ($search_array as $key =>$value)
			if($search_conditions == "")
				$search_conditions = "WHERE `$key` LIKE '%$value%'";
			else
				$search_conditions .= " AND `$key` LIKE '%$value%'";
			foreach ($getCountOffields as $fields => $valueArray){
				if($search_conditions == "")
					$search_conditions = "WHERE `$fields` BETWEEN ".$valueArray['min']. " AND ". $valueArray['max'];
				else
					$search_conditions .= " AND `$fields` BETWEEN ".$valueArray['min']. " AND ". $valueArray['max'];
			}
			foreach ($selectableFilds as $fields => $valueArray){
				if(count($valueArray)>0){
					$selectabledata = '"'.implode('","',$valueArray).'"';
					if($selectabledata != '""')
					if($search_conditions == "")
						$search_conditions = "WHERE `$fields` in ($selectabledata)";
					else
						$search_conditions .= " AND `$fields` in ($selectabledata)";
				}
			}
			$selectQuery = "SELECT * FROM $this->tableName" ;
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