(function() {
    console.log('mental sanity')

$( "form" ).submit(function( event ) {
  if ( $( "input:first" ).val() === "javatpoint" ) {
    $( "span" ).text( "Submitted Successfully." ).show();
    return;
  }
  $( "span" ).text( "Not valid!" ).show().fadeOut( 2000 );
  event.preventDefault();
});

  let currentPlayer = "TRAIN";
  let body = $("body");
  let column = $(".column");
    let slotBlock = $(".slot");
    let resetting = $("#resetting");
    let win = $(".youWin");
    let message = $("#message");
    let starting = $("#startTheGame");
    let startModal = $(".startModal");
    let shirt = $(".shirt");

    starting.on("click", function(e) {
        startModal.addClass("disappear");
    });

    // adding chips to each column on click
    column.on("click", function(e) {
        shirt.addClass("movement");
        function cancel() {
            shirt.removeClass("movement");
        }
        setTimeout(cancel, 800);
        let slotsInColumn = $(e.currentTarget).find(".slot");
        for (let i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("TRAIN") &&
                !slotsInColumn.eq(i).hasClass("PLANE")
            ) {
                slotsInColumn.eq(i).addClass(currentPlayer);
                break;
            }
            // this is working (chips fall down on click)
        }
        console.log(i);
        if (i === -1) {
            alert("This column is full!");
        }

        function clearboard() {
            slotBlock.removeClass("TRAIN");
            slotBlock.removeClass("PLANE");
        }
        let whereToGo = countries[Math.floor(Math.random() * countries.length)];

        if (checkForVictory(slotsInColumn)) {
            message.append(
                "<h2 class='addon'>It is decided! You guys are travelling by " +
                    currentPlayer +
                    " to " +
                    whereToGo +
                    "</h2>"
            );
            win.addClass("start");
            $(".passportPage").append(
                '<li class="destinations">' + whereToGo + "</li>"
            );
            resetting.on("click", function(e) {
                clearboard();
                win.removeClass("start");
                $(".addon").remove();
            });
            return;
        } else if (checkForVictory($(".row" + i))) {
            message.append(
                "<h2 class='addon'>It is decided! You guys are travelling by " +
                    currentPlayer +
                    " to " +
                    whereToGo +
                    "</h2>"
            );
            win.addClass("start");
            $(".passportPage").append(
                '<li class="destinations">' + whereToGo + "</li>"
            );
            resetting.on("click", function(e) {
                clearboard();
                win.removeClass("start");
                $(".addon").remove();
            });

            return;
        } else if (checkforDiagonals()) {
            message.append(
                "<h2 class='addon'>It is decided! You guys are travelling by " +
                    currentPlayer +
                    " to " +
                    whereToGo +
                    "</h2>"
            );
            win.addClass("start");
            $(".passportPage").append(
                '<li class="destinations">' + whereToGo + "</li>"
            );
            resetting.on("click", function(e) {
                clearboard();
                win.removeClass("start");
                $(".addon").remove();
            });

            return;
        }

        switchPlayers();
    });

    // Changing players
    function switchPlayers() {
        if (currentPlayer == "TRAIN") {
            currentPlayer = "PLANE";
        } else {
            currentPlayer = "TRAIN";
        }
    }

    // Checking for victory (row and column)

    function checkForVictory(slot) {
        let count = 0;
        let str = "";
        console.log(slot.index(), "indexOf");
        for (let i = 0; i < slot.length; i++) {
            count++;
            if (slot.eq(i).hasClass(currentPlayer)) {
                str += "w";
                // winner
            } else {
                str += "l";
            }
        }
        if (str.indexOf("wwww") > -1) {
            return true;
        }
    }

    function checkforDiagonals() { return false }


})()
