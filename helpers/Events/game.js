let ghurl = "https://raw.githubusercontent.com/Rifza123/lib/refs/heads"

let raw = {
  tebakgambar: ghurl + "/main/db/game/tebakgambar.json",
  susunkata: ghurl + "/main/db/game/susunkata.json",
  family100: ghurl + "/main/db/game/family100.json",
  
}

let { Chess } = await (fol[2]+'chess.js').r()
const chess = new Chess();

let exif = await (fol[0] + 'exif.js').r()

global.timeouts = global.timeouts || {}
cfg.hadiah = cfg.hadiah || {

 /* Set hadiah bukan disini tapi di config.json ya
   ini buat antisipasi aja kalo belum update config.json
 */
   
  tebakgambar: 35,
  susunkata: 25,
  family100: 75
}

export default 
async function on({Exp, cht, ev }) {
    const { id } = cht
    const { func } = Exp
    let { archiveMemories:memories, parseTimeString, clearSessionConfess, findSenderCodeConfess, formatDuration } = func
    
    function setQCmd(__id, players, emit){
      for(let { id:_id } of players){
        let qcmds = memories.getItem(_id+from.sender, "quotedQuestionCmd") ||{}
           qcmds[__id] = {
             emit,
             exp: Date.now() + 60000 * 4,
             accepts: []
           }
        memories.setItem(_id+from.sender, "quotedQuestionCmd", qcmds)
      }
    }
              
    let metadata = Data.preferences[id]
    let game = metadata?.game || false
    if(game){
      let isEnd = Date.now() >= game.endTime
      if(isEnd) delete metadata.game
    }
    
    let hasGame = game ? `*There are still active games here!*

- Game: ${game.type}
- Start Time: ${func.dateFormatter(game.startTime, "Asia/Jakarta")}
- End Time: ${func.dateFormatter(game.endTime, "Asia/Jakarta")}
- Creator: @${game.creator.id.split("@")[0]}
- Creator Name: ${game.creator.name}

To start a new game:
_Wait for the game to end or you can type .cleargame or .surrender_
` : ""

    ev.on({
        cmd: ["tebakgambar"],
        listmenu: ["tebakgambar"],
        tag: "game",
        energy: 10
    }, async () => {
      cfg.hadiah[cht.cmd] = cfg.hadiah[cht.cmd] || 100
      if("game" in metadata) return cht.reply(hasGame)
      let maxAge = 60000
      Data[cht.cmd] = Data[cht.cmd] || await fetch(raw[cht.cmd]).then(a => a.json())
      let { img:url, answer, desc } = Data[cht.cmd].getRandom()
      metadata.game = {
        type: cht.cmd,
        startTime: Date.now(),
        endTime: Date.now() + maxAge,
        answer,
        energy: cfg.hadiah[cht.cmd],
        creator: {
          name: cht.pushName,
          id: cht.sender
        },
        id_message: []
      }
      let _key = keys[cht.sender]
      await cht.edit("Starting game...", _key)
      let formatDur = func.formatDuration(maxAge)
      let caption = `*Guess the Picture*

What is the answer to this question

Hint: ${desc}

Time to answer: ${formatDur.minutes}minutes ${formatDur.seconds}seconds
End Time: ${func.dateFormatter(metadata.game.endTime, "Asia/Jakarta")}

Hadiah: ${cfg.hadiah[cht.cmd]} Energy⚡

*Reply the game message to answer*
> (Starting from this message)
`
      let { key } = await Exp.sendMessage(id, { image: { url }, caption }, { quoted: cht })
      metadata.game.id_message.push(key.id)
      metadata.game.key = key
      global.timeouts[id] = setTimeout(async()=> {
        delete Data.preferences[id].game
        delete global.timeouts[id]

        await cht.reply(`*TIMES'S UP*

Answer: ${answer}`)
      Exp.sendMessage(cht.id, { delete: key })
      }, maxAge)
    });
    
    ev.on({
        cmd: ["susunkata"],
        listmenu: ["susunkata"],
        tag: "game",
        energy: 10
    }, async () => {
      cfg.hadiah[cht.cmd] = cfg.hadiah[cht.cmd] || 100
      if("game" in metadata) return cht.reply(hasGame)
      let maxAge = 60000
      Data[cht.cmd] = Data[cht.cmd] || await fetch(raw[cht.cmd]).then(a => a.json())
      let { type, question, answer } = Data[cht.cmd].getRandom()
      metadata.game = {
        type: cht.cmd,
        startTime: Date.now(),
        endTime: Date.now() + maxAge,
        answer,
        energy: cfg.hadiah[cht.cmd],
        creator: {
          name: cht.pushName,
          id: cht.sender
        },
        id_message: []
      }

      let _key = keys[cht.sender]
      await cht.edit("Starting game...", _key)
      let formatDur = func.formatDuration(maxAge)
      let text = `*SUSUN KATA*

Susun ini menjadi kata yang benar

Tipe: ${type}
Kata: ${question}

Answering time: ${formatDur.minutes}minutes ${formatDur.seconds}seconds
End Time: ${func.dateFormatter(metadata.game.endTime, "Asia/Jakarta")}

Hadiah: ${cfg.hadiah[cht.cmd]} Energy⚡

*Reply the game message to answer*
> (Starting from this message)
`
      let { key } = await Exp.sendMessage(id, { text }, { quoted: cht })
      metadata.game.id_message.push(key.id)
      metadata.game.key = key
      global.timeouts[id] = setTimeout(async()=> {
        delete Data.preferences[id].game
        delete global.timeouts[id]

        await cht.reply(`*TIMES'S UP*

Answer: ${answer}`)
      Exp.sendMessage(cht.id, { delete: key })
      }, maxAge)
    });
    
    ev.on({
        cmd: ["family100"],
        listmenu: ["family100"],
        tag: "game",
        energy: 10
    }, async () => {
      cfg.hadiah[cht.cmd] = cfg.hadiah[cht.cmd] || 100
      if("game" in metadata) return cht.reply(hasGame)
      let maxAge = 60000 * 5
      Data[cht.cmd] = Data[cht.cmd] || await fetch(raw[cht.cmd]).then(a => a.json())
      let { question, answer } = Data[cht.cmd].getRandom()
      metadata.game = {
        type: cht.cmd,
        startTime: Date.now(),
        endTime: Date.now() + maxAge,
        question,
        answer,
        answered: {},
        energy: cfg.hadiah[cht.cmd],
        creator: {
          name: cht.pushName,
          id: cht.sender
        },
        id_message: []
      }

      let _key = keys[cht.sender]
      await cht.edit("Starting game...", _key)
      let formatDur = func.formatDuration(maxAge)
      let text = `*FAMILY 100*

Question: *${question}*

Answer:
${answer.map((item, index) => `${index + 1}. ?? ${index == 0 ? "\`TOP SURVEY\`" : ''}`).join("\n")}

Answering time: ${formatDur.minutes}minutes ${formatDur.seconds}seconds
End Time: ${func.dateFormatter(metadata.game.endTime, "Asia/Jakarta")}

Hadiah:
${answer.map((item, index) => `${index + 1}. ${index == 0 ? "\`TOP SURVEY\`" : ''} ?? Energy⚡`).join("\n")}

*Reply the game message to answer*
> (Starting from this message)

`
      let { key } = await Exp.sendMessage(id, { text }, { quoted: cht })
      metadata.game.id_message.push(key.id)
      metadata.game.key = key
      global.timeouts[id] = setTimeout(async()=> {
        delete Data.preferences[id].game
        delete global.timeouts[id]

        await cht.reply(`*TIMES'S UP*

Answer: 
${answer.map((item, index) => `${index + 1}. ${item} ${index == 0 ? "\`TOP SURVEY\`" : ''} (${((cfg.hadiah[cht.cmd] * (index == 0 ? 1 : 1.5)) / (index + 1)).toFixed()} Energy⚡)`).join("\n")}
`)
        let { answered } = Data.preferences[id].game
        let answeredKey = Object.keys(answered)
        await sleep(1000)
        await Exp.sendMessage(cht.id, { delete: key })
        await sleep(1000)
        if(answeredKey.length > 0){
          await cht.reply("Distribute all the prizes earned....🎁")
          Object.entries(answered).forEach(async([_,___]) => {
            let idx = answer.findIndex(item => item == _)
            let gift = ((cfg.hadiah[type] * (idx === 0 ? 1 : 1.5)) / (idx + 1)).toFixed()
            await func.archiveMemories["addEnergy"](__, gift)
          })
        }
      }, maxAge)
    });
    
    ev.on({
        cmd: ["cleargame"],
        listmenu: ["cleargame"],
        tag: "game"
    }, async () => {
      if((!"game" in metadata)) return cht.reply("There is no active game here!")
      await Exp.sendMessage(cht.id, { delete: metadata.game.key })
      clearTimeout(global.timeouts[id])
      delete metadata.game
      delete global.timeouts[id]
      cht.reply("Success✅")
    })
    
    ev.on({
        cmd: ["nyerah"],
        listmenu: ["nyerah"],
        tag: "game"
    }, async () => {
      if((!"game" in metadata)) return cht.reply("There is no active game here!")
      if(cht.sender !== game.creator.id) return cht.reply("Only the game creator can perform this action!")
      await Exp.sendMessage(cht.id, { delete: metadata.game.key })
      clearTimeout(global.timeouts[id])
      cht.reply(`*You gave up!*
Answer: 
${Array.isArray(game.answer) ? game.answer.map((item, index) => `${index + 1}. ${item} ${index == 0 ? "\`TOP SURVEY\`" : ''} (${((cfg.hadiah[game.type] * (index == 0 ? 1 : 1.5)) / (index + 1)).toFixed()} Energy⚡)`).join("\n") : game.answer}`)
      delete metadata.game
      delete global.timeouts[id]
    })
    

    ev.on({
      cmd: ['chess'],
      listmenu: ['chess ♟️'],
      tag: 'game',
      //  energy: 35, opsional
    }, async ({ args }) => {
      let _id1;
      const senderNumber = cht.sender.split('@')[0];
      const [action, param1] = (args || '').split(' ', 2);
      const chatId = cht.id;
      
      let games = Data.preferences[cht.id]?.chess || {}
      /*
          [ '––『CREDIT THANKS TO』––' ]
          ┊ALLAH S.W.T.
          ┊OMEGATECH
          ┊Penyedia Modul
          ❏═•═━〈 SORRY WATERMARK
          ┊sorry ada watermark
          ┊donasi ovo/dana: ┊23234675912 (Omega)
          ┊wa: 23234675912 (Omega)
          ┊Feature requests are also welcome
          ┊Make buy side dishes and rice hehe
          ┊
          ┊Excuse me, bro, hehe.
          ┊  ###By: Omega Tech
          ┗–––––––––––––––––––––––––✦
        */
      if (!action) {
        return cht.reply(
          '❌ Use the following command:\n' +
          '• `.chess create <room>` - Create a new game\n' +
          '• `.chess join <room>` - Join game\n' +
          '• `.chess start <room>` - Mulai game\n' +
          '• `.chess move <from>to<to>` - Lakukan langkah (Example: e2>e4)\n' +
          '• `.chess delete <room>` - Hapus game\n' +
          '• `.chess help` - Bantuan perintah'
        );
      }
  
      if (action === 'help') {
        return cht.reply(
          '🌟 *Chess Game Commands:*\n\n' +
          '*chess create <room>* - Mulai permainan catur\n' +
          '*chess join <room>* - Bergabung dengan permainan\n' +
          '*chess start <room>* - Memulai permainan setelah 2 pemain bergabung\n' +
          '*chess move <from>to<to>* - Melakukan langkah (Example: e2>e4)\n' +
          '*chess delete <room>* - Menghapus permainan\n\n' +
          '*Example:* \n' +
          '`chess create OmegaRoom` - Membuat room bernama OmegaRoom\n' +
          '`chess move e2 e4` - Melakukan langkah e2 ke e4'
        );
      }
  
      if (action === 'create') {
        if (!param1) return cht.reply('❌ Harap Enter the room name. Example: `.chess create OmegaRoom`.');
        if (param1 in games) return cht.reply('❌ Room sudah ada. Pilih nama lain.');
  
        games[param1] = {
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          players: [{ id: senderNumber, color: 'white' }],
          turn: 'white',
        };
      
        Data.preferences[cht.id].chess = games;
        return cht.reply(`✅ Room "${param1}" berhasil dibuat!\nAnda berada di room ini sebagai Putih`);
      }

      if (action === 'join') {
        if (!param1) return cht.reply('❌ Enter the room name. Example: `.chess join OmegaRoom`.');
        if (!games[param1]) return cht.reply('❌ Room tidak ditemukan.');
        if (games[param1].players.length >= 2) return cht.reply('⚠️ Room sudah penuh.');
        if (games[param1].players.some(a => a.id.includes(senderNumber))) return cht.reply("Anda sudah join room ini!")
        games[param1].players.push({ id: senderNumber, color: 'black' });
        games[param1].players = [...new Map(games[param1].players.map(item => [item.id, item])).values()]
        Data.preferences[cht.id].chess = games;
        return cht.reply(`✅ Anda bergabung di room "${param1}" sebagai Hitam.`);
      }

      if (action === 'start') {
        if (!param1) return cht.reply('❌ Enter the room name. Example: `.chess start OmegaRoom`.');
        const room = games[param1];
        if (!room) return cht.reply('❌ Room tidak ditemukan.');
        if (room.players.length < 2) return cht.reply('⚠️ Butuh dua pemain untuk memulai game.');

        const boardUrl = `https://chessboardimage.com/${room.fen}.png`;
        let { key: key1 } = await Exp.sendMessage(cht.id, {
          image: { url: boardUrl },
          caption: `🎲 Permainan dimulai! Turn: ${room.turn.toUpperCase()}`
        });
        setQCmd(key1.id, room.players, `${cht.cmd} move`)
        return;
      }
      

      if (action === 'move') {
        const [_, from, to, promotion] = args.toLowerCase().split(/\s+/); // buat promosi 🗿(e.g. e7 e8 q)
    
   
        if (!from || !to) {
          let { key: key1 } = await cht.reply(
              '❌ Format salah. Example penggunaan:\n' +
              '• `.chess move e2 e4` - Langkah biasa\n' +
              '• `.chess move e7 e8 q` - Promosi pion ke ratu'
          )
          return setQCmd(key1.id, [{ id: cht.sender.split("@")[0] }], `${cht.cmd} move`)
          
        }

        const senderNumber = cht.sender.split('@')[0];

        const roomName = Object.keys(games).find(r => 
          games[r].players.some(p => p.id === senderNumber)
        );
    
        if (!roomName) {
          let { key:key1 } = await cht.reply('❌ You have not joined the game yetn!');
          return setQCmd(key1.id, [{ id: cht.sender.split("@")[0] }], `${cht.cmd} move`)
        }

        const room = games[roomName];

        try {
        
          chess.load(room.fen);
        } catch (error) {
       
          room.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
          Data.preferences[cht.id].chess = games;
          return cht.reply('⚠️ Permainan direset ke posisi awal karena error!');
        }

  
        const player = room.players.find(p => p.id === senderNumber);
        if (!player) {
          return cht.reply('❌ You are not a participant in this game!');
        }
    
        if (player.color !== room.turn) {
          let { key:key1 } = await cht.reply(`⏳ It's not your turn! It's someone else's turn ${room.turn.toUpperCase()}`);
          return setQCmd(key1.id, [{ id: cht.sender.split("@")[0] }], `${cht.cmd} move`)
        }

  
        try {
          const moveOptions = { from, to };
          if (promotion) moveOptions.promotion = promotion[0].toLowerCase();
        
          const move = chess.move(moveOptions);
          if (!move) throw new Error('Langkah tidak valid!');
   
          room.fen = chess.fen();
          room.turn = chess.turn() === 'w' ? 'white' : 'black';
          Data.preferences[cht.id].chess = games;
          // const encodedFEN = room.fen.replace(/ /g, '_');
          const boardUrl = `https://chessboardimage.com/${room.fen}` + (room.turn === 'black' ? '-flip.png' : '.png');
         
          let buff = await func.getBuffer(boardUrl)
  		  let res = await exif["writeExifImg"](buff, {
			packname: 'Chess',
			author: 'Ⓒ' + cht.pushName
		  })
		  let { key:key } = await Exp.sendMessage(id, {
			sticker: {
				url: res
			}
		  }, {
			quoted: cht
		  })
		  setQCmd(key.id, [{ id: cht.sender.split("@")[0] }], `${cht.cmd} move`)
          let { key: key1 } = await cht.reply(`✅ Berhasil pindah ${from}➡️${to}\nTurn ${room.turn.toUpperCase()}`)
          return setQCmd(key1.id, [{ id: cht.sender.split("@")[0] }], `${cht.cmd} move`)
          /* 
           ### KALO MAU DIUBAH KE IMAGE ###
           await Exp.sendMessage(chatId, {
             image: { url: boardUrl},
             caption: `✅ Berhasil pindah ${from}→${to}\nTurn ${room.turn.toUpperCase()}`
           });
          */
          if (chess.isCheckmate()) {
            delete games[roomName];
            Data.preferences[cht.id].chess = games;
            return cht.reply(`🏆 SKAKMAT! Pewin: ${player.color.toUpperCase()}`);
          }
        
          if (chess.isDraw()) {
           delete games[roomName];
           Data.preferences[cht.id].chess = games;
           return cht.reply('🤝 PERMAINAN BERAKHIR REMIS!');
          }

        } catch (error) {
          // Detailed error messages
          let errorMessage = `❌ Gagal: ${error.message}\n`;
        
          if (error.message.includes('invalid square')) {
            errorMessage += 'Format posisi salah (Example: e2)';
          } else if (error.message.includes('invalid move')) {
            errorMessage += 'Langkah tidak sesuai aturan catur';
          } else {
            errorMessage += 'Example: `.chess move e2 e4` atau `.chess move e7 e8 q`';
          }
          let { key:key1 } = await cht.reply(errorMessage);
          return setQCmd(key1.id, [{ id: cht.sender.split("@")[0] }], `${cht.cmd} move`)
       }
    }

    if (action === 'delete') {
      if (!param1) return cht.reply('❌ Enter the room name. Example: `.chess delete OmegaRoom`.');
      if (!games[param1]) return cht.reply('❌ Room tidak ditemukan.');
      if(games[param1].players[0].id !== senderNumber) return cht.reply("Only the room creator can delete the session!")
      delete games[param1];
      Data.preferences[cht.id].chess = games;
      return cht.reply(`✅ Room "${param1}" berhasil dihapus.`);
    }

    return cht.reply('❌ Unknown command. Use .chess help to view the list of commands.');
  });
   
  ev.on({
    cmd: ["sos"],
    //listmenu: ["sos"],
    tag: "game",
    args: `Format: .sos <create/join/leave/theme/move> <room_name>`,
  }, async ({ cht }) => {
    const [action, param1, param2] = (cht.q || "").split(" ");
    const chatId = cht.id;
    const senderNumber = cht.sender.split('@')[0];

    let sessions = Data.preferences[chatId].sos || {}

    function formatBoard(board) {
        return `\n${board[0]} | ${board[1]} | ${board[2]}\n` +
               `---------\n` +
               `${board[3]} | ${board[4]} | ${board[5]}\n` +
               `---------\n` +
               `${board[6]} | ${board[7]} | ${board[8]}\n`;
    }
    
    /* BELUM KELAR!!
          [ '––『CREDIT THANKS TO』––' ]
          ┊ALLAH S.W.T.
          ┊OMEGATECH
          ┊Penyedia Modul
          ❏═•═━〈 SORRY WATERMARK
          ┊sorry ada watermark
          ┊donasi ovo/dana: ┊23234675912 (Omega)
          ┊wa: 23234675912 (Omega)
          ┊Feature requests are also welcome
          ┊Make buy side dishes and rice hehe
          ┊
          ┊Excuse me, bro, hehe.
          ┊  ###By: Omega Tech
          ┗–––––––––––––––––––––––––✦
        */

    function checkGameStatus(board) {
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Baris
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolom
            [0, 4, 8], [2, 4, 6],           // Diagonal
        ];

        for (const condition of winConditions) {
            const [a, b, c] = condition;
            if (board[a] === board[b] && board[b] === board[c]) {
                return "win";
            }
        }
        if (!board.some(cell => typeof cell === "number")) {
            return "draw";
        }
        return "ongoing";
    }

    if (!action) {
        return cht.reply(
            "❌ Use the following command:\n" +
            "• `.sos create <room>` - Create a new game\n" +
            "• `.sos join <room>` - Join game\n" +
            "• `.sos leave` - Leave the game\n" +
            "• `.sos theme <1/2/3>` - Pilih tema simbol\n" +
            "• `.sos move <posisi>` - Letakkan simbol"
        );
    }

    if (action === "theme") {
        if (!param1 || !["1", "2", "3"].includes(param1)) {
            return cht.reply(
                "❌ Harap pilih tema dengan angka 1, 2, atau 3. Example: `.sos theme 1`.\n" +
                "Tema yang tersedia:\n" +
                "1. 🧿(1) 👾(2)\n2. 🐱(1) 🐶(2)\n3. 🌋(1) 🏔️(2)"
            );
        }

        const themes = {
            1: ["🧿", "👾"],
            2: ["🐱", "🐶"],
            3: ["🌋", "🏔️"],
        };
        
        sessions.theme = themes[param1];
        Data.preferences[chatId].sos = sessions
        return cht.reply(`✅ Tema "${param1}" berhasil dipilih! Simbol: ${themes[param1][0]} (1) & ${themes[param1][1]} (2).`);
    }

    if (action === "create") {
        if (!param1) return cht.reply("❌ Harap Enter the room name. Example: `.sos create OmegaRoom`.");
        if (sessions[param1]) return cht.reply("❌ Room sudah ada. Pilih nama lain.");

        const symbols = sessions.theme || ["⭕", "❌"];
        sessions[param1] = {
            board: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            players: [{ id: senderNumber, symbol: symbols[0] }],
            turn: symbols[0],
        };
        Data.preferences[chatId].sos = sessions
        return cht.reply(`✅ Room "${param1}" berhasil dibuat!`);
    }

    if (action === "join") {
        if (!param1) return cht.reply("❌ Enter the room name. Example: `.sos join OmegaRoom`.");
        if (!sessions[param1]) return cht.reply("❌ Room tidak ditemukan.");
        if (sessions[param1].players.length >= 2) return cht.reply("❌ Room sudah penuh.");

        const symbols = sessions[param1].players[0].symbol === "⭕" ? "❌" : "⭕";
        sessions[param1].players.push({ id: senderNumber, symbol: symbols });
        Data.preferences[chatId].sos = sessions
        let { key: key1 } = await cht.reply(`✅ Anda bergabung dalam room "${param1}"!`);
        return setQCmd(key1.id, [{ id: cht.sender.split("@")[0] }], `${cht.cmd} move`)
    }

    if (action === "leave") {
        const roomName = Object.keys(sessions).find(r => 
            sessions[r].players.some(p => p.id === senderNumber)
        );

        if (!roomName) return cht.reply("❌ You are not in any game.");

        delete sessions[roomName];
        Data.preferences[chatId].sos = sessions
        return cht.reply(`✅ You left the room "${roomName}".`);
    }

    if (action === "move") {
        if (!param1){
          let { key: key1 } = await cht.reply("❌ Enter the number position (1-9). Example: `.sos move 5`.");
          return setQCmd(key1.id, [{ id: cht.sender.split("@")[0] }], `${cht.cmd} move`)
        }
        
        const roomName = Object.keys(sessions).find(r =>
            sessions[r].players.some(p => p.id === senderNumber)
        );

        if (!roomName){
          let { key: key1 } = await cht.reply("❌ You have not joined the game yetn!");
          return setQCmd(key1.id, [{ id: cht.sender.split("@")[0] }], `${cht.cmd} move`)
        }

        const room = sessions[roomName];
        const player = room.players.find(p => p.id === senderNumber);

        if (!player){
          let { key: key1 } = await cht.reply("❌ You are not a participant in this game!");
          return setQCmd(key1.id, [{ id: cht.sender.split("@")[0] }], `${cht.cmd} move`)
        }
        if (room.turn !== player.symbol){
          let { key: key1 } = await cht.reply(`⏳ It's not your turn! It's someone else's turn: ${room.turn}`);
          return setQCmd(key1.id, [{ id: cht.sender.split("@")[0] }], `${cht.cmd} move`)
        }

        const position = parseInt(param1) - 1;
        if (isNaN(position) || position < 0 || position > 8) {
            let { key: key1 } = await cht.reply("❌ Invalid position. Use numbers 1-9.");
            return setQCmd(key1.id, [{ id: cht.sender.split("@")[0] }], `${cht.cmd} move`)
        }

        if (typeof room.board[position] !== "number") {
            let { key: key1 } = await cht.reply("❌ The position is already occupied. Choose another spot.");
            return setQCmd(key1.id, [{ id: cht.sender.split("@")[0] }], `${cht.cmd} move`)
        }

        room.board[position] = player.symbol;
        room.turn = player.symbol === "⭕" ? "❌" : "⭕";
        
        const status = checkGameStatus(room.board);

        let boardText = `🎲 *Game Board:*\n${formatBoard(room.board)}`;
        
        if (status === "win") {
            delete sessions[roomName];
            return cht.reply(`🏆 *${player.symbol} win!*\n${boardText}`);
        } else if (status === "draw") {
            delete sessions[roomName];
            return cht.reply(`🤝 Draw Game!\n${boardText}`);
        }
        Data.preferences[chatId].sos[roomName] = room
        return cht.reply(`${boardText}\nTurn: ${room.turn}`);
    }

    return cht.reply("❌ Unknown command. Use .sos help to see the list of commands.");
});
}