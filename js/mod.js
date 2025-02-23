let modInfo = {
	name: "字母增量树",
	author: "PriorityStack",
	pointsName: "字母",
	modFiles: ["tree.js","layers.js","achievements.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.1",
	name: "不急不急",
}

let changelog = `
<h1>修改日志</h1><br>
<h3>v0.0.1</h3><br>
什么都没有<br>
`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
	let gain=new Decimal(0.25)
	gain=gain.mul(tmp.OR.buyables[11].effect)
	if(hasUpgrade("OR",11))gain=gain.mul(1.5)
	if(hasUpgrade("OR",12))gain=gain.mul(upgradeEffect("OR",12))
	if(hasUpgrade("OR",15))gain=gain.mul(upgradeEffect("OR",15))
	if(hasUpgrade("IM",11))gain=gain.mul(1.75)
	if(hasUpgrade("IM",14))gain=gain.mul(upgradeEffect("IM",14))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("eeee308"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

