//Deposite some Money
//Collect a bet amount
//Spin the slot money
//Determine number of lines to bet on
//Check if the user won
//Give the user their winnning
//Play again
//We can place a bet on each line so the maximum bet we can place depends on the total balance avaliable and the number of lines chosen
//So the bet can be made on the total balance avaliable / number of lines chosen

const prompt = require("prompt-sync")();

const ROWS = 3
const COLS = 3

const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8
}

const SYMBOL_VALUES = {
    A : 5,
    B : 4,
    C : 3,
    D : 2
}


const deposit = () =>{
    while(true){
        const depositeAmount = prompt("Enter a deposite amount : ")
        //Convert this to a number
        const numberDepositeAmount = parseFloat(depositeAmount)
        //isNaN => checks if the given variable is a number or not
        if(isNaN(numberDepositeAmount)|| (numberDepositeAmount <=0)){
            console.log("Invalid deposite amount , try again")
        }
        else{
            return numberDepositeAmount
        }
    }
}

const getNumberOfLines = () =>{
    while(true){
        const lines = prompt("Enter the number of lines to be bet on (1-3) : ")
        //Convert this to a number
        const numberOfLines = parseFloat(lines)
        //isNaN => checks if the given variable is a number or not
        if(isNaN(numberOfLines)|| numberOfLines <=0 || numberOfLines > 3){
            console.log("Invalid number of lines, try again")
        }
        else{
            return numberOfLines
        }
    }
}

const getBet = (balance,lines) => {
    while(true){
        const bet = prompt("Enter the total bet amount per line : ")
        //Convert this to a number
        const numberBet = parseFloat(bet)
        //isNaN => checks if the given variable is a number or not
        if(isNaN(numberBet)|| numberBet <=0 || numberBet > balance/lines){
            console.log("Invalid bet, try again")
        }
        else{
            return numberBet
        }
    }
}

const spin = () => {
    const symbols = []
    for (const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count;i++){
            symbols.push(symbol)
        }
    }

    const reels = []
    for(let i = 0 ; i < COLS ; i++){
        reels.push([])
        //Copy the value present in symbols array to this using ...symbols
        const reelSymbols = [...symbols]
        for(let j = 0 ; j < ROWS ; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex]
            reels[i].push(selectedSymbol)
            reelSymbols.splice(randomIndex , 1)
        }
    }
    return reels
}

const transpose = (reels) => {
    const rows = []

    for(let i = 0; i < ROWS; i++){
        rows.push([])
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows
}

const printRows = (rows) => {
    for(const row of rows) {
        let rowString = ""
        for (const [i, symbol] of row.entries()){
            rowString += symbol
            if(i != rows.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

const getWinning = (rows,bet,lines) => {
    let winnings = 0

    for (let row = 0 ;row < lines; row++){
        const symbols = rows[row]
        let allSame = true

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false
                break
            }
        }
        if(allSame){
            winnings += bet * SYMBOL_VALUES[symbols[0]]
        }
    }
    return winnings
}

const game = () => {
    let balance = deposit()

    while(true){
        console.log("You have a balance of $"+balance)
        const numberOfLines = getNumberOfLines()
        const bet = getBet(balance,numberOfLines)
        balance -= bet*numberOfLines
        const reels = spin()
        const rows = transpose(reels)
        printRows(rows)
        const winnings = getWinning(rows, bet, numberOfLines)
        balance += winnings
        console.log("You won, $"+winnings.toString())
        
        if(balance <=0){
            console.log("You ran out of Money!!!!!!!")
            break
        }
        const playAgain = prompt("Do you want to play again (y/n) ")
        if(playAgain != "y") break
    }
}

game()
