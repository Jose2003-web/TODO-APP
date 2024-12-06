const todoinput = document.querySelector("#todo-input");

const todos =   {};

todoinput.addEventListener("keyup", function (e))   {
    console.log(e.traget.value)
}
function changetheme()  {
    document.body.classList.toggle("light");
}