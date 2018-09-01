$(document).ready(function(){



// var starWars = {
//     // VARS...
//     chars = [] }

    function  Warrior (name, healthPoints, attackPwr, counterAttPwr, role, dispState ) { // Constructor
        this.name = name;
        this.hp = healthPoints;
        this.aPwr = attackPwr;
        this.caPwr = counterAttPwr;
        this.role = role; // pick-me, fighter, enemy, defender, dead
        this.display = dispState;
    };
    
    Warrior.prototype.getName = function() {
        return this.name;
    };
    Warrior.prototype.setName = function(newName) {
        this.name = newName;
    };

var obiWanWarrior = new Warrior("Obi Wan-Kenobi");
console.log("obiWanWarrior.name = " + obiWanWarrior.getName());


// };

// 
//     var toggled = false;
//     $(".button-big").click(function() {
//         if (!toggled) {
//             $(this).css( "background", "url(assets/images/225x150_MinistryApp.jpg) no-repeat");
//             toggled = true;
//         } else {
//             $(this).css( "background", "url(assets/images/ProfileWolfPic_400.jpg) no-repeat");
//             toggled = false;
//         }
//  
        // $("p").slideToggle();
    // } );

    // $(document).ready(function(){
        $(".button-attack").mouseup(function(){
            $(this).after($("#arrow").css("display", "none") );
        } );
        $(".button-attack").mousedown(function(){
            $(this).after($("#arrow").css("display", "block") );
        } );
    // } );
    
    var bkgrndWhite = true;
    // $(document).ready(function(){
        $(".button-attack").on("click", function() {
            if (bkgrndWhite) {
                $(".button-char").css("background-color", "red");
                bkgrndWhite = false;
            } else {
                $(".button-char").css("background-color", "white");
                bkgrndWhite = true;
            };
        } );

        function changeClass (buttonID) {
            if (showFighters) {
                // $("#obiwan-k-sel").removeClass("pick-me");
                // $(buttonID).removeClass("pick-me"); // Works to remove, but addClass didn't yet...
                $(buttonID).toggleClass("pick-me");
                console.log("True leg: buttonID = " + buttonID);
                //  Set the button timeout to run one seconds after the function's called.
                delayButtonHide = setTimeout(function() {
                    $(".pick-me").hide();
                    // $(this).css("display" , "none");
                }, 1000);
                // $(this).attr("display", "block");
                // $("#obiwan-k-sel").show();
                $(buttonID).show();
                showFighters = false;
            } else {
                console.log("False leg: buttonID = " + buttonID);
                $(buttonID).toggleClass("pick-me");
                console.log("$(buttonID).attr(CLASS) = " + $(buttonID).attr("class"));
                $(buttonID).attr("display", "block");
             //  Set the button timeout to run one second after the function's called.
                delayButtonShow = setTimeout(function() {
                    $(".pick-me").show();
                }, 1000);
                $(buttonID).show();
                // $("#obiwan-k-sel").show();
                showFighters = true;
            };
        };

        var showFighters = true;
        var buttonID = "";
        // $("#obiwan-k-sel").on("click", function() { // WORKS FOR SPECIFIC BUTTON
        $(".pick-me").on("click", function() { // WORKS for CLASS pick-me of all buttons
        // $(':button:contains(My Button)').click(changeClass); // Need to set button ID first...
        // $(".button-char:contains(pick-me)").on("click" , changeClass(buttonID)); // undefiuned problem
        // $(".pick-me").on("click" , fuction()  {

             buttonID = "#" + $(this).attr("id");
            changeClass(buttonID);
  
        });
            // var buttonID = "'#" + $(this).attr("id") + "'"; // DON'T need "'"
                console.log("OUTSIDE changeClass(buttonID), buttonID = " + buttonID);

// // //            // changeClass(buttonID);
            //     if (showFighters) {
            //     console.log("$(this) = " + $(this));
            //     console.log("$(this).attr = " + $(this).attr("class"));
            //     console.log("$(this).attr = " + $(this).attr("id"));
            //     $("#obiwan-k-sel").removeClass("pick-me");
            //     var buttonID = $(this).attr("id");
            //     console.log("$(this).attr = " + $(this).attr("class"));
            //     console.log("buttonID = " + buttonID);
            //     // $("#obiwan-k").css("display", "none");  // Pic only, skinny button still there
            //     //  Set the button timeout to run one seconds after the function's called.
            //     delayButtonHide = setTimeout(function() {
            //         $(".pick-me").hide();
            //         // $(this).css("display" , "none");
            //     }, 1000);
            //     // $(this).attr("display", "block");
            //     $("#obiwan-k-sel").show();
            //     showFighters = false;
            // } else {
            //     console.log("$(this) = " + $(this));
            //     console.log("$(this).attr = " + $(this).attr("class"));
            //     $(this).attr("display", "block");
            //  //  Set the button alert's timeout to run one second after the function's called.
            //     delayButtonHide = setTimeout(function() {
            //         $(".pick-me").show();
            //     }, 1000);
            //     $("#obiwan-k-sel").show();
            //     showFighters = true;
            // };
    // } );

/*                
      //  Start on click.
      $("#start").on("click", function() {
        //  Set the button alert's timeout to run three seconds after the function's called.
        delayButtonAlert = setTimeout(function() {
          alert("Alert #2");
        }, 3000);
      });
*/
                




        
    } );
    
    
    
    