document.getElementById("mainTitle").innerText = "Peanutbutter Sand Witch";

//Game window reference
const gameWindow = document.getElementById("gameWindow");

//Inventory
let inventory = [];
const inventoryList = document.getElementById("inventoryList");

//Main Character
const mainCharacter = document.getElementById("hero");
const offsetCharacter = 16;
const tree1 = document.getElementById("squareTree");

gameWindow.onclick = function (e) {
    var rect = gameWindow.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;

    //FIX: character doesn't animate on first click
    //TODO: calc offset based on character size
    if (e.target.id !== "heroImage") {
        mainCharacter.style.left = x - offsetCharacter + "px";
        mainCharacter.style.top = y - offsetCharacter + "px";
    }

    switch (e.target.id) {
        case "squareTree":
            tree1.style.opacity = 0.5;
            break;
        case "key":
            getItem("Rusty Key", "rustyKey");
            break;
        case "mushroom":
            getItem("Mushroom", "magicMush")
            break;
        case "keyDoor":
            if (checkItem("Rusty Key")) {
                removeItem("Rusty Key", "rustyKey")
                console.log("Nice, you can open the door (in theory)")
            } else if (checkItem("Mushroom")) {
                removeItem("Mushroom", "magicMush")
                console.log("A mushroom does not work as a key, it's mangled beyond belief.")
            } else {
                console.log("Darn");
            }

            break;
        case "statueLady":
            console.log("Hello little one, would you like to know a secret?");
            console.log("There's a key by one of those gravestones there, go look. Please ^-^")
            break;
        default:
            tree1.style.opacity = 1;
    }
}
/**
 * Checks if the value exists within the array
 * If not, it adds value to the array and uses showItem function
 * @param {string} itemName 
 * @param {string} itemId 
 */
function getItem(itemName, itemId) {
    if (!checkItem(itemName)) {
        inventory.push(itemName);
        showItem(itemName, itemId);
        console.log(inventory);
    }
}

function checkItem(itemName) {
    return inventory.includes(itemName);
}
/**
 * Needs a name for displaying items and an html ID name
 * @param {string} itemName 
 * @param {string} itemId 
 */
function showItem(itemName, itemId) {
    console.log('You\'ve found ' + itemName + '!');
    const keyElement = document.createElement("li");
    keyElement.id = itemId;
    keyElement.innerText = itemName;
    inventoryList.appendChild(keyElement);
}
/**
 * Removes item from array and the element within the HTML
 * @param {string} itemName 
 * @param {string} itemId 
 */
function removeItem(itemName, itemId) {
    inventory = inventory.filter(function (newInventory) {
        return newInventory !== itemName;
    });
    document.getElementById(itemId).remove();
}