<?php

class MovieApi {
  private $apiKey;
  private $apiUrl = 'https://api.themoviedb.org/3';
  private $pages = 20;

  function __construct($apiKey) {
    $this->apiKey = $apiKey;
  }

  function movieDetails($movieId) {
    $endpoint = "/movie/{$movieId}";
    $params = "?api_key={$this->apiKey}&language=it-IT";
    $url = $this->apiUrl.$endpoint.$params;
    $response = json_decode(file_get_contents($url));
    return $response;
  }

  function popularMovies() {
    function movieIsValid($movie) {
      return (!empty($movie->overview));
    }
    
    $moviesList = [];
    for ($page = 1; $page <= $this->pages ; $page++) {
      $endpoint = "/movie/popular";
      $params = "?api_key={$this->apiKey}&page={$page}&language=it-IT";
      $url = $this->apiUrl.$endpoint.$params;
      $response = json_decode(file_get_contents($url));
      $moviesList = array_merge($moviesList, array_filter($response->results, "movieIsValid"));    
    }
    return $moviesList;
  }

  function randomPopularMovie() {
    function movieIsValid($movie) {
      return (!empty($movie->overview));
    }

    $page = rand(1, $this->pages);
    $endpoint = "/movie/popular";
    $params = "?api_key={$this->apiKey}&page={$page}&language=it-IT";
    $url = $this->apiUrl.$endpoint.$params;
    $response = json_decode(file_get_contents($url));
    $moviesList = array_filter($response->results, "movieIsValid");
    $randomMovie = $this->movieDetails($moviesList[array_rand($moviesList)]->id);
    return $randomMovie;
  }
}

?>