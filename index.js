const {
  Client,
  ActivityType,
  GatewayIntentBits,
  EmbedBuilder,
} = require("discord.js");

const exampleEmbed = new EmbedBuilder();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

const { token } = require("./config.json");

const messageData = [
  {
    content: "chào",
    response: "chào cái lồn",
  },

  {
    content: "nam anh",
    response: "là người đẹp nhất room này",
  },

  {
    content: "bê đê",
    response: "là loài động vật hạ đẳng",
  },
];

const interact = {
  getMessage: function (message) {
    messageData.map((map) => {
      if (message.content.toLowerCase() == map.content) {
        message.reply(map.response);
      }
    });
  },
  getPing: function (message) {
    if (message.content.toLowerCase() == "ping") {
      message.reply(`${Math.round(client.ws.ping)}ms`);
    }
  },
  // getAvt: function (message) {
  //   const args = message.content.split(" ");
  // },
};

client.on("ready", () => {
  console.log(`${client.user.username} đã sẵn sàng thị tẩm! `);

  client.user.setPresence({
    activities: [{ name: "nước mắt...", type: ActivityType.Listening }],
    status: "idle",
  });
});

client.on("messageCreate", (message) => {
  interact.getMessage(message);
  interact.getPing(message);
  // interact.getAvt(message);
  if (message.content.toLowerCase() == "avatar") {
    // const args = message.content.split(" ");
    const member = message.mentions.users.first() || message.author;
    // const URL = member.user.avatarURL({ size: 1024 });
    const avatarEmbeded = new EmbedBuilder().setImage(member.avatarURL());
    message.reply({ embeds: [avatarEmbeded] });
  }
});

client.login(token);
