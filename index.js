  /** !-======[ Queen-bella |Powered by OmegaTech]======-!
      * Coding by @Omega wa.me +23234675912 *     
      
      🩵 Follow ️me on :
      ▪︎ https://youtube.com/@Omega_animation 
      ▪︎ https://github.com/omegatech-01
      ▪︎ https://instagram.com/omega?igshid=ZGUzMzM3NWJiOQ==
      ▪︎ https://www.threads.net/@OmegaTech
      ▪︎ https://omegatech-01.com
  */
/*!-======[ Preparing Configuration ]======-!*/
import "./toolkit/set/string.prototype.js";
await "./toolkit/set/global.js".r()

/*!-======[ Mudules Imports ]======-!*/
const readline = "readline".import()
const fs = "fs".import()
const chalk = "chalk".import()
const baileys = "baileys".import()
const pino = "pino".import()
const { Boom } = "boom".import();
const { Connecting } = await `${fol[8]}systemConnext.js`.r()
const Event = (await 'events'.import()).default
let { makeInMemoryStore } = await './toolkit/store.js'.r()

Event.defaultMaxListeners = 25 

let {
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    getContentType,
    Browsers
} = baileys;
/*!-======[ Functions Imports ]======-!*/
let detector = (await (fol[0] + "detector.js").r()).default
Data.utils = (await `${fol[1]}utils.js`.r()).default
Data.helper = (await `${fol[1]}client.js`.r()).default
Data.In = (await `${fol[1]}interactive.js`.r()).default
Data.reaction = (await `${fol[1]}reaction.js`.r()).default
Data.EventEmitter = (await `${fol[1]}events.js`.r()).default
Data.stubTypeMsg = (await `${fol[1]}stubTypeMsg.js`.r()).default
Data.eventGame = (await `${fol[1]}eventGame.js`.r()).default

Data.initialize = (await `${fol[1]}initialize.js`.r()).default

let logger = pino({ level: 'silent' })
let store = makeInMemoryStore();

async function launch() {
  try {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const question = (text) => new Promise((resolve) => rl.question(text, resolve));
    if(fs.existsSync(session) && !fs.existsSync(session + "/creds.json")) await fs.rmdir(session, { recursive: true }, (err) => {} )   
    if (!fs.existsSync(session + "/creds.json")) {
    let quest = `\n${chalk.red.bold('╭──────────────────────────────────────────────────────╮')}\n${chalk.red.bold('│')} ${chalk.bold('❗️🚫YOU HAVE NOT YET CREATED A SESSION 🚫❗ ')} ${chalk.red.bold('│')}\n${chalk.red.bold('╰──────────────────────────────────────────────────────╯')}\n            \n${chalk.green('🏷 Choose one of the following options to link perangkat:')}\n${chalk.blue('▪︎ qr')}\n${chalk.blue('▪︎ pairing')}\n\n${chalk.yellow('* Type one of the options above, for example:')} ${chalk.blue.bold('put number')}\n\n${chalk.yellow('put whatsapp number: ')}`;
 
        await sleep(1000)
        const opsi = await question(quest);
  	    if (opsi == "pairing") {
  			global.pairingCode = true
  		} else if (opsi == "qr") {
  			global.pairingCode = false
  		} else {
  			console.log(`Option choices are not available!`)
  		}
  	}
  	
  	let { state, saveCreds } = await useMultiFileAuthState(session);
        const Exp = makeWASocket({
            logger,
            printQRInTerminal: !global.pairingCode,
            browser: Browsers.ubuntu('Chrome'),
            auth: state
        });
        
        if (global.pairingCode && !Exp.authState.creds.registered) {
           const phoneNumber = await question(chalk.yellow('Please type your WhatsApp number : '));
           let code = await Exp.requestPairingCode(phoneNumber.replace(/[+ -]/g, ""));
           console.log(chalk.bold.rgb(255, 136, 0)(`\n  ╭────────────────────────────╮\n  │  ${chalk.yellow('Your Pairing Code:')} ${chalk.greenBright(code)}  │\n  ╰────────────────────────────╯\n            `)
           );
        }
        
        /*!-======[ INITIALIZE Exp Functions ]======-!*/
        Data.initialize({ Exp, store })

        /*!-======[ Detect File Update ]======-!*/
        keys["detector"] && clearInterval(keys["detector"])
        detector({ Exp, store })
        
        /*!-======[ EVENTS Exp ]======-!*/
        Exp.ev.on('connection.update', async (update) => {
            await Connecting({ update, Exp, Boom, DisconnectReason, sleep, launch });
        });

        Exp.ev.on('creds.update', saveCreds);
        
        Exp.ev.on('messages.upsert', async ({
  			messages
  		}) => {
            const cht = {
                ...messages[0],
                id: messages[0].key.remoteJid
            }
            let isMessage = cht?.message
            let isStubType = cht?.messageStubType
  			if (!(isMessage || isStubType)) return;
  			if (cht.key.remoteJid === 'status@broadcast') {

  				if(!cfg.reactsw) cfg.reactsw = { on: false, emojis: ["😍","😂","😬","🤢","🤮","🥰","😭"] }
  				
  			    if(cfg.reactsw.on){
  				  let { emojis } = cfg.reactsw
  				  await Exp.sendMessage(
                    cht.id,
                    { react: { key: cht.key, text: emojis.getRandom() } },
                    { statusJidList: [cht.key.participant, Exp.user.id.split(':')[0] + from.sender] }
                  )
  				} 
  				else if(cfg.autoreadsw == true){
  				  await Exp.readMessages([cht.key]);
  			  	  let typ = getContentType(cht.message);
  		 		  console.log((/protocolMessage/i.test(typ)) ? `${cht.key.participant.split('@')[0]} Deleted story❗` : 'View user stories : ' + cht.key.participant.split('@')[0])
  		 		}
  				return
  			} else {
  			     const exs = { cht, Exp, is: {}, store }
  			     await Data.utils(exs)
  			     
  			     if(isStubType) { 
  			       Data.stubTypeMsg(exs)
  			     } else { 
                  await Data.helper(exs);
                 }
             }
	    });
	    
	    Exp.ev.on('call', async([c])=>{
	      let { from, id, status } = c
	      if(status !== 'offer') return
	      cfg.call = cfg.call || { block: false, reject: false }
	      let { block, reject } = cfg.call
	      if(reject){
	        await Exp.rejectCall(id, from)
	        await Exp.sendMessage(from, { text: "⚠️DON'T CALL❗" })
	      }
	      if(block){
	        let text = `\`⚠️YOU HAVE BEEN BLOCKED!⚠️\``
	          + "\n- *Calling is not allowed because it seriously disrupts our activities*"
	          + "\n> _To unblock, please contact the owner!_"
	        await Exp.sendMessage(from, { text })
	        await Exp.sendContacts({ id: from }, owner)
	        await sleep(2000)
	        await Exp.updateBlockStatus(from, "block")
	      }
	    })
	    store.bind(Exp.ev);
	} catch (error) {
	  console.error(error)
	}
}
launch()
process.on("uncaughtException", e => {
  console.error(e)
})