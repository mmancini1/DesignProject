import addToDB

#Apponaug Brewing

#vars
brewery="Apponaug Brewing Company"
beerObj=[]
ignore=['64 oz. Growlers']
changeNames=['Ursus on Nitro','Ursus (Nitro)']
url='https://www.apponaugbrewing.com/home#on-tap'

#nav to url
soup = addToDB.getSoup(url)
products = soup('div', class_="menu-item-title")

#loop through data and add items
for product in products:
    p = product.text
    if not p in beerObj and not p in ignore:
        beerObj.append(p)


addToDB.addBeer(beerObj,brewery)
