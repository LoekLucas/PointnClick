document.getElementById("mainTitle").innerText = "Point and Click adventure game";
// Game State
let gameState = {

}
let coinAmount = 0;
let firstTimeStatue = true;
let unlockedDoor1 = false;

//localStorage.removeItem("gameState");
if (Storage) {
    if (localStorage.gameState) {
        // uses localStorage gameState string and convert it to an object then store it into gameState
        gameState = JSON.parse(localStorage.gameState);
    }

    //else {
    // convert local object variable to a string. Then store it into localStorage
    //localStorage.setItem("gameState", JSON.stringify(gameState))
    //}
}


//Game window reference
const gameWindow = document.getElementById("gameWindow");
const inventoryList = document.getElementById("inventoryList");
const sec = 1000;

//Main Character
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;

//speech bubbles
const heroSpeech = document.getElementById("heroSpeech");
const counsterSpeech = document.getElementById("counterSpeech");
//audio for dialog
const heroAudio = document.getElementById("heroAudio");
const counterAudio = document.getElementById("counterAudio");

//avatar
const counterAvatar = document.getElementById("counterAvatar");

//Objects
const tree1 = document.getElementById("squareTree");

if (gameState.keyPickedUp) {
    document.getElementById("key").remove();
}

updateInventory(gameState.inventory, inventoryList);

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    if (counterSpeech.style.opacity == 0 && heroSpeech.style.opacity == 0) {
        if (e.target.id !== "heroImage") {
            mainCharacter.style.left = x - offsetCharacter + "px";
            mainCharacter.style.top = y - offsetCharacter + "px";
        }
        switch (e.target.id) {
            case "key":
                console.log("pick up key")
                document.getElementById("key").remove();
                gameState.keyPickedUp = true;
                changeInventory('key', "add");
                saveGameState(gameState);
                break;
            case "well":
                if (gameState.coinPickedUp == false) {
                    changeInventory("coin", "add");
                    coinAmount++;
                    gameState.coinPickedUp = true;
                } else {
                    console.log("There are no more coins in this well!");
                }
                break;
            case "coin2":
                if (coinAmount < 3) {
                    changeInventory("coin", "add")
                    coinAmount++;
                }
                break;
            case "coin3":
                if (coinAmount < 3) {
                    changeInventory("coin", "add")
                    coinAmount++;
                }
                break;
            case "doorWizardHut":
                if (checkItem("knife")) {
                    showMessage(heroSpeech, "Take that wizard!", heroAudio);
                } else if (checkItem("key")) {
                    showMessage(heroSpeech, "Oh no, the wizard's in there but I don't have anything to defeat him!", heroAudio);
                    unlockedDoor1 = true;
                }
                break;
            case "doorWizardStorage":
                if (checkItem("2nd key")) {
                    showMessage(heroSpeech, "This should be good enough..", heroAudio);
                    changeInventory("knife", "add")
                }
                break;
            case "statue":
                switch (firstTimeStatue) {
                    case true:
                        showMessage(heroSpeech, "Hm, pretty interesting statue.", heroAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                        setTimeout(showMessage, 4.1 * sec, counsterSpeech, "Thank you!", counterAudio);
                        setTimeout(showMessage, 8.1 * sec, heroSpeech, "I did not expect a response.. Any chance you know how to get into the Wizard's hut?", heroAudio);
                        setTimeout(showMessage, 12.1 * sec, counsterSpeech, "I believe the wizard recently killed the last person with the key..", counterAudio);
                        setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);
                        firstTimeStatue = false;
                        break;

                    case false:
                        switch (unlockedDoor1) {
                            case true:
                                if (coinAmount < 3) {
                                    showMessage(heroSpeech, "Hey, I unlocked the door but I need a weapon to kill the wizard.", heroAudio);
                                    setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                                    setTimeout(showMessage, 4.1 * sec, counsterSpeech, "I'll give you the key to his storage room for a couple coins", counterAudio);
                                    setTimeout(showMessage, 8.1 * sec, heroSpeech, "What? Why do you even need coins?", heroAudio);
                                    setTimeout(showMessage, 12.1 * sec, counsterSpeech, "Get the coins or you're not getting the key.", counterAudio);
                                    setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);
                                }
                                else {
                                    showMessage(heroSpeech, "Here, I got your coins.", heroAudio);
                                    setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                                    setTimeout(showMessage, 4.1 * sec, counsterSpeech, "Well thank you. Here's your key.", counterAudio);
                                    setTimeout(function () { counterAvatar.style.opacity = 0; }, 8.1 * sec);
                                    changeInventory("2nd key", "add")
                                }
                                break;

                            case false:
                                showMessage(heroSpeech, "Hey, I forgot what to do, can you repeat please?", heroAudio);
                                setTimeout(function () { counterAvatar.style.opacity = 1; }, 4 * sec);
                                setTimeout(showMessage, 4.1 * sec, counsterSpeech, "I believe the wizard recently killed the last person with the key..", counterAudio);
                                setTimeout(showMessage, 8.1 * sec, heroSpeech, "You could also just say what I should do.", heroAudio);
                                setTimeout(showMessage, 12.1 * sec, counsterSpeech, "But that wouldn't be fun, now would it?", counterAudio);
                                setTimeout(function () { counterAvatar.style.opacity = 0; }, 16 * sec);
                                break;
                        }
                        break;
                }

            default:
                break;
        }
    }
}

/**
 * Add or remove item in inventory
 * @param {string} itemName 
 * @param {string} action 
 */
function changeInventory(itemName, action) {
    if (itemName == null || action == null) {
        console.error("Wrong parameters given to changeInventory()");
        return;
    }

    switch (action) {
        case 'add':
            gameState.inventory.push(itemName);
            break;
        case 'remove':
            gameState.inventory = gameState.inventory.filter(function (newInventory) {
                return newInventory !== itemName;
            });
            document.getElementById("inv-" + itemName).remove();
            break;

    }
    updateInventory(gameState.inventory, inventoryList);
}

/**
 * This returns string value if it exist within the array
 * @param {string} itemName 
 * @returns 
 */
function checkItem(itemName) {
    return gameState.inventory.includes(itemName);
}

function updateInventory(inventory, inventoryList) {
    inventoryList.innerHTML = '';
    inventory.forEach(function (item) {
        const inventoryItem = document.createElement("li");
        inventoryItem.id = 'inv-' + item;
        inventoryItem.innerText = item;
        inventoryList.appendChild(inventoryItem);
    })
}

/**
 * It will show dialog and trigger sound.
 * @param {getElementById} targetBubble 
 * @param {string} message
 * @param {getElementById} targetSound 
 */
function showMessage(targetBubble, message, targetSound) {
    targetSound.currentTime = 0;
    targetSound.play();
    targetBubble.innerText = message;
    targetBubble.style.opacity = 1;
    setTimeout(hideMessage, 4 * sec, targetBubble, targetSound);
}

/**
 * Hides message and pauze the audio
 * @param {getElementById} targetBubble 
 * @param {getElementById} targetSound 
 */
function hideMessage(targetBubble, targetSound) {
    targetSound.pause();
    targetBubble.innerText = "...";
    targetBubble.style.opacity = 0;
}


function saveGameState(gameState) {
    localStorage.gameState = JSON.stringify(gameState);
}