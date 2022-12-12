<?php

require_once('./MovieApi.php');
$movieApi = new MovieApi('f46ce6d28af54da8bd500b75a69cd6cd');

$movies = $movieApi->popularMovies();

echo json_encode(array_column($movies, 'title'));

?>