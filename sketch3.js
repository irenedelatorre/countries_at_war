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

// distance text from left margin
var distanceText = 300;

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



    //go through every conflict of every country and see if mouseX, mouseY is over the corresponding line
    //if it is, do something

    (function () {
        for (var i = 0; i < countries.length; i++) {
            var c = countries[i];
            //            print(c.conflicts);

            for (var j = 0; j < countries[i].conflicts.length; j++) {


                var con = c.conflicts[j];

                var isOverLine = false;

                stroke("aqua");
                line(con.x1 + distanceText, con.y + distanceAxis, con.x2 + distanceText, con.y + distanceAxis);



                mouseYChanged = mouseY - 20;
                ellipse(mouseX, mouseYChanged, 5, 5)
                    //if it's inside
                if ((con.x1 + distanceText) <= mouseX && mouseX <= (con.x2 + distanceText) && (con.y + distanceAxis - 0.00025) <= mouseYChanged && mouseYChanged <= (con.y + distanceText + 0.00025)) {
                    isOverLine = true;
                } else {
                    isOverLine = false;
                }

                if (isOverLine == true) {
                    textFont(latoLight);
                    noStroke();
                    fill("aqua");

                    var el = select("#war");
                    el.html(con.warName);
                    // textSize(30)
                    //text(,700,0);

                    //tooltip1

                    dateStart = con.startDate.month + "-" + con.startDate.day + "-" + con.startDate.year;
                    dateEnd = con.endDate.month + "-" + con.endDate.day + "-" + con.endDate.year;

                    dateWar = dateStart + ", " + dateEnd;

                    textSize(14);
                    text(dateWar, 700, 25);



                    //                    if (con.warName = wars[i].name){
                    //                        //go through the wars array
                    //                        //for each war go through the participants array
                    //                        //display all the participants, or put them in a structure that will be displayed
                    ////                        print(wars[i].participants)
                    ////                        text(wars[i].participants[i].participant,700,0)
                    //                    }
                    //
                    //                    
                    //                } else {
                    //                    text(" ")
                    ////                    print("not touching any line");
                    //                }



                    //draw tooptip on mouseX, mouseY
                    //get information either from the country or the conflict
                    //if it's inside, return
                }
            }

        }

    })();

    pop();



}

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