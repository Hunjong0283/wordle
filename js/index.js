const answer = "APPLE";

let index = 0;
let attempts = 0;
let tiemr;

function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "gameover";
    div.style = "display:flex; justify-content:center; align-items:center;";
    document.body.appendChild(div);
    window.removeEventListener("keydown", handleKeyDown);
    clearInterval(timer);
  };
  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts = attempts + 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은개수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = answer[i];
      console.log("입력한글자:", 입력한_글자, "정답_글자:", 정답_글자);
      if (입력한_글자 === 정답_글자) {
        맞은개수++;
        block.style.background = "#6AAA64";
      } else if (answer.includes(입력한_글자))
        block.style.background = "#b49f3a";
      else block.style.background = "#3a3a3c";
      block.style.color = "white";
    }

    if (맞은개수 === 5) displayGameOver();
    else nextLine();
  };
  const handleBackspace = (thisBlock) => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index = index - 1;
  };
  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (index === 5) return;
    else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerHTML = key;
      index = index + 1;
    }
  };
  //로직들
  window.addEventListener("keydown", handleKeyDown);
  const startTime = new Date();
  function settime() {
    const time = new Date();
    const flowTime = new Date(time - startTime);
    const 분 = flowTime.getMinutes().toString();
    const 초 = flowTime.getSeconds().toString();
    const timeH1 = document.querySelector(".time");
    timeH1.innerHTML = `${분.padStart(2, 0)}:${초.padStart(2, 0)}`;
  }

  timer = setInterval(settime, 1000);
}

appStart();
