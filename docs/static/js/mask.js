document.getElementById("dtAdmissao").addEventListener("keypress", (e) => {
  console.log(e.target.value)
  if(e.target.value.length == 2){
    e.target.value += "/"
  }

  if(e.target.value.length == 5){
    e.target.value += "/"
  }
})

document.getElementById("dtDemissao").addEventListener("keypress", (e) => {
  console.log(e.target.value)
  if(e.target.value.length == 2){
    e.target.value += "/"
  }

  if(e.target.value.length == 5){
    e.target.value += "/"
  }
})
