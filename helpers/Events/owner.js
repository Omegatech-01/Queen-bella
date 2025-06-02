/*!-======[ Module Imports ]======-!*/
const fs = "fs".import()
const path = "path".import()
const { getContentType, generateWAMessage, STORIES_JID, generateWAMessageFromContent } = "baileys".import()

/*!-======[ Function Imports ]======-!*/
const { TermaiCdn } = await (fol[0] + 'cdn.termai.js').r()

let Lists = {
  audio: Object.keys(Data.audio),
  fquoted: Object.keys(Data.fquoted)
}

const roles = {/*
  Role ini berdasarkan role default dari role.js
  kalo mau ubah ini wajib ubah role.js terlebih dahulu 
*/
  
   "Don't know each other": 0,
   "Just met": 10,
   "Casual friend": 31,
   "Chatting buddy": 51,
   "Gossip buddy": 101,
   "Long-time friend": 151,
   "Hangout friend": 301,
   "Close friend": 351,
   "Intimate friend": 501,
   "Good friend": 651,
   "Best friend": 801,
   "Close best friend": 1351,
   "True best friend": 3201,
   "Boyfriend/Girlfriend": 4551,
   "🎀Soulmate🦋": 10001,
}

let keyroles = Object.keys(roles)

/*!-======[ Default Export Function ]======-!*/
export default async function on({ cht, Exp, store, ev, is }) {

   let infos = Data.infos
   const { func } = Exp
   const { getDirectoriesRecursive } = func
   const { id, sender } = cht
    const options = {
        public: 'mode public',
        autotyping: 'auto typing',
        autoreadsw: 'auto read sw',
        autoreadpc: 'auto read pc',
        autoreadgc: 'auto read group',
        premium_mode: 'premium mode',
        editmsg: 'edit message',
        similarCmd: 'similarity command',
        antitagowner: 'Anti Tag Owner',
        keyChecker: 'Auto detector apikey'
    }

    function sendPremInfo({ _text, text }, cust=false, number){
        return Exp.sendMessage(number || id, {
            text:`${_text ? (_text + "\n\n" + text) : text}`,
                contextInfo: {
                    externalAdReply: {
                    title: !cust ? "🔐Premium Access!" : "🔓Unlocked Premium Access!",
                    body: !cust ? infos.owner.lockedPrem : "You are now a 🔑Premium user and can access locked features²!",
                    thumbnailUrl: !cust ? 'https://telegra.ph/file/310c10300252b80e12305.jpg' : 'https://telegra.ph/file/ae815f35da7c5a2e38712.jpg',
                    mediaUrl: `http://ẉa.me/23234675912/${!cust ? "89e838":"jeie337"}`,
                    sourceUrl: `https://wa.me/${owner[0].split("@")[0]}?text=Hello,+I+have+buy+🔑Premium`,
                    renderLargerThumbnail: true,
                    showAdAttribution: true,
                    mediaType: 1,
                },
                mentionedJid:cht.mention
            }
        }, { quoted: cht })
    }
    
    ev.on({ 
        cmd: ['set'], 
        listmenu: ['set'],
        tag: "owner",
        isOwner: true,
        args: infos.owner.set
    }, async ({ args }) => {
        let fquotedKeys = Object.keys(Data.fquoted)
        let [t1, t2, t3, t4] = args.split(" ")
        if(!options[t1] && t1.includes("\n")){
          t1 = t1.split("\n")[0]
        }
        let isOn = ["on","true"].includes(t2)
        let isOff = ["off","false"].includes(t2)
        let isOnly = ["onlypc","onlygc"].includes(t2)
            
        let mode = options[t1] || (t1 == "fquoted" 
           ? `Success ${fquotedKeys.includes(t2) ? "change" : "add"} fake quoted ${t2}\n\nList fake quoted:\n\n- ${!fquotedKeys.includes(t2) ? [...fquotedKeys, t2].join("\n- ") : fquotedKeys.join("\n- ")}`
           : t1 == "welcome"
           ? `Successfully set welcome with type ${t2}`
           : t1 == "voice"
           ? infos.owner.successSetVoice
           : t1 == "logic"
           ? infos.owner.successSetLogic
           : t1 == "menu"
           ? infos.owner.successSetMenu
           : t1 == "lang" 
           ? true
           : t1 == "call"
           ? infos.owner.setCall
           : t1 == "hadiah"
           ? infos.owner.setHadiah
           : t1 == "autoreactsw"
           ? infos.owner.setAutoreactSw
           : t1 == "lora"
           ? `Example: .${cht.cmd} ${t1} 2067`
           : t1 == "checkpoint"
           ? `Example: .${cht.cmd} ${t1} 1552`
           : t1 == "apikey" 
           ? true
           : false)

        if (!mode) return cht.reply(infos.owner.set)
        
        if(t1 == "fquoted"){
          if(!t2) return cht.reply(infos.owner.setFquoted)
          let json;
            if(t3) {
              json = cht.q.split(" ").slice(2).join("")
            } else if(is.quoted) {
              let { key } = await store.loadMessage(cht.id, cht.quoted.stanzaId); 
              let msg = { key }
              let qmsg = cht.message.extendedTextMessage.contextInfo.quotedMessage
              let type = getContentType(qmsg)
                if(type.includes("pollCreationMessage")){
                  msg.message = { pollCreationMessage: qmsg.pollCreationMessage || qmsg.pollCreationMessageV2 || qmsg.pollCreationMessageV3 }
                } else {
                  msg.message = qmsg
                }
              json = JSON.stringify(msg)
            }
            try {
              let obj = JSON.parse(json)
              Data.fquoted[t2] = obj
              cht.reply(mode)
            } catch (e) {
              cht.replyWithTag(infos.owner.checkJson, { e, rm: infos.others.readMore })
            }
        } else if(t1 == "welcome"){
          let list = ["linkpreview","order","product","image","text"]
          let tlist = `\`List type welcome The available ones:\`\n\n- ${list.join("\n- ")}`
          if(!t2) return cht.reply(tlist)
          if(!list.includes(t2)) return cht.reply(`*Type welcome _${t2}_ notfound!*\n\n${tlist}`)
          global.cfg.welcome = t2
          cht.reply(mode)
        } else if(t1 == "logic"){
          if(!t2) return cht.replyWithTag(infos.owner.setLogic, { logic: cfg.logic, botnickname, botfullname, cmd: cht.prefix + cht.cmd })
          let fullname = func.findValue("fullainame", cht.q)
          let nickname = func.findValue("nickainame", cht.q)
          let profile = func.findValue("profile", cht.q)||func.findValue("logic", cht.q)
          if(!profile || !nickname || !fullname) return cht.replyWithTag(infos.owner.setLogic, { logic: cfg.logic, botnickname, botfullname, cmd: cht.prefix + cht.cmd })
          global.botfullname = fullname
          global.botnickname = nickname
          global.cfg.logic = profile
          cht.replyWithTag(mode, { logic: cfg.logic })
        } else if(t1 == "menu"){
          let list = ["linkpreview","order","liveLocation","image","text"]
          let tlist = func.tagReplacer(infos.owner.listSetmenu, { list:list.join("\n- ") })
          if(!t2) return cht.reply(tlist)
          if(!list.includes(t2)) return cht.reply(`*Type menu _${t2}_ notfound!*\n\n${tlist}`)
          global.cfg.menu_type = t2
          cht.replyWithTag(mode, { menu:t2 })
          if(t2 == "liveLocation") cht.reply(infos.owner.menuLiveLocationInfo)
          
        } else if(t1 == "lang"){
          let langs = fs.readdirSync(fol[9])
          if(!langs.includes(t2)) return cht.reply(`\`List Language:\`\n\n- ${langs.join("\n- ")}\n\nExample:\n _${cht.prefix + cht.cmd} ${t1} ${langs[0]}_`)
          global.locale = t2
          const files = await fs.readdirSync(fol[9] + locale + "/").filter(file => file.endsWith('.js'));

          for (const file of files) {
            await (fol[9] + locale + "/" + file).r();
          }

          cht.replyWithTag(global.Data.infos.owner.succesSetLang, { lang: t2 })
        } else if(t1 == "voice"){
            let listv = "`LIST VOICES`\n- "+Data.voices.join("\n- ")
            if(!t2){
              func.archiveMemories.setItem(sender, "questionCmd", { 
                emit: `${cht.cmd} ${t1}`,
                exp: Date.now() + 60000,
                accepts: Data.voices
              })
              return cht.reply(listv)
            }
            if(!Data.voices.includes(t2.trim())) return cht.reply("*[ VOICE NOTFOUND❗️ ]*\n\n`LIST VOICES`\n- "+Data.voices.join("\n- "))
            global.cfg.ai_voice = t2.trim()
            cht.replyWithTag(mode, { voice: global.cfg.ai_voice })
        } else if(t1 == "call"){
            if(!t2) return cht.reply(mode)
            cfg.call = cfg.call || { block: false, reject: false }
            let listaction = Object.keys(cfg.call)
            let actions = t2.split("+")
            let off = ["off","false"]
            let isOff = actions.find(a => off.includes(a))
            let notfound = actions.find(a => ![...off,...listaction].includes(a))
            if(notfound) return cht.reply(`Action \`${notfound}\` Not in the list!\n\n${mode}`)
            for(let i of listaction){
              global.cfg.call[i] = actions.includes(i)
            }
            cht.replyWithTag(infos.owner[isOff ? "successOffCall":"successSetCall"], { action: t2 })
        } else if(t1 == "Gift"){
            if(!t2) return cht.replyWithTag(mode, { game: `- ${Object.keys(cfg.hadiah).join("\n- ")}` })
            if(!Object.keys(cfg.hadiah).includes(t2)) return cht.replyWithTag(`*Game \`${t2}\` Not available!*\n\n${mode}`, { game: `- ${Object.keys(cfg.hadiah).join("\n- ")}` })
            if(!t3) return cht.replyWithTag("*Please include the amount of energy!*\n\n"+mode, { game: `- ${Object.keys(cfg.hadiah).join("\n- ")}` })
            if(isNaN(t3)) return cht.replyWithTag(infos.messages.onlyNumber, { value: "Energy" })
            cfg.hadiah[t2] = parseInt(t3)
            cht.reply(`Success set hadiah energy *${t2}* to ${parseInt(t3)} Energy⚡`)
        } else if(t1 == "autoreactsw"){
          if(!t2) return cht.reply(mode)
          let isEmoji = /^(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)+$/gu.test(t2)
          let off = ["off","false"]
          let isOff = off.includes(t2)
       	  if(!cfg.reactsw) cfg.reactsw = { on: false, emojis: ["😍","😂","😬","🤢","🤮","🥰","😭,🤫"] }

          if(isOff){
            cfg.reactsw = false
            return cht.reply(infos.owner[isOff ? "successOffAutoreactSw":"successSetAutoreactSw"])
          }
          if(!isEmoji) return cht.reply("`input Contains characters that are not emojis or invalid emojis`\n\n"+mode)
          let emojis = [...t2]
          cfg.reactsw = { on: true, emojis }
          return cht.reply(infos.owner.successSetAutoreactSw.replace("<action>", "\n- "+emojis.join("\n- ")))
        } else if(t1 == "bella"){
            if(!t2) return cht.reply(mode)
            let [a,...b] = args.split(" ")
            if(b.some(v => isNaN(v))) return cht.replyWithTag(infos.messages.onlyNumber, { value: t1 })
            let lora = b.map(v => parseInt(v))
            cfg.models = cfg.models || { checkpoint: 1552, loras: [2067] }
            cfg.models["loras"] = lora
            cht.reply("Success ✅")
        } else if(t1 == "checkpoint"){
            if(!t2) return cht.reply(mode)
            if(isNaN(t2)) return cht.replyWithTag(infos.messages.onlyNumber, { value: t1 })
            cfg.models = cfg.models || { checkpoint: 1552, loras: [2067] }
            cfg.models["checkpoint"] = parseInt(t2)
            cht.reply("Success ✅")
        } else if(t1 == "public"){
            if(isOn){
              global.cfg[t1] = true
            } else if(isOff){
              global.cfg[t1] = false
            } else if(isOnly){
              let vv = t2.trim().toLowerCase()
              mode = `mode ${vv}`
              global.cfg[t1] = vv
            } else {
              await cht.reply("on/off/onlygc/onlypc ?")
              return func.archiveMemories.setItem(sender, "questionCmd", { 
                emit: `${cht.cmd} ${t1}`,
                exp: Date.now() + 60000,
                accepts: ["on","off","true","false","onlygc","onlypc"]
              })
            }
            return cht.replyWithTag(isOff ? infos.owner.isModeOffSuccess : infos.owner.isModeOnSuccess, { mode })
        } else if(t1 == "apikey"){
          if(!t2){
            await cht.reply("Silahkan input apikeynya!")
            return func.archiveMemories.setItem(sender, "questionCmd", { 
              emit: `${cht.cmd} ${t1}`,
              exp: Date.now() + 20000,
              accepts: []
            })
          }
          api.xterm.key = t2.trim()
          cht.reply(`Success set apikey xtermai!\nKey: ${t2}`)
        } else if(t1 == "antitagowner"){
          if(t2){
            let off = ["off","false"]
            let isOff = off.includes(t2)
            let on = ["on","true"]
            let isOn = on.includes(t2)
            if(!(isOff||isOn)) return cht.reply(infos.owner.setAntiTagOwner)
            cfg['antitagowner'] = isOn
            return cht.replyWithTag(isOff ? infos.owner.isModeOffSuccess : infos.owner.isModeOnSuccess, { mode })
          } else {
            if(!cht.quoted) return cht.reply(infos.owner.setAntiTagOwner)
            let res = (await store.loadMessage(id, cht.quoted.stanzaId)).message
            Data.response['tagownerresponse'] = res
            cht.reply(`Success set antitagowner!\nType: ${cht.quoted.type}`)
          }
        } else {
          if (t2 === "on" || t2 === "true") {
            if (global.cfg[t1]) return cht.replyWithTag(infos.owner.isModeOn, { mode })
            global.cfg[t1] = true
            return cht.replyWithTag(infos.owner.isModeOnSuccess, { mode })
          } else if (t2 === "off" || t2 === "false") {
            if (!global.cfg[t1]) return cht.replyWithTag(infos.owner.isModeOff, { mode })
            global.cfg[t1] = false
            return cht.replyWithTag(isOff ? infos.owner.isModeOffSuccess : infos.owner.isModeOnSuccess, { mode })
          } else {
            await cht.reply("on/off ?")
            func.archiveMemories.setItem(sender, "questionCmd", { 
                emit: `${cht.cmd} ${t1}`,
                exp: Date.now() + 60000,
                accepts: ["on","off","true","false"]
            })
          }
        }
    })
    
    ev.on({ 
        cmd: ['setthumb'], 
        listmenu: ['setthumb'],
        media: {
            type: ["image"],
            save: false
        },
        tag: "owner",
        isOwner: true
    }, async ({ media }) => {
         await fs.writeFileSync(fol[3] + 'bell.jpg', media)
         cht.reply(infos.owner.successSetThumb)
    })
    
    ev.on({ 
        cmd: ['setpp'], 
        listmenu: ['setpp'],
        media: {
            type: ["image"],
            save: false
        },
        tag: "owner",
        isOwner: true
    }, async ({ media }) => {
          await cht.reply(infos.messages.wait)
          Exp.setProfilePicture(Exp.number,media)
          .then(a => cht.reply("Success...✅️"))
          .catch(e => cht.reply("TypeErr: " + e.message))
    })
    
    ev.on({ 
        cmd: ['badword'], 
        listmenu: ['badword'],
        args: func.tagReplacer(infos.owner.badword, { cmd: cht.prefix + cht.cmd }),
        isOwner: true,
        tag: "owner"
    }, async ({ media }) => {
         let [act, input] = cht.q.split("|")
         input = (input || cht.quoted?.text || "").split(",").map(a => a.trim()).filter(a => a.length > 1);

         if(act == "add"){
             if(input.length < 1) return cht.reply("Ex: .badword add|tes")
             Data.badwords = [...new Set([...Data.badwords, ...input])]
             cht.replyWithTag(infos.owner.successAddBadword, { input })
         } else if(act == "delete" || act == "d" || act == "del"){
             if(input.length < 1) return cht.reply("Ex: .badword delete|tes")
             input.forEach(word => {
                 Data.badwords = Data.badwords.filter(a => a !== word)
             })
             cht.replyWithTag(infos.owner.successDelBadword, { input })
         } else if(act == "list") {
             let list = "*[ LIST BADWORD ]*\n"
             for(let i of Data.badwords){
                 list += `\n - ${i}`
             }
             cht.reply(list)
         } else cht.replyWithTag(infos.owner.badwordAddNotfound, { cmd: cht.prefix + cht.cmd })
         
    })
    
    
    ev.on({ 
        cmd: ['getdata'], 
        listmenu: ['getdata'],
        isOwner: true,
        tag: "owner"
    }, async ({ media }) => {
        let [t1,t2,t3] = (cht.q||"").split(" ")
        
        let lists = Object.keys(Lists)
        
        if(!t1 && !lists.includes(t1)) return cht.reply(`\`AVAILABLE LIST\`:\n- ${lists.join("\n- ")}\n\n> Example:\n> ${cht.prefix + cht.cmd} ${t1||lists[0]||"<item>"}`)
        let lts = Lists[t1.toLowerCase()]
        if(!t2 && !lts.includes(t2)) return cht.reply(`\`LIST ${t1.toUpperCase()} YANG TERSEDIA\`:\n- ${lts.join("\n- ")}\n\n> Example:\n> ${cht.prefix + cht.cmd} ${t1} ${lts[0]||"<item>"}`)
        let data = Data[t1.toLowerCase()][t2]
        if(t1 == "fquoted") cht.reply(JSON.stringify(data, null, 2))
        
        if(t1 == "audio") cht.reply(`\`LIST ${t1.toUpperCase()}\`:\n\n- ${data.join("\n- ")}\n\n> \`Untuk menghapus audio dalam daftar\`:\n ${cht.prefix + "deldata"} ${t1} ${t2||"<item>"} ${data[0]||"<item>"}`)
    })
    
    ev.on({ 
        cmd: ['deldata'], 
        listmenu: ['deldata'],
        isOwner: true,
        tag: "owner"
    }, async ({ media }) => {
        let [t1,t2,t3] = (cht.q||"").split(" ")
        
        let lists = Object.keys(Lists)
        
        if(!lists.includes(t1)) return cht.reply(`\`LIST OF AVAILABLE FEATURES\`:\n\n- ${lists.join("\n- ")}\n\n> Example:\n> ${cht.prefix + cht.cmd} ${t1||lists[0]||"<item>"}`)
        let lts = Lists[t1.toLowerCase()]
        if(!lts.includes(t2)) return cht.reply(`\`LIST ${t1.toUpperCase()} YANG TERSEDIA\`:\n\n- ${lts.join("\n- ")}\n\n> Example:\n> ${cht.prefix + cht.cmd} ${t1} ${lts[0]||"<item>"}`)
        let data = Data[t1.toLowerCase()][t2] || []
        if(t1 == "fquoted") {
          delete Data[t1.toLowerCase()][t2]
          cht.reply(`*Berhasil menghapus ${t2} dari dalam data ${t1}\n\n\`LIST ${t1.toUpperCase()} YANG TERSISA\`:\n- ${Object.keys(Data[t1.toLowerCase()]).join("\n- ")}`)
        } else 
        if(t1 == "audio") {
          if(!t3) return cht.reply(`▪︎ *Untuk menghapus list audio:*\n - _${cht.prefix + cht.cmd} ${t1} ${t2} ${data[0]}_\n\n ▪︎ *Untuk menghapus semua list audio dalam data ${t2}*:\n - _${cht.prefix + cht.cmd}\ ${t1} ${t2} all_\n\n\`LIST ${t1.toUpperCase()} YANG TERSEDIA\`:\n- ${data.join("\n- ")}`)
          if(t3 == "all") {
            delete Data[t1.toLowerCase()][t2]
            cht.reply(`*Berhasil menghapus data ${t2}*\n\n\`LIST ${t1.toUpperCase()} YANG TERSEDIA\`:\n\n- ${Object.keys(Data[t1.toLowerCase()]).join("\n- ")}`)
          } else {
          if(!data.includes(t3)) return cht.reply(`*Audio _${t3}_ tidak tersedia dalam data ${t2}*!\n\n\`LIST ${t1.toUpperCase()} YANG TERSEDIA\`:\n\n- ${data.join("\n- ")}`)
            Data[t1.toLowerCase()][t2] = data.filter(a => a !== t3)
            cht.reply(`*Berhasil menghapus ${t3} dari dalam data ${t1} > ${t2}*\n\n\`LIST ${t1.toUpperCase()} YANG TERSISA\`:\n\n- ${Data[t1.toLowerCase()][t2].join("\n- ")}`)
          }
        }
    })
    
    ev.on({ 
        cmd: ['setdata'], 
        listmenu: ['setdata'],
        isOwner: true,
        tag: "owner"
    }, async ({ media }) => {
        let [t1,t2,t3] = (cht.q||"").split(" ")
        
        let lists = Object.keys(Lists)
        if(!t1 && !lists.includes(t1)) return cht.reply(`\`LIST OF AVAILABLE FEATURES\`:\n- ${lists.join("\n- ")}\n\n> Example:\n> ${cht.prefix + cht.cmd} ${t1||lists[0]||"<item>"}`)
        let lts = Lists[t1.toLowerCase()]
        let msg = t1 == "fquoted"
          ? `Success ${lts.includes(t2) ? "changing" : "adding"} fake quoted ${t2}\n\n\`Example way to take data\`:\n> ${prefix}getdata ${t1} ${t2}\n\nList fake quoted:\n\n- ${!lts.includes(t2) ? [...lts, t2].join("\n- ") : lts.join("\n- ")}`
          : t1 == "audio"
          ? infos.owner.audiolist
          : null
          
         if(t1 == "fquoted"){
          if(!(t3||cht.quoted)) return cht.reply(infos.owner.setFquoted.replace(/.set/g,".setdata"))
          let json;
            try {
            if(t3) {
              json = cht.q.split(" ").slice(2).join("")
            } else if(is.quoted) {
              let { key } = await store.loadMessage(cht.id, cht.quoted.stanzaId); 
              let msg = { key }
              let qmsg = cht.message.extendedTextMessage.contextInfo.quotedMessage
              let type = getContentType(qmsg)
                if(type.includes("pollCreationMessage")){
                  msg.message = { pollCreationMessage: qmsg.pollCreationMessage || qmsg.pollCreationMessageV2 || qmsg.pollCreationMessageV3 }
                } else {
                  msg.message = qmsg
                }
              json = JSON.stringify(msg)
            }
              let obj = JSON.parse(json)
              Data.fquoted[t2] = obj
              cht.reply(msg)
            } catch (e) {
              cht.reply(`Please check your JSON Object again!\n\nTypeError:\n${infos.others.readMore}\n> ${e}`)
            }
        }
        
        if(t1 == "audio"){
          if(!t2 && !lts.includes(t2)) return cht.reply(`\`LIST ${t1.toUpperCase()}  AVAILABLE\`:\n- ${lts.join("\n- ")}\n\n> Example:\n> ${cht.prefix + cht.cmd} ${t1} ${lts[0]||"<item>"}`)
          if(!(t3||is.quoted?.audio)) return cht.reply(infos.owner.setAudio)
            Data.audio[t2] = Data.audio[t2] || []
            if(t3) {
              Data.audio[t2].push(t3)
              cht.replyWithTag(msg,
                { url: t3, list: t2 }
              )
            } else if(is.quoted?.audio) {
              let audio = await TermaiCdn(await cht.quoted.download())
              Data.audio[t2].push(audio)
              cht.replyWithTag(msg,
                { url: audio, list: t2 }
              )
            } else {
              cht.reply(infos.owner.setAudio)
            }
        }
        
    })
    
    ev.on({ 
        cmd: ['addenergy','kurangenergy'],
        listmenu: ['addenergy','kurangenergy'],
        args: infos.about.energy,
        tag: 'owner',
        isMention: infos.about.energy,
        isOwner: true
    }, async() => {
        let num = cht.q?.split("|")?.[1] || cht.q
        if(isNaN(num)) return cht.reply("Energy must be a number!")
        let sender = cht.mention[0].split("@")[0]
        if(!(sender in Data.users)) return cht.reply(infos.owner.userNotfound)
        let user = await func.archiveMemories.get(cht.mention[0])
        let opts = {
            addenergy: {
                energy: () => (func.archiveMemories.addEnergy(sender, parseInt(num)).energy)
            },
            kurangenergy: {
                energy: () => (func.archiveMemories.reduceEnergy(sender, parseInt(num)).energy)
            }
        }
        user.energy = parseInt(opts[cht.cmd].energy())
        if(user.energy >= user.maxCharge){
            user.charging = false
        }
        const { default: ms } = await "ms".import()
        let max = user.maxCharge
        let energy = user.energy
        let _speed = user.chargingSpeed
        let rate = user.chargeRate
        let speed = ms(_speed)
        
        let txt = `*Successfully done${cht.cmd == "addenergy" ? "add":"reduce"} ${num} ⚡Energy to @${sender}*`
            txt += "\n\n*[🔋] Energy*"
            txt += "\n⚡Energy: " + user.energy
            txt += `\n\n- Status: ${user.charging ? "🟢Charging" : " ⚫Discharging"}`
            txt += "\n- Charging Speed: ⚡" + rate + " Energy/" + speed
            txt += "\n- Max Charge: " + max
        Exp.sendMessage(cht.id, { text: txt, mentions: cht.mention }, { quoted: cht })
	})
	
    ev.on({ 
        cmd: ['premium','addpremium','addprem','delpremium','delprem','kurangpremium','Omegapremium'],
        listmenu: ['premium'],
        tag: 'owner'
    }, async({ cht }) => {
        let isOwnerAccess = cht.cmd !== "premium";
        let text = isOwnerAccess ? infos.owner.premium_add : "";
        let trial = Data.users[cht.sender.split("@")[0]]?.claimPremTrial
        if (!isOwnerAccess) return sendPremInfo({ text:infos.messages.premium(trial) });
        if (!is.owner) return cht.reply("Sorry, don't feel like responding")
        if (cht.mention.length < 1) return sendPremInfo({ text });
        if(!cht.quoted && !cht.q.includes("|")) return sendPremInfo({ _text: infos.owner.wrongFormat, text });
        let time = (cht.q ? cht.q.split("|")[1] : false) || cht.q || false;
        if (!time) return sendPremInfo({ text });
        let Sender = cht.mention[0].split("@")[0];
        if (!(Sender in Data.users)) return cht.reply(infos.owner.userNotfound);
        let user = await func.archiveMemories.get(cht.mention[0])
        if (["kurangprem","kurangpremium","delprem","delpremium"].includes(cht.cmd) && user.premium.time < Date.now()) {
            return cht.reply("Sorry, the target is not a premium user!");
        }
        let premiumTime = func.parseTimeString(time);
        if (!premiumTime && !["delprem", "delpremium"].includes(cht.cmd)) {
            return sendPremInfo({ _text: infos.owner.wrongFormat, text });
        }
        if (!("premium" in user)) {
            user.premium = { time: 0 };
        }
        let date = user.premium.time < Date.now() ? Date.now() : user.premium.time;
        let formatDur = func.formatDuration(premiumTime || 0)
        let opts = {
            addpremium: {
                time: parseFloat(date) + parseFloat(premiumTime),
                msg:  `*Successfully increased premium duration! ✅️*\n ▪︎ User:\n- @${Sender}\n ▪︎ Time added: \n- ${formatDur.days}hari ${formatDur.hours}jam ${formatDur.minutes}minute ${formatDur.seconds}seconds ${formatDur.milliseconds}ms\n\n`
            },
            addprem: {
                time: parseFloat(date) + parseFloat(premiumTime),
                msg:  `*Successfully increased premium duration✅️*\n ▪︎ User:\n- @${Sender}\n ▪︎ Time added: \n- ${formatDur.days}hari ${formatDur.hours}jam ${formatDur.minutes}minute ${formatDur.seconds}seconds ${formatDur.milliseconds}ms\n\n`
            },
            kurangpremium: {
                time: parseFloat(date) - parseFloat(premiumTime),
                msg:  `*Successfully reduced premium duration✅️*\n ▪︎ User:\n- @${Sender}\n ▪︎ Time reduced: \n- ${formatDur.days}hari ${formatDur.hours}jam ${formatDur.minutes}minute ${formatDur.seconds}seconds ${formatDur.milliseconds}ms\n\n`
            },
            kurangprem: {
                time: parseFloat(date) - parseFloat(premiumTime),
                msg:  `*Successfully reduced premium duration!✅️*\n ▪︎ User:\n- @${Sender}\n ▪︎ Time reduced: \n- ${formatDur.days}hari ${formatDur.hours}jam ${formatDur.minutes}minute ${formatDur.seconds}seconds ${formatDur.milliseconds}ms\n\n`
            },
            delpremium: { 
                time:0,
                msg: `*Successfully delete user @${Sender} from premium✅️*\n\n`
            },
            delprem: {
                time:0,
                msg: `*Successfully delete user @${Sender} from premium✅️\n\n`
            }
        }
        if(premiumTime > 315360000000) return cht.reply("Maksimal Time adalah 10 tahun!")
        user.premium.time = opts[cht.cmd].time
        user.claimPremTrial = true
        if(cht.cmd.includes("delprem")) user.premium = { time:0 }
        let formatTimeDur = func.formatDuration(user.premium.time - Date.now())
        let claim = cfg.first.trialPrem
        let claims = Object.keys(claim)
        let prm = user.premium
        
        let txt = opts[cht.cmd].msg
            txt += `🔑Premium: ${user.premium.time >= Date.now() ? "yes":"no"}`
            if(user.premium.time >= Date.now()){
              user.premium = { ...claim, ...prm }
              let txc = "\n\n*🎁Bonus `(Berlaku selama premium)`*"
              for(let i of claims){
                  txc += `\n- ${i}: +${claim[i]}`
              }
              txt += `\n⏱️Expired after: ${formatTimeDur.days}hari ${formatTimeDur.hours}jam ${formatTimeDur.minutes}minute ${formatTimeDur.seconds}seconds ${formatTimeDur.milliseconds}ms`
              txt += `\n🗓️Expired on: ${func.dateFormatter(user.premium.time, "Asia/Jakarta")}`
              txt += txc
            } else {
              txt += `\n⏱️Expired after: false`
              txt += `\n🗓️Expired on: false`
            }
        Data.users[Sender] = user
        await sendPremInfo({ text:txt }, true)
        //sendPremInfo({ text:txt }, true, cht.mention[0])
    })
    
    ev.on({ 
        cmd: ['banned','unbanned'],
        listmenu: ['banned','unbanned'],
        tag: 'owner',
        isMention: infos.owner.banned,
        isOwner: true
    }, async() => {
        let user = await Exp.func.archiveMemories.get(cht.mention[0])
        console.log(user)
        let Sender = cht.mention[0].split("@")[0];
        if(!cht.quoted && !cht.q.includes("|") && cht.cmd == "banned") return cht.reply(infos.owner.banned)
        if(!Sender) return cht.reply("Harap reply/tag/sertakan nomor yang ingin di unbanned!\n\n"+infos.owner.banned)
        if(cht.cmd == "banned"){
          let time = (cht.args ? cht.args.split("|")[1] : false) || cht.args || false;
          if(!time) return cht.reply(infos.owner.banned)
          if (!(Sender in Data.users)) return cht.reply("Nomor salah atau user tidak terdaftar!");
          let _time = func.parseTimeString(time)
           if (!("banned" in user)) {
            user.banned = 0
          }
          let date = (user.banned && (user.banned > Date.now())) ? user.banned:Date.now() 
          let bantime = (date +_time)
          console.log(bantime)
          let formatDur = func.formatDuration(_time|| 0)
          let ban = func.formatDuration(bantime - Date.now())
          await Exp.sendMessage(cht.mention[0], { text: func.tagReplacer(infos.owner.addBanned, { ...ban }) })
          await cht.reply(func.tagReplacer(infos.owner.bannedSuccess, { ...formatDur,sender:Sender }),  {mentions: cht.mention})
          await func.archiveMemories.setItem(Sender, "banned", bantime)
        } else {
          await Exp.sendMessage(cht.mention[0], { text: infos.owner.delBanned })
          await cht.reply(func.tagReplacer(infos.owner.unBannedSuccess, { sender:Sender }), {mentions: cht.mention})
          func.archiveMemories.delItem(Sender, "banned")
        }
        
    })
    
    ev.on({ 
        cmd: ['cekapikey'], 
        listmenu: ['cekapikey'],
        isOwner: true,
        tag: "owner"
    }, async ({ args: arg }) => {
        let args = arg||api.xterm.key
        let res = await fetch(api.xterm.url + "/api/tools/key-checker?key="+args).then(a => a.json())
        const { limit, usage, totalHit, remaining, resetEvery, reset, expired, isExpired, features } = res.data;
        const resetTime = resetEvery.format
        const featuresList = Object.entries(features)
          .map(
            ([feature, details]) => 
              `🔹 **${feature}**:\n   - Maksimal: ${details.max} penggunaan/hari\n   - Hit Today: ${details.use} kali\n   - Total Hit: ${details.hit}\n`
          ).join("\n");

        cht.reply(`✅ **Status API Key**: ${isExpired ? "⛔ expired" : "✅ Aktif"}\n🔒 **daily limit**: ${limit} hit\n📊 **Penggunaan Saat Ini**: ${usage} hit\n📈 **Total Hit**: ${totalHit} hit\n🟢 **Sisa Hit**: ${remaining} hit\n\n⏳ **Reset Limit**:\n   - **Time Reset**: ${reset}\n   - **Interval Reset**: ${resetTime.days} hari ${resetTime.hours} jam ${resetTime.minutes} minute ${resetTime.seconds} seconds\n📅 **Masa Berlaku**:\n   - **Berakhir Pada**: ${expired}\n   - **Status expired**: ${isExpired ? "✅ Sudah expired" : "❌ Belum expired"}\n\n✨ **Available features**:\n${featuresList}\n📌 **Catatan**: Gunakan API secara bijak dan sesuai With daily penggunaan.\n  `)
    })
    
    ev.on({ 
        cmd: ['omegatech'], 
        listmenu: ['backup'],
        isOwner: true,
        tag: "owner"
    }, async ({ args }) => {
      await cht.reply("Proses bot file...")
      let b = "./backup.tar.gz"
      let s = await Exp.func.createTarGz("./",b)
      if(!s.status) return cht.reply(s.msg)
      await cht.edit(`File backup sedang dikirim${is.group ? " melalui private chat..." : "..."}`, keys[sender])
      await Exp.sendMessage(sender, { document: { url: b }, mimetype: "application/zip", fileName: `${path.basename(path.resolve("./"))} || ${Exp.func.dateFormatter(Date.now(), "Asia/Jakarta")}.tar.gz`, ai: true }, { quoted: cht })
      await cht.reply(`*Proses backup selesai✅️*${is.group ? "\nFile telah dikirimkan melalui chat pribadi" : "" }`)
      fs.unlinkSync(b)
    })
    
    ev.on({ 
        cmd: ['csesi','clearsesi','clearsession','clearsessi'], 
        listmenu: ['clearsesi'],
        isOwner: true,
        tag: "owner"
    }, async ({ args }) => {
      await cht.reply("Clearing session...")
      let sessions = fs.readdirSync(session).filter(a => a !== "creds.json")
      //const perStep = Math.ceil(sessions.length / 5)
      for(let i = 0; i < sessions.length; i++){
        await sleep(250)
        fs.unlinkSync(session +"/"+ sessions[i])
        /*
        if ((i + 1) % perStep === 0 || i + 1 === sessions.length) {
          const progress = Math.round(((i + 1) / sessions.length) * 100)
          cht.edit(`Progress: ${progress}%`, keys[sender], true)
         }
         */
      }
      cht.reply("Success clearing session✅️")
    })
    
    ev.on({ 
        cmd: ['setrole','setroleuser'],
        listmenu: ['setrole'],
        tag: 'owner',
        isMention: func.tagReplacer(infos.owner.setRole, { role: `- ${keyroles.join("\n- ")}` }),
        isOwner: true
    }, async() => {
      if(!cht.quoted && !cht.q.includes("|")) return cht.replyWithTag(infos.owner.setRole, { role: `- ${keyroles.join("\n- ")}` })
      let Sender = cht.mention[0].split("@")[0];
      let role = cht.quoted ? cht.q : cht.q?.split("|")[1]
      let frole = keyroles.find(a => a.toLowerCase().includes(role?.toLowerCase().trim()))
      if(!frole) return cht.replyWithTag("*[ Role tidak valid❗]*\n\n"+infos.owner.setRole, { role: `- ${keyroles.join("\n- ")}` })
      let memories = await func.archiveMemories.setItem(Sender, "chat", roles[frole])
      await cht.reply("Success✅")
      cht.memories = memories
      cht.pushName = func.getName(Sender)
      await sleep(100)
      ev.emit("profile")
    })
    
    ev.on({ 
        cmd: ['offline','online'],
        listmenu: ['offline <alasan>','online'],
        tag: 'owner',
        isOwner: true,
    }, async({ args }) => {
      let reason = args || "Tidak diketahui"
      if(cht.cmd == "offline"){
        global.offresponse = {}
        cfg.offline = {
          reason,
          time: Date.now(),
          max: 10
        }
        cht.reply(`@${sender.split("@")[0]} Now *OFFLINE!*\n\n- With reason: ${reason}\n- Time: ${func.dateFormatter(Date.now(), "Asia/Jakarta")}`, { mentions: [sender] })
      } else {
        delete cfg.offline
        delete global.offresponse
        cht.reply(`@${sender.split("@")[0]} Telah kembali online ✅`,  { mentions: [sender] })
      }
    })
    
    ev.on({
        cmd: ['addowner','delowner'],
        listmenu: ['addowner','delowner'],
        isOwner: true,
        isMention: true
    }, ({ args })=> {
        let mention = cht.mention.map(a => String(a.split('@')[0]))
        owner = 'addowner' == cht.cmd ? [...owner, ...mention] : owner.filter(a => !mention.includes(String(a).split('@')[0]))
        cht.reply(`Success ${'addowner' == cht.cmd ? 'add':'delete'} owner ${mention.map(a => '@'+a).join(', ')}!`, { mentions: cht.mention })
    })
 
    ev.on({ 
        cmd: ['update'],
        listmenu: ['update'],
        tag: 'owner',
        isOwner: true,
        urls: {
          formats: ["https://cdn.xtermai.xyz","https://raw.githubusercontent.com/Omegatech01/QUEEN-BELLA V1/refs/heads/"],
          msg: true
        },
    }, async({ urls }) => {
      let fols = await getDirectoriesRecursive()
      await cht.reply("Updating...")
      let changed = `*📂File Changed:*`
      let modifed = ''
      let newfile = ''
      let failed = '\n*❗Failed:*'
      let urlPath = urls.map(link => {
        const { pathname, host } = new URL(link);
        let isValidHost = ['cdn.xtermai.xyz','raw.githubusercontent.com'].includes(host)
        if(!isValidHost){
          failed += `\n- ${url}\n> Invalid host url`
          return null
        }
        let f = (host === "raw.githubusercontent.com" ? pathname.split("heads/")[1] : pathname)?.split('/')?.slice(1)?.join('/')?.split('/');
        const filename = f.slice(-1)[0];

        if (!filename){
          failed += `\n- ${url}\n> File empty`
          return null;
        }

        const _path = f.slice(0, -1).join('/');
    
        for (const folder of fols) {
          const folderPath = folder.split('./')[1].slice(0, -1);

          if (folderPath.includes(_path) && _path) {
            return [link, `${folder}${filename}`];
          }
      
          if (filename === 'index.js') {
            return [link, `./${filename}`];
          }
        }
        failed += `\n- Unknown error`
        return null;
      }).filter(Boolean)
      
      for(let [url, fpath] of urlPath){
        let res = await fetch(url)
        if(!res.ok) {
          failed += `\n- ${url}\n> Failed to fetch url`
          continue 
        }
        let isExists = fs.existsSync(fpath)
        if(isExists){
          modifed += `\n- \`modifed\`: ${fpath}`
        } else {
          newfile += `\n- \`new\`: ${fpath}`
        }
        let buff = await res.text()
        await fs.writeFileSync(fpath, buff)
      }
      
      let text = `*[ 🛠️ ] UPDATE*\n\n${changed}${modifed}${newfile}\n`
      if(failed.length > 12) text += failed
      cht.edit(text, keys[sender])
    })
    
    ev.on({
        cmd: ['upswgc'], 
        listmenu: ['upswgc'],
        isOwner: true,
        tag: "owner"
    }, async ({ args }) => {
      let [txt,_type] = cht.q.split("--")
      
      let text = txt||cht.quoted.text||""
      let { quoted, type } = ev.getMediaType()
      let isText = ["conversation","extendedTextMessage"].includes(type)
      let message = { }

      let value;
      
      if(!isText){
        value = quoted ? await cht.quoted.download() : await cht.download()
        message["caption"] = text
      } else {
        type = "text"
        value = text
      }
      message[type] = value 
      let msg = await generateWAMessage(STORIES_JID, message, {
          upload: Exp.waUploadToServer,
      })
      
      let { message:_msg, key } = msg

      let groups = []
      if(txt.endsWith(from.group)) _type = txt
      if(_type == "all"){
        groups = new Set([store.chats.all().map(a => a.id).filter(a => a.endsWith(from.group)), Object.keys(Data.preferences).filter(a => a.endsWith(from.group))].flat())
      } else if(_type?.endsWith(from.group)) groups.push(_type)
      else if(is.group){
        groups.push(cht.id)
      } else {
        return cht.reply("Please include the group ID!")
      }
      
      await cht.reply("Uploading to stories..")
      for(let ID of groups){
        await Exp.relayMessage(STORIES_JID, _msg, {
          messageId: key.id,
          statusJidList: (await func.getGroupMetadata(ID, Exp)).participants.map((a) =>a.id),
          additionalNodes: [
            {
              tag: "meta",
              attrs: {},
              content: [
                {
                  tag: "mentioned_users",
                  attrs: {},
                  content: [{
                    tag: "to",
                    attrs: { jid: ID },
                    content: undefined,
                  }],
                },
              ],
            },
          ]
        }) 
      
        //await Exp.sendMessage(ID, { text: 'Success' }, { quoted: msg })
        let mmm = await generateWAMessageFromContent({
            [ID.endsWith(from.group) ? "groupStatusMentionMessage":"statusMentionMessage"]: {
              message: {
                protocolMessage: {
                  key,
                  type: 25,
                },
              },
            },
          })
        await Exp.relayMessage(ID, mmm.message, {
          additionalNodes: [
            {
              tag: "meta",
              attrs: { is_status_mention: "true" },
              content: undefined,
            },
          ],
        })
        
      }
      
    })
    
    ev.on({
      cmd: ['addrespon','setresponse','setrespon','adresponse'],
      listmenu: ['addrespon'],
      isQuoted: `Reply pesan! With caption: ${cht.prefix+cht.cmd} <teks>`,
      isOwner: true,
      tag: "owner"
    }, async ({ args })=> {
      let res = (await store.loadMessage(id, cht.quoted.stanzaId)).message
      Data.response[args.toLowerCase()?.replace(/ /g,'')] = res
      cht.reply(`Success set response!\n- Type: ${cht.quoted.type}\n\n_Pesan With teks "*${args}*" akan direspon With pesan tersebut!_`)
    })
    
    ev.on({
      cmd: ['delrespon','delresponse'],
      listmenu: ['delrespon'],
      isQuoted: `Reply pesan! With caption: ${cht.prefix+cht.cmd} <teks>`,
      isOwner: true,
      tag: "owner"
    }, async ({ args })=> {
      delete Data.response[args.toLowerCase()?.replace(/ /g,'')]
      cht.reply(`Success delete response "*${args}*"`)
    })
    
    ev.on({ 
        cmd: ['setcmd'], 
        listmenu: ['setcmd'],
        media: {
            type: ["image","sticker","video","audio","document"],
            save: false
        },
        tag: "owner",
        args: `Reply pesan media! With caption: ${cht.prefix+cht.cmd} <command>`,
        isOwner: true
    }, async ({ args }) => {
        let { quoted, type } = ev.getMediaType()
        Data.setCmd[(quoted ? cht.quoted:cht)[type].fileSha256.toString().to('utf16le')] = args
        cht.reply(`Success set cmd!\n- Type: ${type}\n- Command: ${args}`)
    })
    
    ev.on({ 
        cmd: ['delcmd'], 
        listmenu: ['delcmd'],
        media: {
            type: ["image","sticker","video","audio","document"],
            save: false
        },
        tag: "owner",
        args: `Reply pesan media! With caption: ${cht.prefix+cht.cmd}`,
        isOwner: true
    }, async({ args }) => {
        let { quoted, type } = ev.getMediaType()
        let cmd = Data.setCmd[(quoted ? cht.quoted:cht)[type].fileSha256.toString().to('utf16le')]
        await cht.reply(`Success delete cmd!\n- Type: ${type}\n- Command: ${cmd}`)
        delete Data.setCmd[(quoted ? cht.quoted:cht)[type].fileSha256.toString().to('utf16le')]
                
    })
    
}