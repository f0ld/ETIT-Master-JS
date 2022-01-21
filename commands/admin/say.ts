import { MessageEmbed } from 'discord.js'
import { DiscordClient, DiscordMessage } from '../../types/customTypes'

exports.name = 'say'

exports.description = 'Der Bot sagt, was man ihm sagt, dass er sagen soll, weil er dir nach sagt.'

exports.usage = 'say <messageContent>'

exports.run = (client: DiscordClient, message: DiscordMessage) => {
  /**
   * Check if user has the correct rights to execute the command.
   */
  if (!Object.values(client.config.ids.acceptedAdmins).includes(message.author.id)) {
    return client.reply(message, {
      content: client.translate({ key: 'commands.admin.missingPermission', lng: message.author.language }),
    })
  }

  /**
   * Embed to send back.
   */
  const embed = createEmbed(message, client)

  return message.type === 'REPLY'
    ? client.reply(message, { embeds: [embed] })
    : client.send(message, { embeds: [embed] })
}

/**
 *
 * @param {DiscordMessage} message command Message
 * @param {DiscordClient} client Bot-Client
 * @returns {MessageEmbed} embed with given message.content
 */
function createEmbed(message: DiscordMessage, client: DiscordClient): MessageEmbed {
  const messageContent = message.content.substring(message.content.indexOf(' ') + client.config.prefix.length)

  const embed = new MessageEmbed()
    .setDescription(messageContent === `${client.config.prefix}say` ? '᲼' : messageContent)
    .setColor('RANDOM')

  const messageAttachment = message.attachments.size > 0 ? message.attachments.first().url : null
  embed.setImage(messageAttachment)
  return embed
}
