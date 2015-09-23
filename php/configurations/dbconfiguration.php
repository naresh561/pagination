<?php
 class configuration{
	public function Connect()
	{
			$arrDataBaseDetails = parse_ini_file("config.ini"); // parsing of the ini file
			$dbName = $arrDataBaseDetails['DbName']; 
			$dbUserName = $arrDataBaseDetails['DbUserName']; 
			$dbPassword = $arrDataBaseDetails['DbPassword'];
			$hostName = $arrDataBaseDetails['HostName'];
			
			try {
   				//$strDbConnect = "mysql:dbname=$dbName;host=$hostName";
				$objPDO = mysqli_connect($hostName,$dbUserName,$dbPassword,$dbName);
				return $objPDO;
			} 
			catch ( PDOException $e ) {
  				print "Error!: " . $e->getMessage() . "<br/>";
				die();
				return false;
			}
		}
	}
?>