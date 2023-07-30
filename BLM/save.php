<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" type="text/css" href="style.css">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Pacifico&family=Playfair+Display:wght@600&family=Poppins&family=Roboto&family=Ubuntu&display=swap');
    *{
      font-family : 'Ubuntu';
      background-color : #333333;
      color : white;
    }
    .timer{
  display:flex;
  justify-content : center;
  align-items : center;
  }
  .time{
    margin-left : 10px;
  }

  </style>
</head>
<body>
  <header>
    <h1>Emergency services are on their way to help you .</h1>
  </header>
  <div class="timer">
    <h2>REDIRECTING IN :</h2><h2 class="time">10 SECONDS</h2>
  </div>
  <img class="image" src="img.jpg" style="width:80vw;margin-left:10vw;height:70vh">

</body>
</html>

<?php
extract($_REQUEST);

// Create or open the CSV file in append mode
$file = fopen("form_save.csv", "a");

// Prepare the data array
$data = array(
  "name" => $name,
  "age" => $age,
  "blood group" => $bloodGroup,
  "number_of_people_around" => $numPeople,
);

// Write the data to the CSV file
fputcsv($file, $data);

// Close the file
fclose($file);

// Javascript in php
?>
<script type="text/javascript">
  let timer = 10;
  let timeEl = document.querySelector('.time')
setInterval(function(){
  timeEl.textContent = ` ${timer} SECONDS`;
  timer = timer-1;
},1000)
setTimeout(function(){
  window.location.href="../map/map.html"
},10000)
</script> 
