
Math.seededRandom = function(max, min) {
  /* Math that allows a seeded RNG  */
    max = max || 1;
    min = min || 0;

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;

    return min + rnd * (max - min);
}

function getPreseededRNG(final_seed, max){
  /* Simple RNG that rolls a random number within the given max range
   HOWEVER using a predetermined seed for the RNG roll
  */

  // Set final seed, as produced by combineSeeds()
  // In order for the RNG to work 'Math.seed' must NOT be undefined,
  // so you HAVE to provide it
  Math.seed = final_seed;
  // Pad max by 1 to make the RNG inclusive, as the function is exclusive
  max = Number(max) + 1;
  // Get a random number between 1 and the maximum (number of participants)
  seededRandomFloating = Math.seededRandom(max, 1)
  // Truncate the float number to a whole integer
  seededRandom = Math.trunc( seededRandomFloating )
  return(seededRandom)
}

function representCharactersAsNumbers(inputString){
  /* Loop through every char of the seed and assign
   its numerical representation into the combined seed
  */
  numRepresentation = 0
  // Create the numerical representation for the given string by addition
  for (var i = 0; i < inputString.length; i++) {
    numRepresentation = numRepresentation + inputString.charCodeAt(i)
  }
  return(numRepresentation)
}

function combineSeeds(){
  /* Create a unique signature (collating multiple seeds), given two arbitrary strings.
     It can take any characters, since they get minced to numbers no matter what
  */
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
  var keywords = ""
  var endpointAPI = "https://content.guardianapis.com/search?api-key=" + APIkey
  //var endpointAPI = "https://content.guardianapis.com/search?q="+keywords+"&api-key=" + APIkey


  //await the response of the fetch call
  let response = await fetch(endpointAPI);
  //proceed once the first promise is resolved.
  let newsItems = await response.json()
  //proceed only when the second promise is resolved
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
    console.log(newsItems.response)

    // Returns the final seed by salting the seed reference (the word the user knows) + the news article
    final_seed = combineSeeds(seed_reference, seed_secret)

    // Calculate winner - dependent on the total participants
    winner = getPreseededRNG(final_seed, number_participants)
    // Present result to the user
    document.getElementById("result").innerHTML = winner;
    // Update visible fetch timestamp
    document.getElementById("time-fetched").innerHTML = "Result fetched at " + new Date().toLocaleTimeString()
    // Update visible news timestamp
    document.getElementById("time-news-published").innerHTML = "News published at " + newsItems.response.results[0]["webPublicationDate"]


  })
}
