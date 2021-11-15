import { Message, MessageEmbed } from 'discord.js'
import { DiscordClient } from '../../types/customTypes'

exports.name = 'antwortaufalles'

exports.description = 'Was ist die Antwort auf alles?'

exports.usage = 'antwortaufalles'

exports.run = (client: DiscordClient, message: Message) =>
  client.commandReplyPromise(message, {
    embeds: [
      new MessageEmbed().setDescription(
        'Die Antwort auf die Frage nach dem Leben, dem Universum und dem ganzen Rest ist :four::two:',
      ),
    ],
  })
