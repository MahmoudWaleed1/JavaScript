let number = Math.floor(Math.random() * 5) + 1;
function generateQuote(){

    switch (number){
        case 1: document.getElementById("quote").innerHTML="“Be yourself; everyone else is already taken.”"; 
        break;
        case 2: document.getElementById("quote").innerHTML="“So many books, so little time.”"; 
        break;
        case 3: document.getElementById("quote").innerHTML="“Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.” "; 
        break;
        case 4: document.getElementById("quote").innerHTML="“A room without books is like a body without a soul.”"; 
        break;
        case 5: document.getElementById("quote").innerHTML="“Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.”"; 
        break;
    }
        while(true){
            newNumber = Math.floor(Math.random() * 5) + 1
            if(newNumber!=number){
                number = newNumber
                break;
            }
        }


}
