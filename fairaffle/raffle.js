
Math.seededRandom = function(max, min) {
    max = max || 1;
    min = min || 0;

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;

    return min + rnd * (max - min);
}

function getSaltySeededRandom(seed, max){
  // TODO: Provide that using saltMySeeds()
  // the initial seed
  Math.seed = seed;

  // in order to work 'Math.seed' must NOT be undefined,
  // so in any case, you HAVE to provide a Math.seed
  seededRandomFloating = Math.seededRandom(max, 1)
  seededRandom = Math.trunc( seededRandomFloating )
  return(seededRandom)
}

function representCharactersAsNumbers(inputString){
  // Loop through every char of the seed and assign its numerical representation into the combined seed
  // TODO-luxury: Compress the values of really long strings so the number isn't huge
  numerical_representation = ""
  for (var i = 0; i < inputString.length; i++) {
    numerical_representation += inputString.charCodeAt(i)
  }
  return(numerical_representation)
}

function combineSeeds(){
  // Create a unique signature (collating multiple seeds), given two arbitrary strings.
  combinedSeed = ""

  // Declare loop factors
  var i = 0,
    len = arguments.length;

  // Loop through every seed that has been passed and mix them together, returning a unique number
  for( ; i < len; i += 1 ){
    seedRaw = arguments[i]
    seedAsNumber = representCharactersAsNumbers(seedRaw)
    combinedSeed += seedAsNumber
  }

  return(combinedSeed)
}

async function getNewsArticle(){
  // Fetches the seed, something that nobody knows until it's out, tell user it's too early if not possible
  var APIkey = "50860275-8a99-4b1e-811b-a1f0bba13c11"
  var endpointAPI = "https://content.guardianapis.com/search?api-key=" + APIkey

  //await the response of the fetch call
  let response = await fetch(endpointAPI);
  //proceed once the first promise is resolved.
  let newsItems = await response.json()
  //proceed only when the second promise is resolved
  console.log(newsItems)
  return newsItems;
}

function drawRaffle(){
  // Obtain the reference user provided
  var seed_reference = document.getElementById("input_raffleRef").value;
  // Obtain the participants number user provided
  var number_participants = document.getElementById("input_participants").value;


  var final_seed = "";
  // Set the initial message while value is being fetched
  getNewsArticle()
  .then(function(newsItems){
    // TODO: Select a meaningful item as the chosen one
    seed_secret = newsItems.response.results[0]["id"]

    // Show the fetched secret seed to the user
    document.getElementById("news").innerHTML = seed_secret;

    // Returns the final seed by salting the seed reference (the word the user knows) + the news article
    final_seed = combineSeeds(seed_reference, seed_secret)

    // Calculate winner
    winner = getSaltySeededRandom(final_seed, number_participants)
    // Present result to the user
    document.getElementById("result").innerHTML = winner;
  })
}
