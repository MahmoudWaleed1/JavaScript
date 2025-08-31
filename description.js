const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'c4e437d1d5mshf2b933321233503p1b5da9jsn180f889f34db',
		'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
	}
};
export default class description{
    async getSingleGame(id){
        const response  = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/game?id='+id, options)
        const data = await response.json()
        return data
    }
}