const Discord = require("discord.js")
var fs = require("fs")

var bot = new Discord.Client()

const repFileStorage = require("./repStorage.json");

bot.on("message", (message) => {
    if(message.author.bot) return
    if(!message.content.startsWith(";")) return

    var command = message.content.split(";")[1].split(" ")

    switch(command[0]) {
        case "minusrep":
            var negativeRepId = message.mentions.users.first().id + " negrep"

            if(repFileStorage[negativeRepId] == undefined) {
                repFileStorage[negativeRepId] = [1, message.author.id + " +1"]
                fs.writeFile("./repStorage.json", JSON.stringify(repFileStorage), (err) => {})
            }
            else {
                repFileStorage[negativeRepId] = [repFileStorage[negativeRepId][0] - 1, repFileStorage[negativeRepId][1] + ", " + message.author.id + " +1"]
                fs.writeFile("./repStorage.json", JSON.stringify(repFileStorage), (err) => {})
            }
            break
        case "plusrep":
            var positiveRepId = message.mentions.users.first().id + " posrep"

            if(repFileStorage[positiveRepId] == undefined) {
                repFileStorage[positiveRepId] = [1, message.author.id + " +1"]
                fs.writeFile("./repStorage.json", JSON.stringify(repFileStorage), (err) => {})
            } else {
                repFileStorage[positiveRepId] = [repFileStorage[positiveRepId][0] + 1, repFileStorage[positiveRepId][1] + ", " + message.author.id + " +1"]
                fs.writeFile("./repStorage.json", JSON.stringify(repFileStorage), (err) => {})
            }
            break
        case "viewrep":
            var negativeRepId = message.mentions.users.first().id + " negrep"
            var positiveRepId = message.mentions.users.first().id + " posrep"

            if(repFileStorage[negativeRepId] == undefined) {
                message.channel.send("They do not have any negative rep")
            } else {
                message.channel.send("Negative Rep: " + repFileStorage[negativeRepId][0])
            }

            if(repFileStorage[positiveRepId] == undefined) {
                message.channel.send("They do not have any positive rep")
            } else {
                message.channel.send("Positive Rep: " + repFileStorage[positiveRepId][0])
            }
            break
        default:
            message.channel.send("Not a valid command")
            break
    }
})

bot.on("ready", () => {
    console.log("ready fredy!")
})

bot.login("NzA2ODU0Njg1ODY4NDI1MzI2.XrATwA.9qKXVyaD9Y42G9R06ptdtod5X18")