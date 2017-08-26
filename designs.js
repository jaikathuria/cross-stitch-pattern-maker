// Default number of rows and cols
var old_rows = 0, old_cols = 0;
// Select color input
var color = document.getElementById('colorPicker');
// Select size input
var height = document.getElementById('input_height');
var width = document.getElementById('input_width');
// Select Table
var table = document.getElementById('pixel_canvas');
// Select Form
var form = document.getElementById('sizePicker');
// When size is submitted by the user, call makeGrid()
form.onsubmit = function(event){  event.preventDefault(); makeGrid(); };


/*
* @description- Chnages the background color of the element on which this function has been envoked
*/
function updateColor(){
    this.style.backgroundColor = color.value;
}


/*
* @description- Creates given number of cells in the given row
* @param {DOM element} row - Row in which cells are to be created
* @param {number} num - Number of cells that need to be created
*/
function createCells(row,num){
    for(var i = 0; i < num; i++){
        var cell = row.insertCell(-1);
        cell.addEventListener('click',updateColor);
    }
}


/*
* @description- Deletes given number of cells from the given row
* @param {DOM element} row - Row from which cells are to be deleted
* @param {number} num - Number of cells that need to be deleted
*/
function deleteCells(row,num){
    for(var i = 0; i < num; i++){
        row.deleteCell(-1);
    }
}

/*
* @description- Creates/Updates the grid
*/
function makeGrid() {
    // Get the number of required rows, and the difference between required and current number of rows
    var rows = parseInt(height.value), diff_rows = rows - old_rows;
    // Get the number of required cols, and the difference between required and current number of cols
    var cols = parseInt(width.value), diff_cols = cols - old_cols;
    // Iterate `difference between required and current number of rows` time to either create or delete rows
    for (var i = 0; i < Math.abs(diff_rows); i++){
        // If defference is positive-> Create a new row.
        if(diff_rows > 0){
            var row = table.insertRow(-1);
            // create required number of cols in new row.
            createCells(row,cols);
        } 
        // If defference is negetive-> Delete a old row.
        else {
            table.deleteRow(-1);
            // Change the number of old rows.
            old_rows--;
        }
    }
    
    // Check if there is any change in number of cols
    if(diff_cols){
        // Loop over all old rows to make the changes in number of cols
        for (var i = 0; i < old_rows; i++){
            (diff_cols > 0) ? 
            createCells(table.rows[i],Math.abs(diff_cols)) // create cols if diff_cols is +ve
            : 
            deleteCells(table.rows[i],Math.abs(diff_cols)) // delete cols if diff_cols is -ve
        }
    }
    
    old_rows = rows; // Update the value of old_rows.
    old_cols = cols; // Update the value of old_cols.
}
