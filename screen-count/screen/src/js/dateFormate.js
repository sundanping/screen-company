//
export function dateFormate(n) {
  let year=n.getFullYear()
  let mouth = n.getMonth()
  let day = n.getDate()
  if(mouth<9){
    mouth='0'+(mouth*1+1)
  }else{
    mouth = mouth*1+1
  }
  if(day<10){
    day='0'+day
  }
  return year+'-'+mouth+'-'+day
}
