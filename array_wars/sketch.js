var countries;

var table;
var wars = [];

function preload(){
      table = loadTable("data/Inter-StateWarData_v4.0-3.csv", "csv", "header");
}

function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
    frameRate(30);
    strokeCap(SQUARE);
    
    
    table.getRows().forEach(function(row){
        var warName = row.getString("WarName");
        //print(warName);
        
        var participantName = row.getString("StateName");
        var startYear = int(row.getString("StartYear1"));
        var startMonth = int(row.getString("StartMonth1"));
        var startDay = int(row.getString("StartDay1"));
        var endYear = int(row.getString("EndYear1"));
        var endMonth = int(row.getString("EndMonth1"));
        var endDay = int(row.getString("EndDay1"));
        
        var startDate = new ODate(startYear, startMonth, startDay);
        var endDate = new ODate(endYear, endMonth, endDay);
        var participant = new Participant(participantName, startDate, endDate);
        
        /* search for a war with this name in the array */
        var war = getWar(warName);
        if(war == "false"){
            //create a new war
            var myWar = new War(warName);
            myWar.participants.push(participant);
            wars.push(myWar);
    
        }else{
            //fill the existing war with new data
            war.participants.push(participant);
        }

    });
    

    
    function getWar(name){        
        for(var i=0; i<wars.length; i++){
            var war = wars[i];
            if(war.name == name){
                return war;
            }
            
        }
        return "false";
        
    }
    
}


function draw(){
    background(0);
    noFill();
    
    stroke(255);
    strokeWeight(1);
    
    var y = 0;
    wars.forEach(function(war){
        war.participants.forEach(function(participant){

            
            var startDecimal = getDecimalDate(participant.startDate);
            var endDecimal = getDecimalDate(participant.endDate);
            
            
            var x1 = map(startDecimal, 1823, 2003, 0, width);
            var x2 = map(endDecimal, 1823, 2003, 0, width);
            
            
            line(x1, y, x2, y);
            y+=1;
            
        });
        y+=3;
        stroke(255, 0, 0);
        line(0, y, width, y);
        stroke(255);
        y+=2;
    });
    
  
    noLoop();
}

var ODate = function(AAAA, MM, DD){
    this.year = AAAA;
    this.month = MM;
    this.day = DD;
    
}

function getDecimalDate(date){
    return date.year + (date.month-1)/12 + (date.day-1)/365;  
}

var War = function(name){
    this.name = name;
    this.participants = [];
    
}

var Participant = function(country, startDate, endDate){
    this.country = country;
    this.startDate = startDate;
    this.endDate = endDate;
}




function windowResized(){
    resizeCanvas(windowWidth, windowHeight);

}
