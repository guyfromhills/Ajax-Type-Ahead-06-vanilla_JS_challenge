// Main-tasK:
//1.access data inside the json file which contains a huge array 
//2. Bring in array data, so that whenever information matching a city or state is put in a box, filter array
//down to a subset



//  sub task - 1
// Set endpoint

//endpoint is the touchpoint where API sends request through the communication channel to where the resource lives 
const endpoint = "https://simplemaps.com/static/data/country-cities/in/in.json";

//  sub task - 2
// create an empty array and use fetch API to make request to endpoint

//creating an empty array
const cities = [];

// //using fetch API to send request
 fetch(endpoint)

 //can not use JSON.parse since we do not know of data type, raw data needs to be converted into json
 .then(function (blob){
     return blob.json();           //blob.json() returns another promise
 }) 

 //calling then on another promise from blob.json() so as to get raw json data
 .then(function (data){ 

    //  sub task - 3
//to get each and every item into array(cities)

//   return cities.push(data);     //pushing data into cities array gives us a nested array
    return cities.push(...data);   //pushing data into cities array so that nesting does not happen by using spread


 });



 
    //  sub task - 4
//  create a function so that whenever info matching states or cities is entered, the array is filtered down 
// to subset

function findMatches(wordToMatch, cities){  //word to match is the data entered and cities is the one we are mathching against

    return cities.filter( function (place){

        //here we need to figure out if the city or state matches the data that was entered
        //creating a variable regex to pass into regular expression
        const regex = new RegExp(wordToMatch,'gi') ;  //g = global ( looks entire string) and i is case insensitive
        return place.city.match(regex) || place.admin_name.match(regex);  // returning either city or state that was matched


    });

};

// sub task - 6
// add commas to numbers

function numberWithCommas(x){  //got from stack overflow

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}


    //  sub task - 5
//  create a display function, which is called whenever someone changes the value in search by selecting the
// input 

function displayMatches(){
    const matchArray = findMatches(this.value, cities);   //returns all matching array elements entered in search input
    const html = matchArray.map(function (place){
        return `
        <li>
        <span class="name">${place.city} ${place.admin_name}</span>
        <span class="population">${numberWithCommas(place.population)}</span> 
        </li>
        `
        
    }).join(''); //returns string rather than an array by addingjoin
    suggestions.innerHTML=html;  //assigning html to inner html of suggestions
}



//initializing variable the input and suggestions in order to grab them
const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

//listen for change event 
// searchInput.addEventListener("change",displayMatches);   //change event only fires when you go off that input
searchInput.addEventListener("keyup",displayMatches);



