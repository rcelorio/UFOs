// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// funtion to build filter items with tdistinct values
function buildFilters(tableData) {
  
// initialize local lists for the unique values
  let datetimeUnique = [], cityUnique = [], stateUnique = [], countryUnique = [], shapeUnique = [];

  const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
  }
  
  //loop through the tableData keys
  tableData.forEach((dataRow) => {
    datetimeUnique.push(dataRow.datetime);
    cityUnique.push(dataRow.city);
    stateUnique.push(dataRow.state);
    countryUnique.push(dataRow.country);
    shapeUnique.push(dataRow.shape);
  });
  datetimeUnique = datetimeUnique.filter(distinct);
  cityUnique = cityUnique.filter(distinct);
  stateUnique = stateUnique.filter(distinct);
  countryUnique = countryUnique.filter(distinct);
  shapeUnique = shapeUnique.filter(distinct);

//now build the select elements form these lists.

}

//var filters = {datetime:"",city:"",state:"",country:"",shape:""};

// This function will replace your handleClick function
function updateFilters() {
  // Keep track of all filters
  let filters = {datetime:"",city:"",state:"",country:"",shape:""};
  // Save the element, value, and id of the filter that was changed
  Object.keys(filters).forEach((val) => {
    // If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object
    if (d3.select("#" + val).property("value") == "") {
      delete filters[val];
    } 
    else 
    {
      filters[val] = d3.select("#" + val).property("value");
    }
  });
  // Call function to apply all filters and rebuild the table
  filterTable(filters);
}

function filterTable(filters) {

  // Set the filteredData to the tableData
  let filteredData = tableData;

  // Loop through all of the filters and keep any data that
  // matches the filter values
  Object.keys(filters).forEach((val) =>
    filteredData = filteredData.filter(row => row[val] === filters[val])
  );

  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("input").on("blur", updateFilters);
// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", updateFilters);
// Build the table when the page loads
buildTable(tableData);
