const commando = require('discord.js-commando');
const accessBank = require('./access-bank.js');

let bank = accessBank.get();

class MoneyUserGive5Command extends commando.Command {

    constructor(client) {
        super(client, {
            name: 'donner5',
            group: 'bank',
            memberName: 'donner5',
            description: '  b!donner5 [nom] | Permet de donner un billet de 5 € a quelqu\'un.'
        });
    }

    async run(message, args) {
      bank = accessBank.get();
        if (message.content.startsWith("b!donner5 ")){
            var argument = message.content.substr("b!donner5 ".length);
            var tabNom = [];
            var nomDonneur;
            var nomReceveur;
            var idDonneur;
            var idReceveur;
            var dansBanque = false;
            for(var i in bank){
                if(bank[i].nom.includes(argument)){
                    tabNom.push(bank[i].nom);
                }
            }
            for (var i in bank) {
                if (message.member.id == bank[i].id) {
                    dansBanque = true;
                    break;
                }
            }
            if(dansBanque){
              if(tabNom.length == 1){
                  console.log(bank);
                  for(var i in bank){
                      if(message.member.id == bank[i].id){
                          bank[i].argent = bank[i].argent - 5;
                          nomDonneur = bank[i].nom;
                          idDonneur = bank[i].id;
                      }
                      if(bank[i].nom == tabNom[0]){
                          bank[i].argent = bank[i].argent + 5;
                          nomReceveur = bank[i].nom;
                          idReceveur = bank[i].id;
                      }
                  }
                  console.log("\n==== MODIFICATION DE LA BANQUE ====\n");
                  console.log(bank);

                  accessBank.set(bank, (err) => {
                  if (err) throw err;
                      console.log('Bank saved!');
                  });
                  if(nomDonneur == tabNom[0]){
                      message.reply("Transfert réussi ! ( Même si c'est inutile ^^\' )");
                  }
                  else{
                      message.reply("Transfert réussi !");
                      message.channel.sendMessage("<@" + idDonneur + "> donne 5 € a <@" + idReceveur + ">" );
                  }
              }
              if(tabNom.length > 1){
                  var chaine = "Erreur trop de nom : \n";
                  for(var i in tabNom){
                      chaine = chaine + tabNom[i] + "\n";
                  }
                  message.reply(chaine);
              }
              if(tabNom.length == 0){
                  message.reply("Erreur, joueur introuvable\nb!liste pour avoir la liste des membres");
              }
            }
            else{
              message.reply("Vous n'avez pas de compte bancaire\nb!inscrire pour en créer un")
            }

        }else{
            message.reply("Erreur d'utilisitation de la commande");
        }

        console.log(message.member.user.tag + " a fait la commande donner5");
    }
}

module.exports = MoneyUserGive5Command;
