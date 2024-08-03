const info = document.querySelector('.info');
const info2 = document.querySelector('.info2');
const cityes = document.querySelector('#cityes');
const city = document.querySelector('.city');
const curr = document.querySelector('.curr');
const butt = document.querySelector('#butt');
const options = {
  enableHighAccuracy: true, // Try to get the most accurate location
  timeout: 5000, // Maximum time (in milliseconds) to wait for a response
  maximumAge: 0 // Allow no cached location
};
const loc =  navigator.geolocation.getCurrentPosition(successCallback, errorCallback,options);

let api = (location) => {
const fetching = `http://api.weatherapi.com/v1/current.json?key=c638f9629f9742acae0133103240208&q=${location}`;
  fetch(fetching)
  .then((responce) => {
    return responce.json();
  }).then((data) => {
    city.innerHTML = data.location.name;
    info.innerHTML = data.current.temp_c + "c" 
    info2.innerHTML =   data.current.temp_f + "f";
    console.log(data);
    curr.innerHTML = data.current.condition.text;
  });
}

butt.addEventListener('click',(e)=>{
  e.preventDefault();
  const location = cityes.value ;  
  api(location);
});


('geolocation' in navigator)? loc : info.innerHTML = " geolocation not support";
function successCallback (position)
{
const latitude = position.coords.latitude;
const longitude = position.coords.longitude;
console.log(latitude);
console.log(longitude);


fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
.then(responce => responce.json())
.then(data => {
  if (data.error) info.innerHTML = "Error retrieving address";
  else {
    const addr = data.display_name;
    api(addr);  
    console.log(addr);
      
  }
})
.catch(error => info.innerHTML = 'Error fetching address.');
};

function errorCallback () { info.innerHTML = 'Error retrieving location.by error call'};






