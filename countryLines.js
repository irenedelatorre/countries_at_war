//function draw lines for shrunken version

function countryLines (y){
    
    var myHeightShrunken=650;
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
        var mouseYChanged = mouseY;

//        zoomFactor = sqrt(sqrt(ff*abs(y-mouseYChanged)))+1;

        if (mouseY<-100 || mouseY>1000 || mouseX<-200 || mouseX>(width+200)){
            var zoomFactor = 0.28;
        }else{
//            var zoomFactor = 1/(sqrt(ff*(abs(y-(mouseYChanged))))+1);
//                var zoomFactor = 1/((sqrt(ff*abs(y-mouseYChanged)))+1);
            var zoomFactor = 1/sqrt(sqrt(ff*abs(y-mouseYChanged)))+1;
        }
        
        var controlSpaces = map(zoomFactor, 0, exp(0.25), 0.05, 0.5);
        var distanceCountries = controlSpaces*myHeightShrunken/105;   
        
        var yAxis = y*3.5;
        var yAxisText = y*5;

        //control font sizes
        var sizeFontChanged = map(zoomFactor, 0, exp(0.25), 0.05, 0.5);

        //names
        push ();
        translate(distanceText-5,0)
        fill(128);
        textFont("Lato Light");
        textSize(sizeFontChanged*16);
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
        translate(distanceText,0);

        var drawnLines = [];    

        for(var i=0; i<country.conflicts.length; i++){
            var conflict = country.conflicts[i];

            var startDecimal = getDecimalDate(conflict.startDate);
            var endDecimal = getDecimalDate(conflict.endDate);

            var x1 = map(startDecimal, 1810, 2010, 0, (width-distanceText));
            var x2 = map(endDecimal, 1810, 2010, 0, (width-distanceText));

            var yNew = yAxis;
            
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

            while(test()){
                yNew += 3;  
               
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