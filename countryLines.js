//function draw lines for shrunken version
var myellipse;

function countryLines(y) {
    
    var width = 1150;
    var mouseXChanged1 = mouseX;

    //axis TIME
    var myDates = ["1810", "1860", "1910", "1960", "2010"];

    // add distance lines from text
    var distanceLines = 0
        , x = distanceLines;

    var fixInWindow = 0.87;
    push();
    translate(distanceText, 0);
    
    /*------------time axis-------------*/

    myDates.forEach(function (myDates) {
        var distanceLines2 = (width - distanceText) / 4;

        textSize(16);
        fill(128);
        noStroke();
        textAlign(CENTER);
        textFont(latoLight);
        text(myDates, x, 10);

        push();
        translate(0, 20);
        strokeWeight(.5)
        stroke(89);
        line(x, 0, x, 2710);
        pop();
        x = x + distanceLines2;
    });
    pop();

    
    /*------------guide line-------------*/
    (function () {

        fill(25)
        noStroke();
        mouseXChanged1 = min(mouseXChanged1, width);
        mouseXChanged1 = max(mouseXChanged1, distanceText);
        rect(mouseXChanged1 - 5, 20, 10, 5);

        strokeWeight(1)
        stroke(25)

        line(mouseXChanged1, 20, mouseXChanged1, 2710);
    })();

    push();
    translate(0, distanceAxis);
    var y = 0;

    /*------------draw country array-------------*/
    countries.forEach(function (country, i) {

        //variables for zoom effect
        var ff = 0.005;
        var mouseYChanged = mouseY - 55;

        if (mouseY < (-100) || mouseY > myHeightShrunken || mouseXChanged1 < (-200) || mouseXChanged1 > (width + 200)) {
            var zoomFactor = 0.28;
            var yAxis = y * 3.5;
            var sizeFontChanged = 0.1;
            var controlSpaces = 0.2;
        } else {
            if (mouseYChanged < 1) mouseYChanged = 1;
            var zoomFactor = (1 / (sqrt(sqrt(ff * abs(y - mouseYChanged)))) + 1);

            var spaceAxis = map(zoomFactor, 0, exp(0.5), 0, 2);
            var yAxis = y + spaceAxis;
            var sizeFontChanged = map(zoomFactor, exp(0.5), exp(2), 0.05, 3);
            sizeFontChanged = min(sizeFontChanged, 3);
            //            sizeFontChanged = max(sizeFontChanged, 0.05);
            var controlSpaces = map(zoomFactor, exp(0.5), exp(2), 0.1, 10);

        };

        var distanceCountries = controlSpaces * myHeightShrunken / 105;

        //names
        push();
        translate(distanceText - 5, 5)
        fill(128);
        textFont(latoLight);
        textSize(sizeFontChanged * 16);
        noStroke();
        textAlign(RIGHT);
        text(country.name, 0, yAxis);
        pop();

        //country axis (lines)
        push();
        translate(distanceText, 0)
        strokeWeight(.25)
        stroke(77)
        line(distanceLines, yAxis, (width - distanceText), yAxis);
        pop();

        push();
        translate(distanceText, 0);

        // country lines
        // add more space between wars happening at the same time for the same country
        var drawnLines = [];

        for (var i = 0; i < country.conflicts.length; i++) {
            var conflict = country.conflicts[i];
            var startDecimal = getDecimalDate(conflict.startDate);
            var endDecimal = getDecimalDate(conflict.endDate);
            var x1 = map(startDecimal, 1810, 2010, 0, (width - distanceText));
            var x2 = map(endDecimal, 1810, 2010, 0, (width - distanceText));
            var yNew = yAxis;


            //            var controlOpacity = map(conflict.casualties, 1000, 500000, 0.5, 1);
            var controlOpacity = 1;
            strokeLines = "#fff";

            function test() {
                var result = false;
                drawnLines.forEach(function (line) {
                    if (line.intersects(x1, x2, yNew)) {
                        result = true;
                        return;
                    }
                });
                return result;

            };

            while (test()) {
                if (mouseY < (-100) || mouseY > myHeightShrunken || mouseXChanged1 < (-200) || mouseXChanged1 > (width + 200)) {
                    yNew += 1.5;
                } else {
                    yNew += 3;
                };
            };

            //test where I can fit this new line
            var newLine = new Line(x1, x2, yNew);
            drawnLines.push(newLine);
            conflict.x1 = x1;
            conflict.y = yNew;
            conflict.x2 = x2;

            strokeWeight(1);
            stroke(strokeLines);
            line(x1, yNew, x2, yNew);
        }
        y += distanceCountries;
        pop();

    });


    pop();
}

function Line(x1, x2, y) {
    this.x1 = x1;
    this.x2 = x2;
    this.y = y;

    this.intersects = function (x1, x2, y) {
        return y == this.y && ((x1 <= this.x2 && x1 >= this.x1) || (x2 <= this.x2 && x2 >= this.x1));
    }
}