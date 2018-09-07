$(document).ready(function(){

// var starWars = {
//     // VARS...
//     chars = [] }

    function  Warrior (objectID, name, healthPoints, attackPwr, counterAttPwr, role, dispState ) { // Constructor
        this.name = name;
        this.hp = healthPoints;
        this.aPwrBase = attackPwr; // Initialized current attack power to same value
        this.aPwr = attackPwr; // Initialized current attack power to same value
        this.caPwr = counterAttPwr;
        this.role = role; // pick-me, fighter, enemy, defender, dead
        this.display = dispState;
        this.objectID = objectID;
        this.enemiesLeft = 3;
    } ;
    

    Warrior.prototype.getCaPwr = function() {
        return this.caPwr;
    };

    Warrior.prototype.getaPwr = function() {
        return this.aPwr;
    };

    Warrior.prototype.calcStats = function() {
        if ( this.role === "fighter") { // This is the player's warrior!
            this.hp = this.hp - defender.getCaPwr();
            this.aPwr = this.aPwr + this.aPwrBase;
        } else if (this.role === "defender" ){
            this.hp = this.hp - player.getaPwr();
        } else {
            console.log("calcStats called when warrior is not fighter or defender! objectID.role =" + this.objectID + "." + this.role);
        };
    };

    Warrior.prototype.checkStatus = function() {
        if ( this.role === "fighter") { // This is the player's warrior!
            if ( this.hp <= 0 ) {
                console.log("Player's Warrior LOST. objectID.hp =" + this.objectID + "." + this.hp + ", Play Again?");
            } else {
                console.log("Awesome, you're still in the game!");
            }
        } else if (this.role === "defender" ){
            if ( this.hp <= 0 ) {
                player.enemiesLeft = player.enemiesLeft - 1;
                console.log("Defender's Warrior, " + this.name + " LOST. objectID.hp =" + this.objectID + "." + this.hp);
                console.log("Fighter's Warrior, " + player.getName() + ", WON. player.enemiesLeft =" + player.objectID + "." + player.enemiesLeft);
                if ( player.enemiesLeft <= 0 ) {
                    console.log("!!! YOU WON !!!")
                } else {
                    console.log("Select next enemy...");
                }
            }
        } else {
            console.log("checkStatus called when warrior is not fighter or defender! objectID.role =" + this.objectID + "." + this.role);
        };
    };

    Warrior.prototype.printStats = function() {
        console.log("name = " + this.name);
        console.log("hp = " + this.hp);
        console.log("aPwrBase = " + this.aPwrBase);
        console.log("aPwr = " + this.aPwr);
        console.log("caPwr = " + this.caPwr);
        console.log("role = " + this.role);
        console.log("display = " + this.display);
        console.log("objectID = " + this.objectID);
    }
    Warrior.prototype.getName = function() {
        return this.name;
    };
    Warrior.prototype.setName = function(newName) {
        this.name = newName;
    };

    Warrior.prototype.getObjectID = function() {
        return this.objectID;
    };
    Warrior.prototype.setObjectID = function(newObjectID) {
        this.objectID = newObjectID;
    };

    Warrior.prototype.getHp = function() {
        return this.hp.toString();
    };
    Warrior.prototype.setHp = function(newHp) {
        this.name = newHp;
    };

    var obiWanWarrior = new Warrior("obiWanWarrior", "Obi Wan-Kenobi", 125, 6, 22, "pick-me", "block");
    // console.log("obiWanWarrior.name = " + obiWanWarrior.getName());
    // console.log("obiWanWarrior.objectID = " + obiWanWarrior.getObjectID() );
    // obiWanWarrior.printStats();
    $(".button-name-obiwan").text(obiWanWarrior.name);
    $(".button-hp-obiwan").text(obiWanWarrior.hp);

    var lukeWarrior = new Warrior("lukeWarrior", "Luke Skywalker", 160, 4, 15, "pick-me", "block");
    // lukeWarrior.printStats();
    $(".button-name-luke").text(lukeWarrior.name);
    $(".button-hp-luke").text(lukeWarrior.hp);

    var dSidiousWarrior = new Warrior("dSidiousWarrior", "Darth Sidious", 100, 10, 10, "pick-me", "block");
    // dSidiousWarrior.printStats();
    $(".button-name-dsidious").text(dSidiousWarrior.name);
    $(".button-hp-dsidious").text(dSidiousWarrior.hp);

    var dMaulWarrior = new Warrior("dMaulWarrior", "Darth Maul", 200, 2, 12, "pick-me", "block");
    // dMaulWarrior.printStats();
    $(".button-name-dmaul").text(dMaulWarrior.name);
    $(".button-hp-dmaul").text(dMaulWarrior.hp);

    var player = new Warrior("player", "fighter", 1, 1, 1, "fighter", "block");
    // player.printStats();
    $(".button-name-player").text(player.name);
    $(".button-hp-player").text(player.hp);

    var defender = new Warrior("defender", "defender", 2, 2, 2, "defender", "block");
    // defender.printStats();
    $(".button-name-defender").text(defender.name);
    $(".button-hp-defender").text(defender.hp);

    // Dont show enemies until after player chooses their fighter
    $(".pick-enemy").hide();

    ///////////////////
    // ATTACK BUTTON //
    ///////////////////
    $(".button-attack").mouseup(function(){
        $(this).after($("#arrow").css("display", "none") );
    } );
    $(".button-attack").mousedown(function(){
        $(this).after($("#arrow").css("display", "block") );

        // Update Defender Stats first to get current attack power from fighter to subtract
        defender.calcStats();
        // Update Player / Fighter
        player.calcStats();

        // Check Player / Fighter Status
        player.checkStatus();
        console.log("player.getObjectID() = " + player.getObjectID());
        // console.log("player.hp.toString() = " + player.hp.toString());
        console.log("player.getHp() = " + player.getHp());
        player.printStats();
        // $(".player-picked .button-hp").text(player.hp.toString()); // player-picked
        $(".player-picked .button-hp").text(player.getHp()); // player-picked

        // Check Defender's Status
        defender.checkStatus();
        console.log("defender.getObjectID() = " + defender.getObjectID());
        // console.log("defender.hp.toString() = " + defender.hp.toString());
        console.log("defender.getHp() = " + defender.getHp());
        defender.printStats();
        // $(".defender-picked .button-hp").text(defender.hp.toString()); // defender-picked
        $(".defender-picked .button-hp").text(defender.getHp()); // defender-picked
    } );
    
    function updatePickMe (buttonID, myClass, myAction) { // myClass = pick-me 1st time, pick-enemy 2nd time
        console.log("START updatePickMe: buttonID = " + buttonID + "; myClass = " + myClass);
        $(buttonID).removeClass(myClass); // Remove from pick-me class
        $(buttonID).addClass("player-picked"); // Mark as PLAYER
        console.log("ADD CLASS TEST: player-picked = " + $(buttonID).hasClass("player-picked"));
        //  Set the button timeout to run one seconds after the function's called.
        if ( myAction === "show" ) {
            $(buttonID).hide();
            var delayButtonShow = setTimeout(function() {
                $("." + myClass).show();// Show others in pick enemy class
            }, 300);
        }; // Do action based on match of string, 
        if ( myAction === "hide" ) {
            $(buttonID).show(); // Show Fighter chosen by player, hide others
            var delayButtonHide = setTimeout(function() {
                $("." + myClass).hide(); // Hide others in pick-me class
            }, 300);
        };
    };

    function updatePickEnemy (buttonID, myClass, myAction) { // myClass = pick-me 1st time, pick-enemy 2nd time
        console.log("START updatePickEnemy: buttonID = " + buttonID + "; myClass = " + myClass);
        $(buttonID).removeClass(myClass); // Remove selected enemy from pick-enemy class
        $(buttonID).addClass("defender-picked"); // Mark as DEFENDER
        console.log("ADD CLASS TEST: defender-picked = " + $(buttonID).hasClass("defender-picked"));
        if ( myAction === "show" ) { // Show OTHER enemies
            $(buttonID).hide(); // Defender Appears in Fight Area
            var delayButtonShow = setTimeout(function() {
                $("." + myClass).show();// Show others in pick enemy class
            }, 300);
        }; // Do action based on match of string, 
        if ( myAction === "hide" ) {
            $(buttonID).show(); // Defender removed from choose-enemy section
            var delayButtonShow = setTimeout(function() {
                $("." + myClass).hide();// Show others in pick enemy class
            }, 300);
        };
    };

    
    var playerChoseFighter = false;
    $(".button-char").on("click", function() { // WORKS for CLASS of all buttons-char
        var buttonID = "";
        var myClassPlayer = "";
        var myActionIn = "hide";
        if ( ( $("button").hasClass("pick-me") === true ) &&
            ( playerChoseFighter === false ) ) {
            // Get the specific ID from the button clicked
            buttonID = "#" + $(this).attr("id");
            // Configure vars for function call to show fighter chosen, hide others
            myClassPlayer = "pick-me";
            myActionIn = "hide";
            updatePickMe(buttonID, myClassPlayer, myActionIn); // WORKS?
            // Modify buttonID and vars for second call to function to display enemies
            buttonID += "-e";
            myClassPlayer = "pick-enemy";
            myActionIn = "show";
            updatePickMe(buttonID, myClassPlayer, myActionIn); // WORKS?
            
            if ( $(this).attr("id") === "obiwan-k-sel" ) { // Works for selecting via ID
                console.log( "INSIDE IF OBIWAN $(this).attr('id') = " + $(this).attr("id"));
                player = obiWanWarrior;
                player.role = "fighter";
                player.printStats();
            } else if ( $(this).attr("id") === "luke-s-sel" ) {
                console.log( "INSIDE IF LUKE $(this).attr('id') = " + $(this).attr("id"));
                player = lukeWarrior;
                player.role = "fighter";
                player.printStats();
            } else if ( $(this).attr("id") === "d-sidious-sel" ) {
                console.log( "INSIDE IF D-SIDIOUS $(this).attr('id') = " + $(this).attr("id"));
                player = dSidiousWarrior;
                player.role = "fighter";
                player.printStats();
            } else if ( $(this).attr("id") === "d-maul-sel" ) {
                console.log( "INSIDE IF D-MAUL $(this).attr('id') = " + $(this).attr("id"));
                player = dMaulWarrior;
                player.role = "fighter";
                player.printStats();
            }
            playerChoseFighter = true;
        } else if ( ( $("button").hasClass("pick-enemy") === true ) &&
                playerChoseFighter ) {
            // Get the specific ID from the button clicked
            buttonID = "#" + $(this).attr("id");
            // Set vars for function call, hide / move enemy picked to defender section
            myClassPlayer = "pick-enemy";
            myActionIn = "show";
            updatePickEnemy(buttonID, myClassPlayer, myActionIn); // WORKS?
            buttonID += "-d";
            myClassPlayer = "pick-defender";
            myActionIn = "hide";
            updatePickEnemy(buttonID, myClassPlayer, myActionIn); // WORKS?
            
            if ( $(this).attr("id") === "obiwan-k-sel-e" ) { // Works for selecting via ID
                console.log( "INSIDE IF OBIWAN $(this).attr('id') = " + $(this).attr("id"));
                defender = obiWanWarrior;
                defender.role = "defender";
                defender.printStats();
            } else if ( $(this).attr("id") === "luke-s-sel-e" ) {
                console.log( "INSIDE IF LUKE $(this).attr('id') = " + $(this).attr("id"));
                defender = lukeWarrior;
                defender.role = "defender";
                defender.printStats();
            } else if ( $(this).attr("id") === "d-sidious-sel-e" ) {
                console.log( "INSIDE IF D-SIDIOUS $(this).attr('id') = " + $(this).attr("id"));
                defender = dSidiousWarrior;
                defender.role = "defender";
                defender.printStats();
            } else if ( $(this).attr("id") === "d-maul-sel-e" ) {
                console.log( "INSIDE IF D-MAUL $(this).attr('id') = " + $(this).attr("id"));
                defender = dMaulWarrior;
                defender.role = "defender";
                defender.printStats();
            }
        } else {
            console.log("At ENTRY: Not a 'pick-me' or 'pick-enemy' button class, need to pick fighter for player...");
            return ;
        }
    } );
} );
