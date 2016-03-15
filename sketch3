var participants;
var table;
var wars = []; // this is an array
var War = function (name){
    this.name = name;
    this.participants = [];
}

var Participant = function (participant,start,end){
    this.participant = participant;
    this.startDate = start;
    this.endDate = end;
}

function preload() {
    table = loadTable("media/Inter-StateWarData_v4.0.csv", "csv", "header");
}

function setup() {
    createCanvas(innerWidth,800);
    frameRate(30);
    
    table.getRows().forEach(function(row){
        var warName = row.getString("WarName");
        
        var participantName = row.getString ("StateName");
        var startDay = int(row.getString("StartDay1"));
        var startMonth = int(row.getString("StartMonth1"));
        var startYear = int(row.getString("StartYear1"));
        var startDate = startYear + ((startMonth - 1) / 12) + ((startDay - 1) / 365);
        var endDay = int(row.getString("EndDay1"));
        var endMonth = int(row.getString("EndMonth1"));
        var endYear = int(row.getString("EndYear1"));
        var endDate = int(endYear + ((endMonth - 1) / 12) + ((endDay - 1) / 365));
        var participant = new Participant+(participantName, startDate, startDay, startMonth, startYear, endDate, endDay, endMonth, endYear)
        
        // search for a war with this name in the array
        var war = getWar(warName);
        if (war=="false"){
            //create a new war
            var myWar = new War (warName);
            myWar.participants.push(participant);
            wars.push(myWar);
        }else{
            //fill the existing war with new data
            war.participants.push (participant);
        }
    });
    
    
    
    function getWar(name){
        
        for (var i=0; i<wars.length;i++){
            var war = wars[i];
            print(war);
            if (war.name == name){
                print("here");
                return war;
            }
        }
        return "false";
    }
    print(wars);
}



function draw() {
    background(0);
    noFill();
    stroke(255);
    strokeWeight(0.5);
    
//    wars.forEach(function(war){
//                 war.participant.forEach(function(participant){
//                     var startDecimal = getDecimalDate (participant.startDate);
//                     var endDecimal = getDecimalDate(participant.endDate);
//                     
//                     var y = 0;
//                     var x1 = map(startDecimal, 1823,2003,0,width);
//                     var x2 = map(endDecimal, 1823,2003,0,width);
//                     
//                     line (x1,y,x2,y);
//                     y+=2
//                     
//                 })
//                 })
}

var oDate = function (AAAA,MM,DD) {
    this.year = AAAA;
    this.month = MM;
    this.day = DD;
}
function getDecimalDate (date) {
    return date.year + (date.month-1)/12 + (date.day-1)/365;
}