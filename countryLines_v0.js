//function draw lines

function countryLines (y){
    
    //background(51);
    
    var myHeightShrunken=650;
    var width = 1150;
    
//    windowResized(width,myHeightShrunken);
    
    //axis TIME
    var myDates = ["1810","1860","1910","1960","2010"];
    
    // add distance lines from text
    var distanceLines = 0,
        x = distanceLines;
    
    // distance text from left margin
    var distanceText = 250;
    
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
        line(x, 0, x, 2710);
        pop();
        
        x = x + distanceLines2; 
    });
    pop();
    
    push();
    translate(0,30);
    var y = 0;

    // draw country array
    countries.forEach(function(country,i){
    


        //vars for zoom effect
        var ff = 0.005;
            mouseYChanged = mouseY-45;

        //zoomFactor = sqrt(sqrt(ff*abs(y-mouseYChanged)))+1;

        //print(mouseY)

        if (mouseY<-100 || mouseY>1000 || mouseX<-200 || mouseX>(width+200)){
            var zoomFactor = 0.01;
        }else{
            var zoomFactor = 1/(exp(ff*(abs(y-(mouseYChanged)))));
        }
           

        // distance for war lines that coincide in time (same country)
        var distanceCountries = 30;
        
        //var controlSpaces = map(zoomFactor, 0, exp(0.025), 0, 1);
        var yAxis = y+3.5;
        var yAxisText = y;

        //control font sizes
        var sizeFontChanged = 1;

        //names
        push ();
        translate(distanceText-5,0)
        fill(128);
        textFont("Lato Light");
        textSize(sizeFontChanged*20);
        noStroke();
        textAlign(RIGHT);
        text(country.name,0,yAxis);
        pop();


        //country axis (lines)
        push();
        translate(distanceText,0)
        strokeWeight(.25)
        stroke(77)
        line (distanceLines,yAxis,(width-distanceText),yAxis);
        pop();

        push();
        translate(distanceText,9);

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
        y += distanceCountries;
        pop();

    });
    pop();
}

function Line(x1, x2, y){
    this.x1 = x1;
    this.x2 = x2;
    this.y = y;
    
    this.intersects = function(x1, x2, y){
        return y == this.y && ((x1 <= this.x2 && x1 >= this.x1) || (x2 <= this.x2 && x2 >= this.x1));
    }
}

function zoomtext (){
    select(this)
    textSize(18);
}