var keyCodes = {
    65: "a",
    66: "b",
    67: "c",
    68: "d",
    69: "e",
    70: "f",
    71: "g",
    72: "h",
    73: "i",
    74: "j",
    75: "k",
    76: "l",
    77: "m",
    78: "n",
    79: "o",
    80: "p",
    81: "q",
    82: "r",
    83: "s",
    84: "t",
    85: "u",
    86: "v",
    87: "w",
    88: "x",
    89: "y",
    90: "z",
}

var plugboard = {
    "a": "b",
    "b": "a",
    "c": "c",
    "d": "d",
    "e": "e",
    "f": "f",
    "g": "g",
    "h": "h",
    "i": "i",
    "j": "j",
    "k": "k",
    "l": "l",
    "m": "m",
    "n": "n",
    "o": "z",
    "p": "p",
    "q": "q",
    "r": "r",
    "s": "s",
    "t": "t",
    "u": "u",
    "v": "v",
    "w": "w",
    "x": "x",
    "y": "y",
    "z": "o",
}

/*reflector UKW german railway rocket 1941*/
var ukw = {
    "a": "q",
    "b": "y",
    "c": "h",
    "d": "o",
    "e": "g",
    "f": "n",
    "g": "e",
    "h": "c",
    "i": "v",
    "j": "p",
    "k": "u",
    "l": "z",
    "m": "t",
    "n": "f",
    "o": "d",
    "p": "j",
    "q": "a",
    "r": "x",
    "s": "w",
    "t": "m",
    "u": "k",
    "v": "i",
    "w": "s",
    "x": "r",
    "y": "b",
    "z": "l",
}

// rotor I german railway rocket 1941
var rotor1 = ["J", "G", "D", "Q", "O", "X", "U", "S", "C", "A", "M", "I", "F", "R", "V", "T", "P", "N", "E", "W", "K", "B", "L", "Z", "Y", "H"];

//rotor II german railway rocket 1941
var rotor2 = ["N", "T", "Z", "P", "S", "F", "B", "O", "K", "M", "W", "R", "C", "J", "D", "I", "V", "L", "A", "E", "Y", "U", "X", "H", "G", "Q"];

var rotor3 = ["J", "V", "I", "U", "B", "H", "T", "C", "D", "Y", "A", "K", "E", "Q", "Z", "P", "O", "S", "G", "X", "N", "R", "M", "W", "F", "L"];

var letterToNumber = {
    "a": 0,
    "b": 1,
    "c": 2,
    "d": 3,
    "e": 4,
    "f": 5,
    "g": 6,
    "h": 7,
    "i": 8,
    "j": 9,
    "k": 10,
    "l": 11,
    "m": 12,
    "n": 13,
    "o": 14,
    "p": 15,
    "q": 16,
    "r": 17,
    "s": 18,
    "t": 19,
    "u": 20,
    "v": 21,
    "w": 22,
    "x": 23,
    "y": 24,
    "z": 25,
}

var rotoring = function (rotor, input, roller) {
    console.log(input);
    return rotor[(letterToNumber[input] + roller) % 26].toLowerCase();
}

var reverse = function (rotor, output, roller) {
    input;
    letterToNumber[input];
    (letterToNumber[input] + roller);
    (letterToNumber[input] + roller) % 26
    rotor[(letterToNumber[input] + roller) % 26];
    console.log( rotor.indexOf(output.toUpperCase()));
    console.log(letterToNumber[rotor.indexOf(output.toUpperCase())]);
    return "a";
}

$(document).ready(function () {
    var key;
    var rollRotor1 = 0, rollRotor2 = 0, rollRotor3 = 0;
    var encrypt = true;
    var doOnce = true;
    $("body").on("keydown", function (e) {
        if (doOnce) {
            if ($("#encrypting").is(":checked")) { //WARNING: Decryption does not work yet
                var input = keyCodes[e.keyCode];
                var firstLayer = rotoring(rotor1, input, rollRotor1);
                var secondLayer = rotoring(rotor2, firstLayer, rollRotor2);
                var thirdLayer = rotoring(rotor3, secondLayer, rollRotor3);

                var mirror = ukw[thirdLayer];

                var reverseRotor1 = rotoring(rotor3, mirror, rollRotor3);
                var reverseRotor2 = rotoring(rotor2, reverseRotor1, rollRotor2);
                key = rotoring(rotor1, reverseRotor2, rollRotor1);

                rollRotor1++; //Should not turn at the same time
                if (rollRotor1 % 26 == 0) {
                    rollRotor2++;
                    if (rollRotor2 % 26 == 0) {
                        rollRotor3++;
                    }
                }
            } else {
                var input = keyCodes[e.keyCode];
                var firstLayer = reverse(rotor1, input, rollRotor1);
                var secondLayer = reverse(rotor2, firstLayer, rollRotor2);
                var thirdLayer = reverse(rotor3, secondLayer, rollRotor3);

                var mirror = ukw[thirdLayer];

                var reverseRotor1 = reverse(rotor3, mirror, rollRotor3);
                var reverseRotor2 = reverse(rotor2, reverseRotor1, rollRotor2);
                key = reverse(rotor1, reverseRotor2, rollRotor1);

                rollRotor1++; //Should not turn at the same time
                if (rollRotor1 % 26 == 0) {
                    rollRotor2++;
                    if (rollRotor2 % 26 == 0) {
                        rollRotor3++;
                    }
                }
            }

            console.log("------");
            doOnce = false;
            $("#" + key).toggleClass("lit unlit");
            $("#print").append(key.toUpperCase());
            $("#input").append(input.toUpperCase());
        }

    });

    $("body").on("keyup", function (e) {
        doOnce = true;
        $("#" + key).toggleClass("lit unlit");
    });

    $("#show").click(function () {
        $(".paper").toggle();
        if ($(".paper").css('display') == 'none')
            $(this).attr("value", "Show Encypted");
        else
            $(this).attr("value", "Hide Encypted");
    });
});