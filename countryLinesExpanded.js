//function draw lines for expanded version

function countryLinesExpanded (){
    var myHeightExpanded=2700;
    var width = 1150;
    
    //axis TIME
    var myDates = ["1810","1860","1910","1960","2010"];
    
    // add distance lines from text
    var distanceLines = 0,
        x = distanceLines;
    
    // distance text from left margin
    var distanceText = 300;
    
    var fixInWindow = 0.87;
    push()
    translate(distanceText,0)
    
    // TIME AXIS
    myDates.forEach(function(myDates){
        
        var distanceLines2 = (width-distanceText)/4;
        textSize(18);
        fill(128);
        noStroke();
        textAlign(CENTER);
        textFont("Lato Light");
        text(myDates,x,10);
        
        push();
        translate(0,20);
        strokeWeight(.5)
        stroke(89);
        line(x, 0, x, (myHeightExpanded+20));
        pop();
        
        x = x + distanceLines2; 
    });
    pop();
    
    push();
    translate(0,40);
    var y = 0;

    // draw country array
    countries.forEach(function(country,i){
    
    // distance for war lines that coincide in time (same country)
        distanceCountries = myHeightExpanded/105;
        var x1p = -1;
        var x2p = -1;
        var x1pB = -1;
        var x2pB = -1;
        
        var yAxis = y+3.5;
        var yAxisText = y+5.5;
        
        //names
        push ();
        translate(distanceText-5,0)
        fill(128);
        textFont("Lato Light");
        textSize(18);
        noStroke();
        textAlign(RIGHT);
        text(country.name,0,yAxis);
        pop();
        
        
        //country axis (lines)
        push();
        translate(distanceText,0)
        strokeWeight(.25)
        stroke(77)
        line (distanceLines,(yAxis-5),(width-distanceText),(yAxis-5));
        pop()
        
        push ()
        translate(distanceText,0)
        
        var drawnLines = [];    

        for(var i=0; i<country.conflicts.length; i++){
            var conflict = country.conflicts[i];

            var startDecimal = getDecimalDate(conflict.startDate);
            var endDecimal = getDecimalDate(conflict.endDate);

            var x1 = map(startDecimal, 1810, 2010, 0, (width-distanceText));
            var x2 = map(endDecimal, 1810, 2010, 0, (width-distanceText));



            var yNew = y;

            while(test()){
                yNew += 3;  
               
            }



            function test(){
                var result = false;
                drawnLines.forEach(function(line){
                    if(line.intersects(x1, x2, yNew)){
                        result = true;
                        return;
                    } 
                });
                return result;

            }
            //test where I can fit this new line
            var newLine = new Line(x1, x2, yNew);
            drawnLines.push(newLine);
            //print(drawnLines.length);
            line(x1, yNew, x2, yNew);



        }   
        
        y+=distanceCountries;
        pop();
        
    })
    pop();
}

function zoomtext (){
    select(this)
    textSize(18);
}