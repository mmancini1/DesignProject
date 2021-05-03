import addToDB
import re

#tilted barn

def fixName(name):
    n=re.sub('[\\\/]', '', name)
    n=re.sub('[(]', '\\(', n)
    n=re.sub('[)]', '\\)', n)
    return n

#vars
url='https://untappd.com/v/tilted-barn-brewery/2296372'
brewery="Tilted Barn Brewery"
beerObj=[]

#nav to url
soup = addToDB.getSoup(url)
products = soup('div', class_="beer-details")

#loop through data
for product in products:
    if products ==0:
        print('failed to get products for ' + brewery)
    #add beers to obj
    name = product.find('a',class_='track-click').text
    p=product.find('a', class_='track-click').get('href')
    name = fixName(name)
    if not name in beerObj:
        beerObj.append(name)


addToDB.addBeer(beerObj,brewery)
