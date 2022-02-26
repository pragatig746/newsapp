const url ="https://api.spoonacular.com/recipes/findByNutrients?apiKey=a30b6a4e8070481282d392ddd8a6f220&minCarbs=10&maxCarbs=100"
const fetch= async ()=>{
    let data = await fetch(url)
    let parseddata = await data.json()
    console.log(parseddata)
}

