$(document).ready(function(){

    /*******************/
    /****   VARS    ****/
    /*******************/
    var playerChoseFighter = false; // Set at beginning of game
    var playerChoseDefender = false; // Set at beginning of game and at restart!
    var gameOver = false;

    /*******************/
    /**** FUNCTIONS ****/
    /*******************/
    // Warrior Object Constructor
    function  Warrior (objectID, name, healthPoints, attackPwr, counterAttPwr, role, dispState ) {
        this.name        = name;
        this.hpBase      = healthPoints;
        this.hp          = healthPoints; // obiWanWarrior.hp = hpBase;
        this.aPwrBase    = attackPwr; // Initialized current attack power to same value
        this.aPwr        = attackPwr; // Initialized current attack power to same value
        this.caPwr       = counterAttPwr;
        this.role        = role; // pick-me, fighter, enemy, defender, dead
        this.display     = dispState; // block or none
        this.objectID    = objectID;
        this.enemiesLeft = 3;
    } ;
    
    // Warrior Methods
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

    Warrior.prototype.getCaPwr = function() {
        return this.caPwr;
    };

    Warrior.prototype.getaPwr = function() {
        return this.aPwr;
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
        if ( this.role === "fighter") { // Fighter's LEG, This is the player's warrior!
            if ( this.hp <= 0 ) {
                console.log("Player's Warrior LOST. objectID.hp =" + this.objectID + "." + this.hp + ", Play Again?");
                $(".button-restart").show(); // Show during attack stage of the game
                var fighterText = "Your Warrior, " + player.name + ", LOST to " + defender.name + "!  Play Again?";
                $("#fighter-text").text(fighterText);
                $("#fighter-text").css("font-size" , "20px");
                $("#fighter-text").css("color" , "red");
                gameOver = true;
            } else {
                console.log("Awesome, you're still in the game!");
            }
        } else if (this.role === "defender" ){ // Defender's LEG
            if ( this.hp <= 0 ) { // Defender LOST
                defender.role = "dead";
                $("#" + defender.objectID + "-e-d").css("display" , "none");
                player.enemiesLeft = player.enemiesLeft - 1;
                console.log("Defender's Warrior, " + this.name + " LOST. objectID.hp =" + this.objectID + "." + this.hp);
                console.log("Fighter's Warrior, " + player.getName() + ", WON. player.enemiesLeft =" + player.objectID + "." + player.enemiesLeft);
                // Update Screen for winning this round...
                if ( player.enemiesLeft ) {
                    playerChoseDefender = false;
                    console.log("Select next enemy...");
                    $("#choose-enemy").css("color" , "red");
                    var fighterText = "You, as " + player.name + ", HOSPITALIZED " + defender.name + " for the WIN of this round!";
                    $("#fighter-text").text(fighterText);
                    $("#fighter-text").css("font-size" , "20px");
                    $("#fighter-text").css("color" , "green");
                    var defenderText = "Look above to choose another enemy...";
                    $("#defender-text").text(defenderText);
                    $(".status-text").show(); // Show during attack stage of the game
                } else {
                    // Update Screen for this WIN
                    console.log("!!! YOU WON !!!");
                    $("#choose-enemy").css("color" , "black");
                    var fighterText = "!!! YOU WON !!!";
                    $("#fighter-text").text(fighterText);
                    $("#fighter-text").css("font-size" , "25px");
                    $("#fighter-text").css("color" , "purple");
                    if ( player.hp < 0) {
                        var defenderText = "<p>Well, technically this was a mutually assured destruction because,</p> <p>your health points went below zero. But it took three of them to do it!!!</p>";
                        $("#defender-text").html(defenderText);
                    };
                    $(".status-text").show(); // Show during attack stage of the game
                    $(".button-restart").show(); // Show during attack stage of the game
                    gameOver = true;
                };
            };
        } else {
            console.log("checkStatus called when warrior is not fighter or defender! objectID.role =" + this.objectID + "." + this.role);
        };
    };

    /*********************/
    /** WARRIOR OBJECTS **/
    /**********************/

    var obiWanWarrior = new Warrior("obiWanWarrior", "Obi Wan-Kenobi", 125, 7, 22, "pick-me", "block");
    // obiWanWarrior.printStats();
    $(".button-name-obiwan").text(obiWanWarrior.name);
    $(".button-hp-obiwan").text(obiWanWarrior.hp);

    var lukeWarrior = new Warrior("lukeWarrior", "Luke Skywalker", 160, 6, 15, "pick-me", "block");
    // lukeWarrior.printStats();
    $(".button-name-luke").text(lukeWarrior.name);
    $(".button-hp-luke").text(lukeWarrior.hp);

    var dSidiousWarrior = new Warrior("dSidiousWarrior", "Darth Sidious", 140, 10, 10, "pick-me", "block");
    // dSidiousWarrior.printStats();
    $(".button-name-dsidious").text(dSidiousWarrior.name);
    $(".button-hp-dsidious").text(dSidiousWarrior.hp);

    var dMaulWarrior = new Warrior("dMaulWarrior", "Darth Maul", 200, 5, 12, "pick-me", "block");
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


    /////////////////////
    // RE-START BUTTON //
    /////////////////////
    $(".button-restart").on("click", function() {
        // Initialize Vars
        playerChoseFighter = false; // Set at beginning of gameand at restart, but NOT after each warrior is defeated.
        playerChoseDefender = false; // Set at beginning of game and at restart!
        gameOver = false;

        fighterText = "";
        defenderText = "";

        // Initialize Attributes / Classes
        $(".pick-me").show();
        $(".pick-enemy").hide();
        $(".pick-defender").hide();
        $(".status-text").hide(); 
        $(".button-restart").hide();
        $("#player-text").css("font-size" , "14px");
        $("#player-text").css("color" , "black");
        $("#player-text").text(fighterText);
        $("#defender-text").css("font-size" , "14px");
        $("#defender-text").css("color" , "black");
        $("#defender-text").text(defenderText);

        $("#obiWanWarrior").addClass(".pick-me"); // Restore the pick-me class
        $("#obiWanWarrior").removeClass("player-picked"); // Remove if Marked as PLAYER
        $("#obiWanWarrior-e").addClass(".pick-enemy"); // Restore the pick-me class
        $("#obiWanWarrior-e").removeClass("defender-picked"); // Remove if Marked as PLAYER
        $("#obiWanWarrior-e-d").addClass(".pick-defender"); // Restore the pick-me class
        $("#obiWanWarrior-e-d").removeClass("defender-picked"); // Remove if Marked as PLAYER

        $("#lukeWarrior").addClass(".pick-me"); // Restore the pick-me class
        $("#lukeWarrior").removeClass(".player-picked"); // Remove if Marked as PLAYER
        $("#lukeWarrior-e").addClass(".pick-enemy"); // Restore the pick-me class
        $("#lukeWarrior-e").removeClass(".defender-picked"); // Remove if Marked as PLAYER
        $("#lukeWarrior-e-d").addClass(".pick-defender"); // Restore the pick-me class
        $("#lukeWarrior-e-d").removeClass(".defender-picked"); // Remove if Marked as PLAYER

        $("#dSidiousWarrior").addClass(".pick-me"); // Restore the pick-me class
        $("#dSidiousWarrior").removeClass(".player-picked"); // Remove if Marked as PLAYER
        $("#dSidiousWarrior-e").addClass(".pick-enemy"); // Restore the pick-me class
        $("#dSidiousWarrior-e").removeClass(".defender-picked"); // Remove if Marked as PLAYER
        $("#dSidiousWarrior-e-d").addClass(".pick-defender"); // Restore the pick-me class
        $("#dSidiousWarrior-e-d").removeClass(".defender-picked"); // Remove if Marked as PLAYER

        $("#dMaulWarrior").addClass(".pick-me"); // Restore the pick-me class
        $("#dMaulWarrior").removeClass(".player-picked"); // Remove if Marked as PLAYER
        $("#dMaulWarrior-e").addClass(".pick-enemy"); // Restore the pick-me class
        $("#dMaulWarrior-e").removeClass(".defender-picked"); // Remove if Marked as PLAYER
        $("#dMaulWarrior-e-d").addClass(".pick-defender"); // Restore the pick-me class
        $("#dMaulWarrior-e-d").removeClass(".defender-picked"); // Remove if Marked as PLAYER

        $("#player").addClass(".pick-me"); // Restore the pick-me class
        $("#player").removeClass(".player-picked"); // Remove if Marked as PLAYER
        $("#player-e").addClass(".pick-enemy"); // Restore the pick-me class
        $("#player-e").removeClass(".defender-picked"); // Remove if Marked as PLAYER
        $("#player-e-d").addClass(".pick-defender"); // Restore the pick-me class
        $("#player-e-d").removeClass(".defender-picked"); // Remove if Marked as PLAYER

        $("#defender").addClass(".pick-me"); // Restore the pick-me class
        $("#defender").removeClass(".player-picked"); // Remove if Marked as PLAYER
        $("#defender-e").addClass(".pick-enemy"); // Restore the pick-me class
        $("#defender-e").removeClass(".defender-picked"); // Remove if Marked as PLAYER
        $("#defender-e-d").addClass(".pick-defender"); // Restore the pick-me class
        $("#defender-e-d").removeClass(".defender-picked"); // Remove if Marked as PLAYER


        // Initial Warrior Objects
        // obiWanWarrior
        obiWanWarrior.hp = obiWanWarrior.hpBase;
        obiWanWarrior.aPwr = obiWanWarrior.aPwrBase; // Initialized current attack power to same value
        obiWanWarrior.role = "pick-me"; // pick-me, fighter, enemy, defender, dead
        obiWanWarrior.display = "block";
        obiWanWarrior.enemiesLeft = 3;

         // lukeWarrior
         lukeWarrior.hp = lukeWarrior.hpBase;
         lukeWarrior.aPwr = lukeWarrior.aPwrBase; // Initialized current attack power to same value
         lukeWarrior.role = "pick-me"; // pick-me, fighter, enemy, defender, dead
         lukeWarrior.display = "block";
         lukeWarrior.enemiesLeft = 3;
 
        // dSidiousWarrior
        dSidiousWarrior.hp = dSidiousWarrior.hpBase;
        dSidiousWarrior.aPwr = dSidiousWarrior.aPwrBase; // Initialized current attack power to same value
        dSidiousWarrior.role = "pick-me"; // pick-me, fighter, enemy, defender, dead
        dSidiousWarrior.display = "block";
        dSidiousWarrior.enemiesLeft = 3;

        // dMaulWarrior
        dMaulWarrior.hp = dMaulWarrior.hpBase;
        dMaulWarrior.aPwr = dMaulWarrior.aPwrBase; // Initialized current attack power to same value
        dMaulWarrior.role = "pick-me"; // pick-me, fighter, enemy, defender, dead
        dMaulWarrior.display = "block";
        dMaulWarrior.enemiesLeft = 3;

        // player
        player.name = "fighter";
        player.hpBase = 1;
        player.hp = 1;
        player.aPwrBase = 1; 
        player.aPwr = 1; 
        player.caPwr = 1; 
        player.role = "pick-me"; // pick-me, fighter, enemy, defender, dead
        player.display = "block";
        player.objectID = "player";
        player.enemiesLeft = 3;
    

        // defender
        defender.name = "defender";
        defender.hpBase = 1;
        defender.hp = 1;
        defender.aPwrBase = 1; 
        defender.aPwr = 1; 
        defender.caPwr = 1; 
        defender.role = "pick-me"; // pick-me, fighter, enemy, defender, dead
        defender.display = "block";
        defender.objectID = "defender";
        defender.enemiesLeft = 3;

    } );

        
    ///////////////////
    // ATTACK BUTTON //
    ///////////////////
    $(".button-attack").mouseup(function(){
    $(this).after($("#arrow").css("display", "none") );
    } );
    $(".button-attack").mousedown(function(){
        if ( playerChoseFighter && playerChoseDefender && !gameOver) {
            $(this).after($("#arrow").css("display", "block") );

            // Update Defender Stats first to get current attack power from fighter to subtract
            defender.calcStats();

            // Update Screen from this attack
            var fighterText = "You, as " + player.name + ", hit " + defender.name + " for " + player.getaPwr() + " damage.";
            $("#fighter-text").text(fighterText);
            var defenderText = "Defender " + defender.name + " hit you as ," + player.name + ", for " + defender.getCaPwr() + " damage.";
            $("#defender-text").text(defenderText);
            $(".status-text").show(); // Show during attack stage of the game


            // Update Player / Fighter
            player.calcStats();

            // Check Player / Fighter Status
            player.checkStatus();
            console.log("player.getObjectID() = " + player.getObjectID());
            console.log("player.getHp() = " + player.getHp());
            player.printStats();
            $(".player-picked .button-hp").text(player.getHp()); // player-picked

            // Check Defender's Status
            defender.checkStatus();
            console.log("defender.getObjectID() = " + defender.getObjectID());
            console.log("defender.getHp() = " + defender.getHp());
            defender.printStats();
            $(".defender-picked .button-hp").text(defender.getHp()); // defender-picked
        }
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

    /////////////////////
    // WARRIOR BUTTONS //
    /////////////////////

    $(".button-char").on("click", function() { // WORKS for CLASS of all buttons-char
        var buttonID = "";
        var myClassPlayer = "";
        var myActionIn = "hide";
        if ( gameOver ) { 
            return;
        } else if ( ( $("button").hasClass("pick-me") === true ) &&
            // ( playerChoseFighter === false ) &&
            ( playerChoseFighter === false ) && !gameOver ) {
            // Get the specific ID from the button clicked
            buttonID = "#" + $(this).attr("id");
            // Configure vars for function call to show fighter chosen, hide others
            myClassPlayer = "pick-me";
            myActionIn = "hide";
            updatePickMe(buttonID, myClassPlayer, myActionIn); // WORKS
            // Modify buttonID and vars for second call to function to display enemies
            buttonID += "-e";
            myClassPlayer = "pick-enemy";
            myActionIn = "show";
            updatePickMe(buttonID, myClassPlayer, myActionIn); // WORKS
            
            if ( $(this).attr("id") === "obiWanWarrior" ) { // Works for selecting via ID
                console.log( "INSIDE IF OBIWAN $(this).attr('id') = " + $(this).attr("id"));
                player = obiWanWarrior;
                player.role = "fighter";
                player.printStats();
            } else if ( $(this).attr("id") === "lukeWarrior" ) {
                console.log( "INSIDE IF LUKE $(this).attr('id') = " + $(this).attr("id"));
                player = lukeWarrior;
                player.role = "fighter";
                player.printStats();
            } else if ( $(this).attr("id") === "dSidiousWarrior" ) {
                console.log( "INSIDE IF D-SIDIOUS $(this).attr('id') = " + $(this).attr("id"));
                player = dSidiousWarrior;
                player.role = "fighter";
                player.printStats();
            } else if ( $(this).attr("id") === "dMaulWarrior" ) {
                console.log( "INSIDE IF D-MAUL $(this).attr('id') = " + $(this).attr("id"));
                player = dMaulWarrior;
                player.role = "fighter";
                player.printStats();
            }
            playerChoseFighter = true;
            $(".button-restart").hide(); // Hide during attacking stage of the game
        } else if ( ( $("button").hasClass("pick-enemy") === true ) &&
                playerChoseFighter ) {
            $("#choose-enemy").css("color" , "black");
            var fighterText = "";
            $("#fighter-text").text(fighterText);
            $("#fighter-text").css("font-size" , "14px");
            $("#fighter-text").css("color" , "black");
            var defenderText = "";
            $("#defender-text").text(defenderText);
            $(".status-text").show(); // Show during attack stage of the game

            // DON'T Select a enemy if one is active...
            if ( playerChoseFighter && playerChoseDefender ) {
                return false;
            } else {
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
                
                if ( $(this).attr("id") === "obiWanWarrior-e" ) { // Works for selecting via ID
                    console.log( "INSIDE IF OBIWAN $(this).attr('id') = " + $(this).attr("id"));
                    defender = obiWanWarrior;
                    defender.role = "defender";
                    defender.printStats();
                } else if ( $(this).attr("id") === "lukeWarrior-e" ) {
                    console.log( "INSIDE IF LUKE $(this).attr('id') = " + $(this).attr("id"));
                    defender = lukeWarrior;
                    defender.role = "defender";
                    defender.printStats();
                } else if ( $(this).attr("id") === "dSidiousWarrior-e" ) {
                    console.log( "INSIDE IF D-SIDIOUS $(this).attr('id') = " + $(this).attr("id"));
                    defender = dSidiousWarrior;
                    defender.role = "defender";
                    defender.printStats();
                } else if ( $(this).attr("id") === "dMaulWarrior-e" ) {
                    console.log( "INSIDE IF D-MAUL $(this).attr('id') = " + $(this).attr("id"));
                    defender = dMaulWarrior;
                    defender.role = "defender";
                    defender.printStats();
                };
            };
            playerChoseDefender = true;
        } else {
            console.log("At ENTRY: Not a 'pick-me' or 'pick-enemy' button class, need to pick fighter for player...");
            return ;
        }
    } );
} );
