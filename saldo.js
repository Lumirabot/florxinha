const Database = require("easy-json-database");
const db = new Database("florxita_economia.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "saldo",
  description: "Veja seu saldo ou o de outro usuário.",
  async execute(message) {
    const user = message.mentions.users.first() || message.author;
    const saldo = db.get(`money_${user.id}`) || 0;

    const embed = new EmbedBuilder()
      .setTitle("💰 Saldo Florxita")
      .setDescription(`${user.username} possui **${saldo}** florcoins.`)
      .setColor("Gold");

    message.reply({ embeds: [embed] });
  },
};