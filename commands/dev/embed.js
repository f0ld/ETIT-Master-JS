const config = require("../../privateData/config.json");
var discord = require('discord.js');


var customEmbed;
var color = "#7289da"
var title = "undefinedTitle";
var listOfParameters = ["_title", "_color", "_author"];

exports.run = (client, message, args) => {
    if (haveCommonElement(config.ids.moderatorRoles, message.member._roles) == false) return message.reply('You do not have the permissions to perform that command.');

    var content = message.content;
    if (customEmbed == undefined) {
        customEmbed = initialEmbed(client);
    }


    //check if a parameter is set multiple times
    for (argument in args) {
        if (countInArray(args, args[argument]) > 1) {
            return message.channel.send(`🛡️Please provide each parameter only once!\n **${args[argument]}** was set ${countInArray(args, args[argument])}x.`);
        }
    }

    if (args.includes("_title")) {
        var startOfTitleArguments = (args.indexOf("_title") + 1);
        //-1 if no other parameter is in the message
        if ((getNextParameter(listOfParameters, "_title", args)) == -1) {
            var tempArgs = args.slice(startOfTitleArguments);
            if (tempArgs == "") {
                return message.channel.send("Please provide parameters for the title");
            }
            title = " "; //clear tile

            tempArgs.forEach(function (item, index) {
                title += item + " ";
            });
        }


        if ((getNextParameter(listOfParameters, "_title", args) > 0)) {
            var endOfTitleArguments = getNextParameter(listOfParameters, "_title", args);
            var tempArgs = args.slice(startOfTitleArguments, endOfTitleArguments);
            if (tempArgs == "") {
                return message.channel.send("Please provide parameters for the title");
            }

            title = ""; //clear tile
            tempArgs.forEach(function (item, index) {
                title += item + " ";
            });
        }

        if (title != undefined) {
            customEmbed.setTitle(title);
        } else {
            customEmbed.setTitle("undefinedTitle");
            message.channel.send("Title was not defined correctly")
        }
    }

    if (args.includes("_color")) {
        var positionOfColorArgument = args.indexOf("_color");
        color = args[positionOfColorArgument + 1];
        customEmbed.setColor(color.toUpperCase());
    }

    if (args.includes("_author")) {
        var positionOfAuthorArgument = args.indexOf("_author");
        author = args[positionOfAuthorArgument + 1];
        customEmbed.setAuthor(author);
    }


    client.channels.cache.get('770276625040146463').send(customEmbed); //sends login embed to channel
}

function initialEmbed(client) {
    var author = client.user.tag;
    var thumbnail = client.guilds.resolve(config.ids.serverID).members.resolve(config.ids.userID.botUserID).user.avatarURL();
    var footer = `[ID] ${config.ids.userID.botUserID}`;



    const customEmbed = new discord.MessageEmbed() //Login Embed
        .setColor(color)
        .setAuthor(author, 'https://www.iconsdb.com/icons/preview/orange/code-xxl.png')
        .setTitle(title)
        .setThumbnail(thumbnail)
        .setFooter(footer, 'https://image.flaticon.com/icons/png/512/888/888879.png');

    return customEmbed
}

function getNextParameter(listOfParameters, currentParameter, args) {
    for (parameter in listOfParameters) {
        if (listOfParameters[parameter] != currentParameter) {
            var indexOfNextParameter = args.indexOf(listOfParameters[parameter])
            //indexOf returns -1 if value is not found in array
            if (indexOfNextParameter != -1) {
                return indexOfNextParameter
            }
        }
    }
    return -1
}

function haveCommonElement(object, array) {
    for (entry in object) {
        if (array.includes(object[entry])) {
            return true;
        }
    }
    return false;
}

function countInArray(array, what) {
    return array.filter(item => item == what).length;
}