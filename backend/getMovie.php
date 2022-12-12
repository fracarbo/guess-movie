<?php

require_once('./MovieApi.php');
$movieApi = new MovieApi('f46ce6d28af54da8bd500b75a69cd6cd');

$randomMovie = $movieApi->randomPopularMovie();

echo json_encode(
  array(
    "title" => $randomMovie->title,
    "plot" => str_ireplace($randomMovie->title, "<titolo film>", $randomMovie->overview),
    "genres" => array_column($randomMovie->genres, 'name'),
    "release_date" => $randomMovie->release_date,
    "production_companies" => array_column($randomMovie->production_companies, 'name')
  )
);

?>