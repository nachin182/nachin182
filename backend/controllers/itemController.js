const fetch = require('node-fetch')
const partNumbers = '3000000009241,3000000009243,2000380949768p,2000380825550p,3000000009237,2000382234701p,2000382234695p,2000382234664p,2000382234725p,2000382489934p,2000382489910p,2000382489927p,2000380272965p,2000383871721p,2000385135579p,2000383953090p,2000380219557p,2000383953106p,2000375925838p,2000369869551p,2000351387353p,2000379822812p,2000379463985p,2000383212142p,2000383539928p,2000383588797p,2000383539713p,2000383539911p,2000384814383p,2000383539706p,2000383212180p,2000383212166p,2000383539829p,2000380101944p,2000383406695p'
const url = `https://simple.ripley.cl/api/v2/products?partNumbers=${partNumbers},&format=json`
const urlRipley = 'https://simple.ripley.cl'

exports.getItems = (req, res ) => {
    fetch(url)
    .then((response)=> response.json())
    .then(data => {
        var items = data
        items = items.map((item) => {
            return {
                uniqueID: item.uniqueID,
                partNumber: item.partNumber,
                name: item.name,
                offerPrice:  item.prices.formattedOfferPrice,
                listPrice: item.prices.formattedListPrice,
				cardPrice: item.prices.formattedCardPrice,
                discount: item.prices.discountPercentage,
                ripleyPuntos: item.prices.ripleyPuntos,
                picture: item.fullImage,
                thumbnail: item.thumbnailImage,
				url: urlRipley+item.url,
                marca: item.attributes.find(attr => attr.name === 'Marca').value,
            }
        });
		
		// ordenando el array mapeado que contiene los valores reducidos
		items.sort(function(a, b) {
		  return  parseFloat(b.discount) - parseFloat(a.discount);
		});
		
        const list = {
            author: {
                name: 'Ignacio',
                lastname: 'Perez'
            },
            items: items
			
        }
        res.send(list);

    })
    .catch(err => console.log(err))
}