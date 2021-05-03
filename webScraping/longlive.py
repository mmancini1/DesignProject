import addToDB

#Long Live Beerworks


#vars
url='https://untappd.com/v/long-live-beerworks/4174253'
brewery="Long Live Beerworks"
beerObj=[]

#nav to url
soup = addToDB.getSoup(url)
products = soup('div', class_="beer-details")

#add beer to obj
for product in products:
    if products ==0:
        print('failed to get products for ' + brewery)

    name = product.find('a',class_='track-click').text
    p=product.find('a', class_='track-click').get('href')
    if not name in beerObj:
        beerObj.append(name)


addToDB.addBeer(beerObj,brewery)
