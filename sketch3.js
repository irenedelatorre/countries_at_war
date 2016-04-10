var table;

var participants;
var conflicts;

var wars = []; // this is an array
var War = function (name) {
    this.name = name;
    this.participants = [];
};

var countries = [];
var Country = function (name) {
    this.name = name;
    this.conflicts = [];
};

var Participant = function (participant, startDate, endDate, sideWar, casualties) {
    this.participant = participant;
    this.startDate = startDate;
    this.endDate = endDate;
    this.sideWar = sideWar;
    this.casualties = casualties;
};

var Conflict = function (warName, startDate, endDate, sideWar, casualties) {
    this.warName = warName;
    this.startDate = startDate;
    this.endDate = endDate;
    this.sideWar = sideWar;
    this.casualties = casualties;
};

var list = [];

var myHeightShrunken = 650;

// distance text from left margin
var distanceText = 310;

//distance from the axis
var distanceAxis = 30;

var linesDrawFunction = null;

function preload() {
    table = loadTable("media/Inter-StateWarData_v4.0.csv", "csv", "header");

    //load fonts
    latoLight = loadFont('media/Lato-Light.ttf');
    latoRegular = loadFont('media/Lato-Regular.ttf');
    latoBold = loadFont('media/Lato-Bold.ttf');
}

function setup() {
    var myHeight = 2800;
    var width = 1170;

    var myCanvas = createCanvas(width, myHeight);
    myCanvas.parent('myContainer');



    linesDrawFunction = countryLines;

    frameRate(30);
    strokeCap(SQUARE);
    table.getRows().forEach(function (row) {
        var warName = row.getString("WarName");
        //print(warName);

        var participantName = row.getString("StateName")
            , sideWar = int(row.getString("Side"))
            , startYear = int(row.getString("StartYear1"))
            , startMonth = int(row.getString("StartMonth1"))
            , startDay = int(row.getString("StartDay1"))
            , endYear = int(row.getString("EndYear1"))
            , endMonth = int(row.getString("EndMonth1"))
            , endDay = int(row.getString("EndDay1"))
            , casualties = int(row.getString("BatDeath"))
            , startDate = new ODate(startYear, startMonth, startDay)
            , endDate = new ODate(endYear, endMonth, endDay);

        //MY TWO MAIN OBJECTS (participant for drawing wars, conflicts for drawing countries)
        var participant = new Participant(participantName, startDate, endDate, sideWar, casualties)
            , conflict = new Conflict(warName, startDate, endDate, sideWar, casualties);

        // THIS IS MY WAR ARRAY
        // search for a war with this name in the array
        var war = getWar(warName);
        if (war == "false") {
            //create a new war
            var myWar = new War(warName);
            myWar.participants.push(participant);
            wars.push(myWar);
        } else {
            //fill the existing war with new data
            war.participants.push(participant);
        }

        //THIS IS MY COUNTRY ARRAY
        var country = getCountry(participantName);

        if (country == "false") {
            //create new country
            var myCountry = new Country(participantName);
            myCountry.conflicts.push(conflict);
            countries.push(myCountry);
        } else {
            //fill the existing war with new data
            country.conflicts.push(conflict);
        }
    });


    function getWar(name) {

        for (var i = 0; i < wars.length; i++) {
            var war = wars[i];
            if (war.name == name) {
                return war;
            }
        }
        return "false";
    }

    function getCountry(name) {

        for (var i = 0; i < countries.length; i++) {
            var country = countries[i];
            if (country.name == name) {
                return country;
            }
        }
        return "false";
    }
    shrunken();
    expanded();


}



function draw() {



    background(51);
    noFill();
    stroke(255);
    strokeWeight(1);
    push();
    translate(0, 20);
    linesDrawFunction();


    var side1 = "#6EC233";
    var side2 = "#E8CE21";

    var side1Legend = "—";
    var side1LegendText = "  Winners"
    var side2Legend = "—"
    var side2LegendText = " Defeated";

    var legend1Dash = select("#legend1dash");
    var legend1 = select("#legend1");
    var legend2Dash = select("#legend2dash");
    var legend2 = select("#legend2");

    legend1Dash.style("color", side1)
    legend2Dash.style("color", side2)
        //    legend2.style("margin-right","400px")
    legend1Dash.html(side1Legend)
    legend1.html(side1LegendText);
    legend2Dash.html(side2Legend)
    legend2.html(side2LegendText);




    //go through every conflict of every country and see if mouseX, mouseY is over the corresponding line
    //if it is, do something

    (function () {
        for (var i = 0; i < countries.length; i++) {
            var c = countries[i];

            //            print(c.conflicts);

            for (var j = 0; j < countries[i].conflicts.length; j++) {

                var con = c.conflicts[j];

                var isOverLine = false;
                //if it's inside


                if (con.x2 - con.x1 <= 1) {

                    if ((con.x1 + distanceText - 1) <= mouseX && mouseX <= (con.x2 + distanceText + 1) && (con.y + distanceAxis - 5) <= mouseYChanged && mouseYChanged <= (con.y + distanceAxis + 5)) {

                        isOverLine = true;

                    } else {

                        isOverLine = false;


                    }

                } else {

                    if ((con.x1 + distanceText) <= mouseX && mouseX <= (con.x2 + distanceText) && (con.y + distanceAxis - 3.5) <= mouseYChanged && mouseYChanged <= (con.y + distanceAxis + 3.5)) {
                        isOverLine = true;

                    } else {
                        isOverLine = false;


                    }
                }

                var list = [];



                if (isOverLine == true) {

                    var partsElSide1 = select("#winners");
                    partsElSide1.html("");

                    var partsElSide2 = select("#defeated");
                    partsElSide2.html("");

                    textFont(latoLight);
                    noStroke();
                    var el = select("#war");
                    el.html(con.warName);

                    var dateStart = con.startDate.month + "-" + con.startDate.day + "-" + con.startDate.year;
                    var dateEnd = con.endDate.month + "-" + con.endDate.day + "-" + con.endDate.year;

                    var dateWar = dateStart + ", " + dateEnd;

                    var el2 = select("#dates");
                    el2.html(dateWar);

                    var el4 = select("#country");
                    if (con.sideWar == 2) {
                        colorText = color(side2)

                    } else {
                        colorText = color(side1)

                    };
                    el4.html(c.name)
                    el4.style("color", colorText)

                    var oneParticipant;

                    //go through the wars array
                    for (w = 0; w < wars.length; w++) { //95 countries

                        if (con.warName == wars[w].name) {

                            var thisWar = wars[w].participants

                            //for each war go through the participants array
                            for (p = 0; p < thisWar.length; p++) {

                                //display all the participants, or put them in a structure that will be displayed
                                oneParticipant = thisWar[p].participant;
                                side = thisWar[p].sideWar;


                                if (oneParticipant == "false") {
                                    list.push(oneParticipant);
                                } else {
                                    list.push(oneParticipant);
                                }

                                var textColor = side1;
                                var elSide1 = createSpan(oneParticipant + ", ");
                                var elSide2 = createSpan(oneParticipant + ", ");
                                
                        

                                switch (side) {
                                case 1:
                                    elSide1.parent(partsElSide1)
                                    textColor = side1;
                                    break;
                                case 2:
                                    elSide2.parent(partsElSide2)
                                    textColor = side2;
                                }
                                
                                
                                

                                elSide1.style("color", textColor);

                                elSide2.style("color", textColor);


                            }

                            list.forEach(function (listName, i) {
                                for (var j = 0; j < countries.length; j++) {
                                    var eachCountry = countries[j].name;
                                    var eachConflict = countries[j].conflicts;
                                    if (list[i] == eachCountry) {
                                        //                                        print(eachCountry)
                                        for (g = 0; g < eachConflict.length; g++) {
                                            if (con.warName == eachConflict[g].warName) {
                                                //                                                print(eachConflict[g].warName)
                                                if (eachConflict[g].sideWar == 2) {

                                                    stroke(side2)

                                                } else if (eachConflict[g].sideWar == 1) {

                                                    stroke(side1);

                                                }


                                                strokeWeight(1.5);
                                                line(eachConflict[g].x1 + distanceText, eachConflict[g].y + distanceAxis, eachConflict[g].x2 + distanceText, eachConflict[g].y + distanceAxis);

                                            }
                                        }


                                    }
                                }

                            })


                        }

                    }

                }
                if (isOverLine == true) {
                    fillCircle = "#000";
                } else {
                    fillCircle = "#fff";
                }
                mouseYChanged = mouseY - 20;
                fill(fillCircle)
                stroke(0)
                strokeWeight(1);
                mouseX = min(mouseX, width);
                mouseX = max(mouseX, distanceText);
                mouseYChanged = max(mouseYChanged, 30)
                ellipse(mouseX, mouseYChanged, 5, 5);

            }

        }
        tooltip();


    })();

    pop();



}

function tooltip() {
    var strokeColor = color("#808080")
    var tooltip = select("#tooltipbox");

    mouseX = min(mouseX, width);
    mouseX = max(mouseX, distanceText);
    //    mouseY = min(mouseY, );
    mouseY = max(mouseY, 170);

    tooltip.style("border-color", strokeColor)
    tooltip.size([340], [AUTO])
    tooltip.position(mouseX + 400, mouseY + 300)

};



function shrunken() {
    buttonShrunk = createButton('Shrunk Version');
    buttonShrunk.addClass("btn btn-default")
    buttonShrunk.mousePressed(function () {
        linesDrawFunction = countryLines;
    });
    buttonShrunk.parent("shrunk");
}

function expanded() {
    buttonExpanded = createButton('Expanded Version');
    buttonExpanded.addClass("btn btn-default");
    buttonExpanded.mousePressed(function () {
        linesDrawFunction = countryLinesExpanded;
    });
    buttonExpanded.parent("expanded");
    print("expanded")
}

// functions to create the correct dates
var ODate = function (AAAA, MM, DD) {
    this.year = AAAA;
    this.month = MM;
    this.day = DD;

}

function getDecimalDate(date) {
    return date.year + (date.month - 1) / 12 + (date.day - 1) / 365;
}