
function getSaltySeededRandom(seed, max){
  // TODO: Find way to set RNG's seed like in Python, so that the result is the same
  rng_outcome = Math.floor((Math.random() * max) + 1);
  return(rng_outcome)
}

function saltMySeeds(seed1, seed2){
  // Create a unique signature (collate multiple seeds), given two arbitrary strings.
  saltedSeed = seed1 + seed2
  return(saltedSeed)
}

function getNewsArticle(){
  // Fetches the seed, something that nobody could know until the time it's released.
  return("theseAreTomorrowsNewsRightNow")
}

function drawRaffle(){
  // Obtain the reference user provided
  var seed_reference = document.getElementById("input_raffleRef").value;
  // Obtain the participants number user provided
  var number_participants = document.getElementById("input_participants").value;
  // Attempt the secret that nobody knows until it's out, tell user it's too early if not possible
  var seed_secret = getNewsArticle()

  var final_seed = saltMySeeds(seed_reference, seed_secret)
  // End part - reached only if the secret seed has been released
  // Calculate winner
  winner = getSaltySeededRandom(final_seed, number_participants)
  // Present result to the user
  document.getElementById("result").innerHTML = winner;
}
