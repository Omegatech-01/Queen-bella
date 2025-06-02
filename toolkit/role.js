export const role = function(chat){
    let res;
    if (chat <= 10) {
        res = "Gak kenal";
    } else if (chat <= 30) {
        res = "Baru kenal";
    } else if (chat <= 50) {
        res = "Temen biasa";
    } else if (chat <= 100) {
        res = "Temen Ngobrol";
    } else if (chat <= 150) {
        res = "Gossip friend";
    } else if (chat <= 300) {
        res = "long friend";
    } else if (chat <= 350) {
        res = "Hangout friend";
    } else if (chat <= 500) {
        res = "near friend";
    } else if (chat <= 650) {
        res = "close friend";
    } else if (chat <= 800) {
        res = "kind friend";
    } else if (chat <= 1350) {
        res = "close";
    } else if (chat <= 3200) {
        res = "Sahabat Deket";
    } else if (chat <= 4550) {
        res = "Sahabat Sejati";
    } else if (chat <= 10000) {
        res = "Pacar";
    } else {
        res = "🎀Soulmate🦋"
    }
    return res;
}

