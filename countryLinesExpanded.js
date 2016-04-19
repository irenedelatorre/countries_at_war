//function draw lines for expanded version
function countryLinesExpanded() {
    
    var myHeightExpanded = 2700;
    var width = 1150;
    var mouseXChanged2 = mouseX;

    //axis TIME
    var myDates = ["1810", "1860", "1910", "1960", "2010"];

    // add distance lines from text
    var distanceLines = 0
        , x = distanceLines;

    var fixInWindow = 0.87;
    push()
    translate(distanceText, 0)

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
        line(x, 0, x, (myHeightExpanded + 20));
        pop();

        x = x + distanceLines2;
    });
    pop();

    /*------------guide line-------------*/
    (function () {
        fill(25)
        noStroke();
        mouseXChanged2 = min(mouseXChanged2, width);
        mouseXChanged2 = max(mouseXChanged2, 310);
        rect(mouseXChanged2 - 5, 20, 10, 5);

        strokeWeight(1)
        stroke(25)
        line(mouseXChanged2, 20, mouseXChanged2, myHeightExpanded + 40);
    })();


    push();
    translate(0, distanceAxis);
    var y = 0;

    
    /*------------draw country array-------------*/
    countries.forEach(function (country, i) {

        // distance for war lines that coincide in time (same country)
        distanceCountries = myHeightExpanded / 105;
        var x1p = -1;
        var x2p = -1;
        var x1pB = -1;
        var x2pB = -1;
        var yAxis = y + 3.5;
        var yAxisText = y + 5.5;

        //names
        push();
        translate(distanceText - 5, 0)
        fill(128);
        textFont(latoLight);
        textSize(18);
        noStroke();
        textAlign(RIGHT);
        text(country.name, 0, yAxis);
        pop();


        //country axis (lines)
        push();
        translate(distanceText, 2)
        strokeWeight(.25)
        stroke(77)
        line(distanceLines, (yAxis - 5), (width - distanceText), (yAxis - 5));
        pop()

        push()
        translate(distanceText, 0)

        var drawnLines = [];

        for (var i = 0; i < country.conflicts.length; i++) {
            var conflict = country.conflicts[i];
            var startDecimal = getDecimalDate(conflict.startDate);
            var endDecimal = getDecimalDate(conflict.endDate);
            var x1 = map(startDecimal, 1810, 2010, 0, (width - distanceText));
            var x2 = map(endDecimal, 1810, 2010, 0, (width - distanceText));
            var yNew = y;

            while (test()) {
                yNew += 3;

            }

            function test() {
                var result = false;
                drawnLines.forEach(function (line) {
                    if (line.intersects(x1, x2, yNew)) {
                        result = true;
                        return;
                    }
                });
                return result;

            }

            //test where I can fit this new line
            var newLine = new Line(x1, x2, yNew);
            drawnLines.push(newLine);
            conflict.x1 = x1;
            conflict.y = yNew;
            conflict.x2 = x2;

            strokeWeight(1);
            stroke(255);
            line(x1, yNew, x2, yNew);
        }

        y += distanceCountries;
        pop();

    })
    pop();
}