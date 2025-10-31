const Database = require("easy-json-database");
const db = new Database("florxita_economia.json");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "trabalhar",
  description: "Trabalhe e ganhe moedas!",
  async execute(message) {
    const user = message.author;
    const lastWork = db.get(`lastWork_${user.id}`) || 0;
    const cooldown = 1000 * 60 * 5; // 5 minutos

    if (Date.now() - lastWork < cooldown)
      return message.reply("⏰ Espere 5 minutos antes de trabalhar novamente!");

    const ganho = Math.floor(Math.random() * 200) + 50;
    db.add(`money_${user.id}`, ganho);
    db.set(`lastWork_${user.id}`, Date.now());

    const embed = new EmbedBuilder()
      .setTitle("💼 Trabalho Concluído!")
      .setDescription(`Você trabalhou e ganhou **${ganho}** florcoins!`)
      .setColor("Green");

    message.reply({ embeds: [embed] });
  },
};