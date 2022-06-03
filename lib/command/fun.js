class TicTacToe {
    constructor(playerX = 'x', playerO = 'o') {
        this.playerX = playerX
        this.playerO = playerO
        this._currentTurn = false
        this._x = 0
        this._o = 0
        this.turns = 0
    }

    get board() {
        return this._x | this._o
    }

    get currentTurn() {
        return this._currentTurn ? this.playerO : this.playerX
    }

    get enemyTurn() {
        return this._currentTurn ? this.playerX : this.playerO
    }

    static check(state) {
        for (let combo of [7, 56, 73, 84, 146, 273, 292, 448])
            if ((state & combo) === combo)
                return !0
        return !1
    }

    /**
     * ```js
     * TicTacToe.toBinary(1, 2) // 0b010000000
     * ```
     */
    static toBinary(x = 0, y = 0) {
        if (x < 0 || x > 2 || y < 0 || y > 2) throw new Error('invalid position')
        return 1 << x + (3 * y)
    }

    /**
     * @param player `0` is `X`, `1` is `O`
     * 
     * - `-3` `Game Ended`
     * - `-2` `Invalid`
     * - `-1` `Invalid Position`
     * - ` 0` `Position Occupied`
     * - ` 1` `Sucess`
     * @returns {-3|-2|-1|0|1}
     */
    turn(player = 0, x = 0, y) {
        if (this.board === 511) return -3
        let pos = 0
        if (y == null) {
            if (x < 0 || x > 8) return -1
            pos = 1 << x
        } else {
            if (x < 0 || x > 2 || y < 0 || y > 2) return -1
            pos = TicTacToe.toBinary(x, y)
        }
        if (this._currentTurn ^ player) return -2
        if (this.board & pos) return 0
        this[this._currentTurn ? '_o' : '_x'] |= pos
        this._currentTurn = !this._currentTurn
        this.turns++
        return 1
    }

    /**
     * @returns {('X'|'O'|1|2|3|4|5|6|7|8|9)[]}
     */
    static render(boardX = 0, boardO = 0) {
        let x = parseInt(boardX.toString(2), 4)
        let y = parseInt(boardO.toString(2), 4) * 2
        return [...(x + y).toString(4).padStart(9, '0')].reverse().map((value, index) => value == 1 ? 'X' : value == 2 ? 'O' : ++index)
    }
    
    /**
     * @returns {('X'|'O'|1|2|3|4|5|6|7|8|9)[]}
     */
    render() {
        return TicTacToe.render(this._x, this._o)
    }

    get winner() {
        let x = TicTacToe.check(this._x)
        let o = TicTacToe.check(this._o)
        return x ? this.playerX : o ? this.playerO : false
    }
}

new TicTacToe().turn

module.exports = TicTacToe
client.game = client.game ? client.game : {};

let debugMode = !1;

cmd.on(
  "dare",
  ["dare"],
  ["fun"],
  async (msg, { command, client }) => {
    res = await functions.axios.get(
      botinfo.linkApi.zacros + `/randomtext/dare`
    );
    anu = res.data.result;
    return client.sendText(msg.from, `Dare\n\n${anu}`, msg);
  },
  { usedPrefix: true }
);

cmd.on(
  "truth",
  ["truth"],
  ["fun"],
  async (msg, { command, client }) => {
    res = await functions.axios.get(
      botinfo.linkApi.zacros + `/randomtext/truth`
    );
    anu = res.data.result;
    return client.sendText(msg.from, `Truth\n\n${anu}`, msg);
  },
  { usedPrefix: true }
);

cmd.on(
  "bisakah",
  ["bisakah"],
  ["fun"],
  async (msg, { query, client }) => {
    let a = ["Tidak Bisa", "Bisa", "Ya Gatau", "Mungkin Saja", "Coba Ulangi"];
    let b = functions.randomize(a);
    return client.sendText(msg.from, `Bisakah ${query}\n\nJawaban : ${b}`);
  },
  { query: "Masukkan Query", param: functions.needed("query") }
);

cmd.on(
  "kapankah",
  ["kapankah"],
  ["fun"],
  async (msg, { query, client }) => {
    let a = [
      "Hari",
      "Minggu",
      "Abad",
      "Detik",
      "Menit",
      "Jam",
      "Hari",
      "Tahun",
      "Dekade",
    ];
    let b = functions.randomize(a);
    let c = functions.randomize(100);
    return client.sendText(
      msg.from,
      `Kapankah ${query}\n\nJawaban : ${c} ${b} Lagi`
    );
  },
  { query: "Masukkan Query", param: functions.needed("query") }
);

cmd.on(
  "howgay",
  ["howgay"],
  ["fun"],
  async (msg, { query, client }) => {
    let a = functions.randomize(100);
    let b = "How gay " + query + "\n" + query + " is " + a + "% Gay";
    return client.sendText(msg.from, b);
  },
  { query: "Masukkan query!", param: functions.needed("query") }
);

cmd.on(
  "howbucin",
  ["howbucin"],
  ["fun"],
  async (msg, { query, client }) => {
    let a = functions.randomize(100);
    let b = "How bucin " + query + "\n" + query + " is " + a + "% Bucin";
    return client.sendText(msg.from, b);
  },
  { query: "Masukkan query!", param: functions.needed("query") }
);

cmd.on(
  "howstress",
  ["howstress"],
  ["fun"],
  async (msg, { query, client }) => {
    let a = functions.randomize(100);
    let b = "How Stress " + query + "\n" + query + " is " + a + "% Stress";
    return client.sendText(msg.from, b);
  },
  { query: "Masukkan query!", param: functions.needed("query") }
);

cmd.on(
  "TicTacToe",
  ["tictactoe", "ttt"],
  ["fun"],
  async (m, { usedPref, query, command }) => {
    if (
      Object.values(client.game).find(
        (room) =>
          room.id.startsWith("tictactoe") &&
          [room.game.playerX, room.game.playerO].includes(m.sender.jid)
      )
    )
      return client.reply(m, "Kamu masih didalam game");
    let room = Object.values(client.game).find(
      (room) => room.state === "WAITING" && (query ? room.name === query : true)
    );
    // m.reply('[WIP Feature]')
    if (room) {
      client.reply(m, "Partner ditemukan!");
      room.o = m.from;
      room.game.playerO = m.sender.jid;
      room.state = "PLAYING";
      let arr = room.game.render().map((v) => {
        return {
          X: "❌",
          O: "⭕",
          1: "1️⃣",
          2: "2️⃣",
          3: "3️⃣",
          4: "4️⃣",
          5: "5️⃣",
          6: "6️⃣",
          7: "7️⃣",
          8: "8️⃣",
          9: "9️⃣",
        }[v];
      });
      let str = `
Room ID: ${room.id}
${arr.slice(0, 3).join("")}
${arr.slice(3, 6).join("")}
${arr.slice(6).join("")}
Menunggu @${room.game.currentTurn.split("@")[0]}
Ketik *nyerah* untuk nyerah
`.trim();
      if (room.x !== room.o)
        client.reply(m, str, {
          contextInfo: {
            mentionedJid: client.getMentionedJidList(str),
          },
        });
      client.reply(m, str, {
        contextInfo: {
          mentionedJid: client.getMentionedJidList(str),
        },
      });
    } else {
      room = {
        id: "tictactoe-" + +new Date(),
        x: m.from,
        o: "",
        game: new TicTacToe(m.sender.jid, "o"),
        state: "WAITING",
      };
      if (query) room.name = query;
      client.reply(
        m,
        "Menunggu partner" +
          (query
            ? `mengetik command dibawah ini
${usedPref}${command} ${query}`
            : "")
      );
      client.game[room.id] = room;
    }
  },
  { param: functions.optional("Custom room name"), group: true }
);

cmd.before("tictactoe", async (m) => {
  let ok;
  let isWin = !1;
  let isTie = !1;
  let isSurrender = !1;
  let bantuan = typeof m.string === "string" ? m.string.toLowerCase() : "";
  let room = Object.values(client.game).find(
    (room) =>
      room.id &&
      room.game &&
      room.state &&
      room.id.startsWith("tictactoe") &&
      [room.game.playerX, room.game.playerO].includes(m.sender.jid) &&
      room.state == "PLAYING"
  );
  if (room) {
    // client.reply(m, `[DEBUG]\n${parseInt(m.text)}`)
    if (!/^([1-9]|(me)?nyerah|surr?ender)$/i.test(bantuan)) return !0;
    isSurrender = !/^[1-9]$/.test(bantuan);
    if (m.sender.jid !== room.game.currentTurn) {
      // nek wayahku
      if (!isSurrender) return !0;
    }
    if (debugMode)
      client.reply(
        m,
        "[DEBUG]\n" +
          require("util").format({
            isSurrender,
            text: bantuan,
          })
      );
    if (
      !isSurrender &&
      1 >
        (ok = room.game.turn(
          m.sender.jid === room.game.playerO,
          parseInt(bantuan) - 1
        ))
    ) {
      client.reply(
        m,
        {
          "-3": "Game telah berakhir",
          "-2": "Invalid",
          "-1": "Posisi Invalid",
          0: "Posisi Invalid",
        }[ok]
      );
      return !0;
    }
    if (m.sender.jid === room.game.winner) isWin = true;
    else if (room.game.board === 511) isTie = true;
    let arr = room.game.render().map((v) => {
      return {
        X: "❌",
        O: "⭕",
        1: "1️⃣",
        2: "2️⃣",
        3: "3️⃣",
        4: "4️⃣",
        5: "5️⃣",
        6: "6️⃣",
        7: "7️⃣",
        8: "8️⃣",
        9: "9️⃣",
      }[v];
    });
    if (isSurrender) {
      room.game._currentTurn = m.sender.jid === room.game.playerX;
      isWin = true;
    }
    let winner = isSurrender ? room.game.currentTurn : room.game.winner;
    let str = `
${arr.slice(0, 3).join("")}
${arr.slice(3, 6).join("")}
${arr.slice(6).join("")}
${
  isWin
    ? `@${winner.split("@")[0]} Menang!`
    : isTie
    ? `Game berakhir !`
    : `Giliran ${["❌", "⭕"][1 * room.game._currentTurn]} (@${
        room.game.currentTurn.split("@")[0]
      })`
}
❌: @${room.game.playerX.split("@")[0]}
⭕: @${room.game.playerO.split("@")[0]}
Ketik *nyerah* untuk nyerah
Room ID: ${room.id}
`.trim();
    //let users = global.db.data.users
    if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.from)
      room[room.game._currentTurn ^ isSurrender ? "x" : "o"] = m.from;
    if (room.x !== room.o)
      client.reply(m, str, {
        contextInfo: {
          mentionedJid: client.getMentionedJidList(str),
        },
      });
    client.reply(m, str, {
      contextInfo: {
        mentionedJid: client.getMentionedJidList(str),
      },
    });
    if (isTie || isWin) {
      if (debugMode)
        client.reply(m, "[DEBUG]\n" + require("util").format(room));
      delete client.game[room.id];
    }
  }
  return !0;
});
