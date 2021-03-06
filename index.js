"use strict";
exports.__esModule = true;
var discord_js_1 = require("discord.js");
var client = new discord_js_1.Client();
var del = {};
client.on('ready', function () {
    console.log("del bot online");
    client.user.setActivity({
        type: "WATCHING",
        name: "for del help"
    });
});
client.on('message', function (msg) {
    var _a, _b, _c;
    // console.log(del[msg.guild.id] && del[msg.guild.id].some((data) => data.client == msg.author.id && data.text_channel == msg.channel.id), del)
    if (msg.author.username == client.user.username)
        return;
    if (del[msg.guild.id] && del[msg.guild.id].some(function (data) { return data.client == msg.author.id && data.text_channel == msg.channel.id; }))
        msg["delete"]({ timeout: 1000, reason: "user is blacklisted in this channel" });
    try {
        if (msg.content == "del help") {
            msg.channel.send({ embed: {
                    color: "#000001",
                    title: "del help",
                    fields: [
                        {
                            name: "del mute [@person] [#text-channel]",
                            value: "mutes the person in a specific text channel.\nExample: \`del mute @Hamziniii #commands\`"
                        },
                        {
                            name: "del unmute [@person]",
                            value: "unmutes the person in all text channels.\nExample: \`del unmute @Hamziniii\`"
                        },
                        {
                            name: "del display",
                            value: "displays all the people who are muted, and which channel they are muted in. \nif you see a bunch of numbers, that person isnt in this server"
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: "Created by: Hamziniii#9746",
                        icon_url: "https://cdn.discordapp.com/avatars/393247221505851412/58db2923311a0d7df0bcc5d04e015303.webp"
                    }
                } });
        }
        else if (msg.content.includes("del mute")) {
            if (!msg.member.permissionsIn(msg.channel).has("ADMINISTRATOR")) {
                msg.reply("no admin = cant use del");
                return;
            }
            var data = msg.content.split("del mute ")[1].split(" ");
            if (del[msg.guild.id] == undefined)
                del[msg.guild.id] = [];
            (_a = del[msg.guild.id]) === null || _a === void 0 ? void 0 : _a.push({ client: data[0].replace("<@!", "").replace(">", ""), text_channel: data[1].replace("<#", "").replace(">", "") });
            msg.channel.send({ embed: {
                    color: "#000001",
                    title: "del unmute",
                    description: "muted " + data[0] + " in " + data[1],
                    timestamp: new Date(),
                    footer: {
                        text: "Created by: Hamziniii#9746",
                        icon_url: "https://cdn.discordapp.com/avatars/393247221505851412/58db2923311a0d7df0bcc5d04e015303.webp"
                    }
                } });
        }
        else if (msg.content.includes("del unmute")) {
            if (!msg.member.permissionsIn(msg.channel).has("ADMINISTRATOR")) {
                msg.reply("no admin = cant use del");
                return;
            }
            var data_1 = msg.content.split("del unmute ")[1].replace("<@!", "").replace(">", "");
            if (del[msg.guild.id])
                del[msg.guild.id] = (_b = del[msg.guild.id]) === null || _b === void 0 ? void 0 : _b.filter(function (d) { return d.client != data_1; });
            msg.channel.send({ embed: {
                    color: "#000001",
                    title: "del unmute",
                    description: "unmuted <@!" + data_1 + ">",
                    timestamp: new Date(),
                    footer: {
                        text: "Created by: Hamziniii#9746",
                        icon_url: "https://cdn.discordapp.com/avatars/393247221505851412/58db2923311a0d7df0bcc5d04e015303.webp"
                    }
                } });
        }
        else if (msg.content == "del display") {
            msg.channel.send({ embed: {
                    color: "#000001",
                    title: "del display",
                    description: "Currently muted:\n" + (((_c = del[msg.guild.id]) === null || _c === void 0 ? void 0 : _c.map(function (d) { return "<@!" + d.client + "> in <#" + d.text_channel + ">"; }).join("\n")) || "none"),
                    timestamp: new Date(),
                    footer: {
                        text: "Created by: Hamziniii#9746",
                        icon_url: "https://cdn.discordapp.com/avatars/393247221505851412/58db2923311a0d7df0bcc5d04e015303.webp"
                    }
                } });
        }
    }
    catch (a) {
        console.log(a);
        return;
    }
});
client.login(process.env.TOKEN);
