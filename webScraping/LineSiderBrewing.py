import addToDB

#LineSider Brewing

#vars
brewery="LineSider Brewing Company"
beerObj=[]
url='https://www.linesiderbrewing.com/on-tap-index'

#nav to url
soup = addToDB.getSoup(url)
products = soup('td', class_="onTapBeerNameRow")

#add beers to obj
for product in products:
    name = product.text.strip()
    if not name in beerObj:
        beerObj.append(name)



addToDB.addBeer(beerObj,brewery)
