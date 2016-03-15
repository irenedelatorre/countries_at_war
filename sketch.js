var data;

function preload() {
    data = loadTable("media/Inter-StateWarData_v4.0.csv", "csv", "header");
}

function setup() {
    createCanvas(innerWidth,800);
    
    var dataObject = data.getObject(); //converts all rows in an object
    print(dataObject);
    
    var country = data.getColumn("StateName"); //gets the name
    print(country);
    
    var stateName = [];
    
    //nest by WARS
    var data2 =  [
        stateName = dataObject.getObject("WarName")
        ];
    
    print(data2);
    
    }
    

function draw() {
    background(51)
}