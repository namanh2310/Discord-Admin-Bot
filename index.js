const {
  Client,
  ActivityType,
  GatewayIntentBits,
  EmbedBuilder,
  Collection,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});
client.commands = new Collection();
client.aliases = new Collection();

const axios = require("axios");
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
  getAvt: function (message, member) {
    if (message.content.toLowerCase() == "avatar") {
      const avatarEmbeded = new EmbedBuilder().setImage(member.avatarURL());
      message.reply({ embeds: [avatarEmbeded] });
    }
  },
  getAIBot: async function (message) {
    if (message.author.bot) return;
    if (message.channel.id === "1051776316921352192") {
      try {
        const res = await axios.get(`
      http://api.brainshop.ai/get?bid=171113&key=nKUirLX72OrdEcbl&uid=1&msg=${encodeURIComponent(
        message.content
      )}`);
        message.content == "delete"
          ? message.channel.send("deleting...")
          : message.channel.send(res.data.cnt);
      } catch {
        message.channel.send("Error");
      }
    } else return;
  },
  getDelete: function (message, Messages) {
    if (message.content.toLowerCase() == "delete") {
      Messages.forEach((msg) => {
        if (msg) msg.delete();
      });
    }
  },
};

client.on("ready", () => {
  console.log(`${client.user.username} đã sẵn sàng thị tẩm! `);

  client.user.setPresence({
    activities: [{ name: "nước mắt...", type: ActivityType.Listening }],
    status: "idle",
  });
});

client.on("messageCreate", async (message) => {
  //constant
  const member = message.mentions.users.first() || message.author;
  const Channel = message.channel;
  const Messages = await Channel.messages.fetch({ limit: 100 });

  //interaction
  interact.getMessage(message);
  interact.getPing(message);
  interact.getAvt(message, member);
  interact.getAIBot(message);
  interact.getDelete(message, Messages);
});

client.login(token);
