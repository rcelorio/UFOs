// Module 11 challenge app
// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

//builds the data table based on the passed set.
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
} //end buildTable

/* Builds dynamic options for the select filters. 
This function take a distinct list of option values and the select id */
function buildOptions(obj,name) {
  //use d3 to select the appropriate select
  var optList = d3.select("#" + name);

  //clear html just in case
  optList.html("");
  // insert the 1st "blank" option
  optList.append("option");
  // loop through the list and create the options
  obj.forEach((val) => {
    let cell = optList.append("option");
        cell.text(val);     
    });

} // end buildOptions

/* get distinct values from a list
thank you: https://codeburst.io/javascript-array-distinct-5edc93501dc4 */
const distinct = (value, index, self) => {
  return self.indexOf(value) === index;
}

// funtion to build filter items with tdistinct values
function buildFilters(tableData) {
  
// initialize local lists for the unique values
  let datetimeUnique = [], cityUnique = [], stateUnique = [], countryUnique = [], shapeUnique = [];
  
  //loop through the tableData keys
  tableData.forEach((dataRow) => {
    //collect the columns we'll use for filters
    datetimeUnique.push(dataRow.datetime);
    cityUnique.push(dataRow.city);
    stateUnique.push(dataRow.state);
    countryUnique.push(dataRow.country);
    shapeUnique.push(dataRow.shape);
  });

  //filter the lists so we only have distinct values
  datetimeUnique = datetimeUnique.filter(distinct);
  cityUnique = cityUnique.filter(distinct);
  stateUnique = stateUnique.filter(distinct);
  countryUnique = countryUnique.filter(distinct);
  shapeUnique = shapeUnique.filter(distinct);

  // build the options
  buildOptions(datetimeUnique,'datetime');
  buildOptions(cityUnique,'city');
  buildOptions(stateUnique,'state');
  buildOptions(countryUnique,'country');
  buildOptions(shapeUnique,'shape');

} //end buildFilters

// this was in pseudoCode.js, I moved to updateFilters as a local variable
//var filters = {datetime:"",city:"",state:"",country:"",shape:""};

// This function will replace your handleClick function
function updateFilters() {
  // Keep track of all filters
  let filters = {datetime:"",city:"",state:"",country:"",shape:""};
  // Save the element, value, and id of the filter that was changed
  Object.keys(filters).forEach((val) => {
      //clear that filter from the filters object
      if (d3.select("#" + val).node().value == "") {
        delete filters[val];
      }
      // If a filter value was entered then add that filterId and value
      else
      {
        filters[val] = d3.select("#" + val).node().value;
      }

  }); 
  // Call function to apply all filters and rebuild the table
  filterTable(filters);
} //end updateFilters

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

// need to reset the fitlers and tables in case user wants to start over. 
function startPosition() {
  buildFilters(tableData); 
  buildTable(tableData);
}

// Attach an event to listen for changes to each filter
d3.selectAll("select").on("mouseout", updateFilters);

// Attach an event to listen for the form button
//removed filter button since the form controls filter on mouse out
d3.select("#reset-btn").on("click", startPosition);

// Build the table and filters when the page loads
startPosition(tableData);
