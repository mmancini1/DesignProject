import addToDB

#Buttonwoods Brewery

#vars
brewery="Buttonwoods Brewery"
beerObj=[]
url='https://untappd.com/v/buttonwoods-brewery/5911498'

#nav to url
soup = addToDB.getSoup(url)
products = soup('div', class_="beer-details")


#loop through data and add beer items
for product in products:
    if products ==0:
        print('failed to get products for ' + brewery)
        
    p = product.find('a',class_='track-click').text
    if not p in beerObj:
        beerObj.append(p)


addToDB.addBeer(beerObj,brewery)


