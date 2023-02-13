/* Global Variables */
const date = document.getElementById('date');
let nowDate = new Date().getMonth()+1 + '/' + new Date().getDate() + '/' + new Date().getFullYear();


const temp = document.getElementById('temp');
const content = document.getElementById('content');

//Inputs
const zipCodeIn = document.getElementById('zip');
const content_inp = document.getElementById('content_in');
const genButton = document.getElementById('generate');

//API's
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = '&appid=dd7b86cd2b1f8e8f2713aee0560c49b8&units=metric';


//Get data from user and API's

genButton.addEventListener("click", async () => {
    const zipCode = zipCodeIn.value;
    const U_content = content_inp.value;
    if(zipCode === "" || U_content === "")
        alert("Empty Input");
    else if(zipCode > 99950 || zipCode < 00001)
        alert("Incorrect Zip-code");  
                

    else{
        //Create a get request to OpenWeathermap to get data
      const data = await getData(baseURL, zipCode, apiKey).then(
            async (data) => {
                const Post_Data = await postData("/postData", {temp: data.main.temp + " °C", date: nowDate, text: U_content

                }).then(async () => {
                    //Create a post request to add data
                    const Get_Data = await getProjectData("/getData", "");
                    //Throw data to updateUI var  
                    updateUI(Get_Data.temp, Get_Data.date, Get_Data.text);
                    
                });
            }
        );
    }
});


/* " Post " Add the API data */
const postData = async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
           "Content-Type": "application/json" 
          },
      body: JSON.stringify(data),
    });
    try {
      const newPost = await response.json();
      return newPost;
    } catch (e) {
      console.log("Error!" + e);
    }
  };
  

  
  /* " Get " Data from api*/
  const getData = async (baseURL, zipCode, apiKey) => {
    const URL = baseURL + zipCode + apiKey;
    const response = await fetch(URL);
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      console.log("Error!" + e);
    }
  };
  

  const getProjectData = async (baseURL) => {
    const response = await fetch(baseURL);
    try {
      const data = await response.json();
      return data;
    } catch (e) {
      console.log("Error!" + e);
    }
  };
  

  /* Insert data to nodes */
  const updateUI = (tempU, dateU, U_content) => {
    try {
      temp.innerHTML = "🌡️ Today's temp: " + tempU;
      date.innerHTML = "🗓️ Date: " + dateU;
      content.innerHTML = "🗒️ Note: " + content_inp.value;
    } catch (e) {
      console.log("Error!" + e);
    }
  };

