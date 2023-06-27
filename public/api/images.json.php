<?php 

// $d
if (isset($_POST['d'])) $d=$_POST['d'];
else if (isset($_GET['d'])) $d = $_GET['d'];
// 
if(isset($d) && !empty($d)){
	if(is_dir("../dhjapan/".$d)) {
		$files_list = array();
		$handle = opendir("../dhjapan/".$d); 
		while (false !== ($file = readdir($handle))){ 
			if ($file != "." && $file != ".." && substr($file, -2)!= "db") { 
				$files_list[] = array("src" => "http://lavorama.net/dhjapan/" . $d . '/' . $file);
			} 
		}
		closedir($handle);
		sort ($files_list);
	
	}
}
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');
echo json_encode($files_list);
exit();
?>