let boxes=document.querySelectorAll('.box');
let resetButton=document.getElementById('reset');
let msgCon=document.querySelector('.msg-con');
let msg=document.querySelector('.msg');
let count=0;

let turn0=true

const winningCombinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];



boxes.forEach(box => {
    box.addEventListener('click', () => {
            
            if(turn0){
                box.textContent='O';
                turn0=false;
            }else{
                box.textContent='X';
                turn0=true;
                box.style.color="black";
            }
            box.disabled=true;
            count++;
            checkwinner();    
    });
});

const disabledboxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enabledboxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.style.color = "";
    }
};


const showwinner=(winner)=>{
    if(count === 9 && winner === ""){
        msg.innerText = `It's a Draw!`;
    } else {
        msg.innerText = `${winner} is the Winner!`;
    }
    
    msgCon.classList.remove('hide');
    disabledboxes();
};

const checkwinner=()=>{
    for(let i of winningCombinations){

        let pos1value=boxes[i[0]].innerText;
        let pos2value=boxes[i[1]].innerText;
        let pos3value=boxes[i[2]].innerText;

        if(pos1value !=="" && pos2value !=="" && pos3value !==""){
            if(pos1value===pos2value && pos2value===pos3value){
                showwinner(pos1value);
                return;
            }
        }
    }

    // No winner found; if all boxes are filled it's a draw
    if(count === 9){
        showwinner("");
    }
};

const resetgame=()=>{
    enabledboxes();
    msgCon.classList.add('hide');
    count = 0;
    turn0 = true;
}

resetButton.addEventListener('click', resetgame);