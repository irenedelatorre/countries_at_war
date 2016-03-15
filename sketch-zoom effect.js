// Learning Processing
// Daniel Shiffman
// http://www.learningprocessing.com

// Example 1-1: stroke and fill

var table;

function preload() {
    table = loadTable('Inter-StateWarData_v4.0.csv','csv','header') ;
} ;


var wars = []; 

function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    frameRate(30);
    
    table.getRows().forEach(function(rows){
        var warName = rows.getString("WarName");
        var participantName = rows.getString("StateName");
        var startyear = int(rows.getString("StartYear1"));
        var startmonth = int(rows.getString("StartMonth1"));
        var startday = int(rows.getString("StartDay1"));
        var endyear = int(rows.getString("EndYear1"));
        var endmonth = int(rows.getString("EndMonth1"));
        var endday = int(rows.getString("EndDay1"));
        var casualty = int(rows.getString("BatDeath"));
        var start = getTime(new Time(startyear,startmonth,startday));
        var end = getTime(new Time(endyear,endmonth,endday));
        var participant = new Participant(participantName,start,end,casualty);
        
        function getWar(name){
            for(var i=0; i<wars.length;i++){
                var war = wars[i];
                if(war.name == name){
                    return war;
                }
            }
            return "false";
        };
    
        var war = getWar(warName);
        if (war == "false"){
            var mywar = new War(warName);
            mywar.participants.push(participant);
            wars.push(mywar);
        }else{
            war.participants.push(participant);
        }
        
         wars.forEach(function(w){
             w.computeCasualties();
             w.end();
             w.start();
         });
    });
    print(wars); 
};

var War = function(name){
    this.name = name;
    this.participants = [];
    this.totalCasualties = 0;
    this.warstart = 0;
    this.warend = 0;
    
    this.computeCasualties = function(){
        var sum = 0;
        for(var i=0; i<this.participants.length; i++){
            sum += this.participants[i].casualties;
        }
        this.totalCasualties = sum;
    }
    
    this.start =function(){
        var sdw = 3000;
        for(var i=0; i<this.participants.length; i++){
            sdw = Math.min(this.participants[i].start,sdw)
        }
         this.warstart = sdw;
    }
    
    this.end = function(){
        var edw = 0;
        for(var i=0; i<this.participants.length;i++){
            edw = Math.max(this.participants[i].end,edw);
        }
        this.warend = edw;
    }
}

var Participant = function(country,start,end,casualties){
    this.country = country;
    this.start = start;
    this.end = end; 
    this.casualties = casualties;
}

var Time = function(year, month, day){
    this.year = year;
    this.month = month;
    this.day = day;
}

function getTime(date){
    return date.year+(date.month-1)/12+(date.day-1)/365;
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);

}

function draw() {
    background(150);
    noFill();
    
    stroke(255);
    strokeWeight(1);
    
    translate(40,0);
    
    wars.forEach(function(war){
//        var x1 = map(war.warend, 1823, 2003, 0, width);
//        var x2 = map(war.warstart, 1823, 2003, 0, width);
//        var y2 = 0;
//        var y1 = map(war.totalCasualties,0,16634907,0,height)
        var x1 = map(war.warend, 1823, 2003, 0, width-100);
        var x2 = map(war.warstart, 1823, 2003, 0, width-100);
        //push();
        //translate(mouseX, 0);
        
        
        var baseline = 400;
        var maxheight = 100;
        var y2 = baseline;
        var y1 = map(log(war.totalCasualties),0,log(16634907),baseline,baseline-maxheight);
        
        var ff = 0.01;
        /*var scaleFactor1 = 1/(ff*sq(x1-mouseX)+1);
        var scaleFactor2 = 1/(ff*sq(x2-mouseX)+1);*/

        var scaleFactor1 = 1/(exp(ff*((abs(x1-mouseX)-10))));
        var scaleFactor2 = 1/(exp(ff*((abs(x2-mouseX)-10))));
        
        //x1 = map(x1-mouseX, 0, width-100,  )
        
        stroke(255, 0, 0);
        line(x1+(x1-mouseX)*scaleFactor1, y1, x2+(x2-mouseX)*scaleFactor2, y2);
        
        //pop();
    });
    
    wars.forEach(function(war){
        
    })
};