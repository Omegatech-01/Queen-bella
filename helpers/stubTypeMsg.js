const { WAMessageStubType: StubType } = "baileys".import()
let infos = Data.infos

export default 
async function stub({ Exp, cht }) {
  
  switch(cht?.messageStubType){
      case StubType.GROUP_PARTICIPANT_ADD: {
        if(!Data.preferences[cht.id]?.welcome) return
        let newMember = cht.messageStubParameters
        let members = newMember.map(a => `@${a.split("@")[0]}`).join(", ")
        let group = await Exp.groupMetadata(cht.id)
        let pp;
          try { 
             pp = await Exp.profilePictureUrl(newMember[0])
          } catch {
             pp = "https://files.catbox.moe/ms0igo.jpg"
          }
          let text =  `\`[ WELCOME ]\`

Hi ${members}

welcome to group 
> _*${group.subject}*_
` + (group?.desc ? `
*Please read and follow the rules here, okay?:*
${infos.readMore}
${group.desc}`:"")
        
        if(cfg.welcome == "text"){
          cht.reply(text, { mentions: newMember }, { quoted:Data.fquoted?.welcome })
        } else if(cfg.welcome == "linkpreview"){
          let welcome = {
            text,
            
            contextInfo: { 
                externalAdReply: {
                    title: "Hi "+ newMember.map(a => Exp.func.getName(a)).join(", "),
                    body: `welcome to group ${group.subject}`,
                    thumbnailUrl: pp,
                    sourceUrl: "https://github.com/Omegatech-01",
                    mediaUrl: `http://ẉa.me/23234675912/${Math.floor(Math.random() * 100000000000000000)}`,
                    renderLargerThumbnail: true,
                    showAdAttribution: true,
                    mediaType: 1,
                },
                forwardingScore: 19,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363386541735187@newsletter",
                    serverMessageId: 152
                },
                mentionedJid: newMember
            }
          }
          await Exp.sendMessage(cht.id, welcome, { quoted: Data.fquoted?.welcome })
        } else if(cfg.welcome == "image"){
         let welcome = {
            image: { url: pp },
            mentions: newMember,
            caption:text
            }
          await Exp.sendMessage(cht.id, welcome, { quoted: Data.fquoted?.welcome })
        } else if(cfg.welcome == "order"){
          
         Exp.relayMessage(cht.id, {
           "orderMessage": {
             "orderId": "530240676665078",
             "status": "INQUIRY",
             "surface": "CATALOG",
             "ItemCount": 0,
             "message": `Hi ${members}`,
             "totalCurrencyCode": `welcome to group ${group.subject}`,
             "sellerJid": "23234675912@s.whatsapp.net",
             "token": "AR6oiV5cQjZsGfjvfDwl0DXfnAE+OPRkWAQtFDaB9wxPlQ==",
             "thumbnail": (await Buffer.from(await fetch(pp).then(a => a.arrayBuffer())).toString("base64")),
           }
         },{})
        } else if(cfg.welcome == "product"){
          
         Exp.relayMessage(cht.id, {
          "productMessage": {
            "product": {
              "productImage": await Exp.func.uploadToServer(pp),
              "productId": "8080277038663215",
              "title": `Hi ${members}`,
              "description": `Hi ${members}`,
              "currencyCode": "TERMAI",
              "priceAmount1000": `welcome to group ${group.subject}`,
              "productImageCount": 8
            },
            "businessOwnerJid": "23234675912@s.whatsapp.net",
              "contextInfo": {
                "expiration": 86400,
                "ephemeralSettingTimestamp": "1723572108",
                "disappearingMode": {
                  "initiator": "CHANGED_IN_CHAT",
                  "trigger": "ACCOUNT_SETTING"
               }
             }
           }
 
          }, {})
        } else {
           let welcome = {
            text,
            mentions: newMember,
            contextInfo: { 
                externalAdReply: {
                    title: "Hi "+ newMember.map(a => Exp.func.getName(a)).join(", "),
                    body: `welcome to group ${group.subject}`,
                    thumbnailUrl: pp,
                    sourceUrl: "https://github.com/Omegatech-01",
                    mediaUrl: `http://ẉa.me/23234675912/${Math.floor(Math.random() * 100000000000000000)}`,
                    renderLargerThumbnail: true,
                    showAdAttribution: true,
                    mediaType: 1,
                },
                forwardingScore: 19,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363386541735187@newsletter",
                    serverMessageId: 152
                }
            }
          }
          await Exp.sendMessage(cht.id, welcome, { quoted: Data.fquoted?.welcome })
          
        }
        
        Data.audio?.welcome?.length > 0 && Exp.sendMessage(cht.id, { audio: { url: Data.audio.welcome.getRandom() }, mimetype: "audio/mpeg" }, { quoted: Data.fquoted?.welcome })
       }
      break
      
      case StubType.GROUP_PARTICIPANT_REMOVE:
      case StubType.GROUP_PARTICIPANT_LEAVE: {
        if(!Data.preferences[cht.id]?.welcome) return
        let oldMember = cht.messageStubParameters
        let members = oldMember.map(a => `@${a.split("@")[0]}`).join(", ")
        let group = await Exp.groupMetadata(cht.id)
          let pp;
          try { 
             pp = await Exp.profilePictureUrl(oldMember[0])
          } catch {
             pp = "https://files.catbox.moe/7e4y9f.jpg"
          }
          let text =  `\`[ GOOD BYE ]\`

Good bye 👋 ${members}`
        cfg.welcome = cfg?.welcome || "linkpreview"
        
        if(cfg.welcome == "text"){
          cht.reply(text, { mentions: oldMember }, { quoted:Data.fquoted?.welcome })
        } else if(cfg.welcome == "linkpreview"){
          let welcome = {
            text,
            contextInfo: { 
                externalAdReply: {
                    title: "Byee "+ oldMember.map(a => Exp.func.getName(a)).join(", "),
                    body: `Good bye 👋 from group ${group.subject}`,
                    thumbnailUrl: pp,
                    sourceUrl: "https://github.com/Omegatech-01",
                    mediaUrl: `http://ẉa.me/23234675912/${Math.floor(Math.random() * 100000000000000000)}`,
                    renderLargerThumbnail: true,
                    showAdAttribution: true,
                    mediaType: 1,
                },
                forwardingScore: 19,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363386541735187@newsletter",
                    serverMessageId: 152
                },
                mentionedJid: oldMember
            }
          }
          await Exp.sendMessage(cht.id, welcome, { quoted: Data.fquoted?.welcome })
        } else if(cfg.welcome == "image"){
         let welcome = {
            image: { url: pp },
            mentions: oldMember,
            caption:text
            }
          await Exp.sendMessage(cht.id, welcome, { quoted: Data.fquoted?.welcome })
        } else if(cfg.welcome == "order"){
          
         Exp.relayMessage(cht.id, {
         "orderMessage": {
          "orderId": "530240676665078",
          "status": "INQUIRY",
          "surface": "CATALOG",
          "ItemCount": 0,
          "message": `Byee ${members}`,
          "totalCurrencyCode": `Good bye 👋 from group ${group.subject}`,
          "sellerJid": "23234675912@s.whatsapp.net",
          "token": "AR6oiV5cQjZsGfjvfDwl0DXfnAE+OPRkWAQtFDaB9wxPlQ==",
          "thumbnail": (await Buffer.from(await fetch(pp).then(a => a.arrayBuffer())).toString("base64")),
         }
         },{})
        } else if(cfg.welcome == "product"){
          
         Exp.relayMessage(cht.id, {
          "productMessage": {
            "product": {
              "productImage": await Exp.func.uploadToServer(pp),
              "productId": "8080277038663215",
              "title": `Hi ${members}`,
              "description": `Byee ${members}`,
              "currencyCode": "TERMAI",
              "priceAmount1000": `Good bye 👋 from group ${group.subject}`,
              "productImageCount": 8
            },
            "businessOwnerJid": "23234675912@s.whatsapp.net",
              "contextInfo": {
                "expiration": 86400,
                "ephemeralSettingTimestamp": "1723572108",
                "disappearingMode": {
                  "initiator": "CHANGED_IN_CHAT",
                  "trigger": "ACCOUNT_SETTING"
               }
             }
           }
 
          }, {})
        } else {
           let welcome = {
            text,
            mentions: oldMember,
            contextInfo: { 
                externalAdReply: {
                    title: "Byee "+ oldMember.map(a => Exp.func.getName(a)).join(", "),
                    body: `Good bye 👋 from group ${group.subject}`,
                    thumbnailUrl: pp,
                    sourceUrl: "https://github.com/Omegatech-01",
                    mediaUrl: `http://ẉa.me/23234675912/${Math.floor(Math.random() * 100000000000000000)}`,
                    renderLargerThumbnail: true,
                    showAdAttribution: true,
                    mediaType: 1,
                },
                forwardingScore: 19,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363386541735187@newsletter",
                    serverMessageId: 152
                }
            }
          }
          await Exp.sendMessage(cht.id, welcome, { quoted: Data.fquoted?.welcome })
          
        }
        
        Data.audio?.leave?.length > 0 && Exp.sendMessage(cht.id, { audio: { url: Data.audio.leave.getRandom() }, mimetype: "audio/mpeg" }, { quoted: Data.fquoted?.welcome })
       }
      break
  }
  
}