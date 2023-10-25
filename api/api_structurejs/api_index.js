// api: bored_api.appbrewery.com/endpoint?query=value&query=value2        
                          // here it is known as query parameters

// // api: bored_api.appbrewery.com/endpoint/{path-parameter}      
                          // here it is known as path parameter
// example https://bored-api.appbrewery.com/activity/5914292

// json stands for JavaScript Object Notation 
// js object ---> json
const jsonData = JSON.stringify(data);

// json ---> js object
const data = JSON.parsel(jsonData); 