function createTable(countries){
  let table = document.createElement("table");
  table.setAttribute("id", "myTable");

  let tbody = document.createElement("tbody");
  tbody.setAttribute("id", "myTbody");
  table.appendChild(tbody);

  countries.forEach(country => {
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerText = country.name
    tr.appendChild(td);
    tbody.appendChild(tr)
  })
  return table
}

const div = document.createElement("div");
const input = document.createElement("input");
input.setAttribute("id", "myInput");
div.appendChild(input);
const button = document.createElement("button");
button.setAttribute("id", "myButton");
button.innerText = "Search";
div.appendChild(button);
button.addEventListener("click", () => {
  let inputValue = input.value;
  let regions = inputValue.split(" ");
  let links = [];
  regions.forEach(region => links.push("https://restcountries.eu/rest/v2/region/"+region));
  if(inputValue != ""){
    fetchAll(links);
  }else {
    alert("Not found")
  };
});

function render(){
  document.body.appendChild(div);
}

render();

function fetchAll(links) {
  Promise.all(links.map(link => fetch(link) 
   .then(function(response) {
    console.log(response)
    return response.json();
  })
 .then(function(Json) {
    document.body.appendChild(createTable(Json));
  })))
}