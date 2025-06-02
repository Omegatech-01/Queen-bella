let infos = Data.infos.about ??= {};

infos.help = "Include the question you want to ask related to this bot to get help"

infos.energy = `
📌 *[Guide to Adding/Reducing Energy]*

You can add or reduce other users' energy with the following methods. Make sure to include the number, reply, or tag of the user whose energy you want to modify.

*🛠 Format:*
- *🔹 Command*: \`.addenergy\` or \`.reduceenergy\`
- *🔹 Energy Amount*: Number indicating how much energy to add or reduce

*💡 How to Use:*

🔸 *Method #1 - By Replying to Target Message*  
   ➡️ Reply to the user's message whose energy will be changed, then send:
   - \`.addenergy [energy amount]\`
   - \`.reduceenergy [energy amount]\`
   
   _Example_: \`.addenergy 10\`

🔸 *Method #2 - By Tagging Target*  
   ➡️ Use \`@username\` followed by \`|\` and the energy amount.
   - \`.addenergy @username|[energy amount]\`
   - \`.reduceenergy @username|[energy amount]\`
   
   _Example_: \`.addenergy @rifza|10\`

🔸 *Method #3 - By Target Number*  
   ➡️ Include the full user number followed by \`|\` and the energy amount.
   - \`.addenergy +62xxxxxxx|[energy amount]\`
   - \`.reduceenergy +62xxxxxxx|[energy amount]\`
   
   _Example_: \`.addenergy +62831xxxxxxx|10\`

⚠️ *[Note]*
- 🔄 Replace \`[energy amount]\` with the desired number.
- ✅ Ensure the target (username or number) is valid to avoid errors.
`

infos.stablediffusion = `*[HOW TO USE STABLEDIFFUSION (TXT2IMG)]*

Command to generate images with text: \`.txt2img <checkpoint>[<bella>]|<prompt>\`
📌 *Parameter Explanation:*
- \`<checkpoint>\`: Main model ID used to generate the image.
- \`<bella>\`: (Optional) Additional ID to enrich style or image details. Can use one or multiple bellas.
- \`<prompt>\`: Description or keywords of the desired image.

---------------------------------
📝 *Command Format:*

▪︎ \`Without bella\` - if you do not want to add bella style or effects:
- \`.txt2img <checkpoint>[]|<prompt>\`
  _Example_: \`.txt2img 1234[]|sunset, beach, high resolution\`

▪︎ \`With 1 bella\` - if you want to add one bella effect/style:
- \`.txt2img <checkpoint>[<bella>]|<prompt>\`
  _Example_: \`.txt2img 1234[5678]|cyberpunk, neon lights, cityscape\`

▪︎ \`With Multiple bellas\` - if you want to add several bella effects/styles simultaneously:
- \`.txt2img <checkpoint>[<bella>,<bella>,...more infos.help]|<prompt>\`
  _Example_: \`.txt2img 1234[5678,91011]|fantasy world, medieval castle, dragon\`

---------------------------------
📖 *Complete Example*: 
- \`.txt2img 1233[9380]|1girl, beautiful, futuristic, armored mecha\`
  _(Explanation)_:
  - **1233**: Main checkpoint ID used.
  - **9380**: bella ID for adding specific details.
  - **1girl, beautiful, futuristic, armored mecha**: Description for the image output.

---------------------------------
🔍 *How to Find Checkpoint or bella IDs*:
- To find bella IDs: use the command \`.bellasearch <keyword>\`
  _Example_: \`.bellasearch cyberpunk\` to search for bella styles with a cyberpunk theme.
  
- To find Checkpoint IDs: use the command \`.checkpointsearch <keyword>\`
  _Example_: \`.checkpointsearch anime\` to search for anime-themed checkpoint models.

---------------------------------
⚠️ *Important Notes*:
- Ensure the checkpoint and bella IDs used are valid for the command to work properly.
- The \`<prompt>\` description can include extra details for more specific results.

*[ABOUT STABLEDIFFUSION]*
- *Stable Diffusion is a generative AI model that converts text descriptions into images. Using diffusion techniques, this model gradually generates images based on given text input, allowing creation of images with certain styles or themes. Supported by additional models like bella, users can customize image details or effects further. This model is open-source and widely used in digital art and creative design.*
`

infos.helpList = `\`LIST OF GUIDES/HELP\`\n\n<keys>`

infos.helpNotfound = `*Oops we couldn't find the help you are looking for!*

Maybe you are searching for:
<top>`

infos.antilink = `📌 *Guide for Using Bot Antilink Feature*

🔒 *1. Enable Antilink:*
   - Command: \`.antilink on\`
   - *Use this command to activate antilink protection in the group.*

🔓 *2. Disable Antilink:*
   - Command: \`.antilink off\`
   - *Use this command to deactivate antilink protection.*

➕ *3. Add URL to Antilink List:*
   - Command: \`.antilink add <link>\`
   - *Use this command to add URLs you want to block.*
   - Example: \`.antilink add https://wa.me\`

➖ *4. Remove URL from Antilink List:*
   - Command: \`.antilink del <link>\`
   - *Use this command to remove URLs from the block list.*
   - Example: \`.antilink del https://wa.me\`
`