import addToDB


#Whalers Brewery

#navigate to url and process data
url='https://whalers.com/on-tap'
soup = addToDB.getSoup(url)
products = soup('div', class_="recipe col-lg-4")

brewery="Whalers Brewing Company"
beerObj=[]
#loop through web elements to get each beer
for product in products:
    if products ==0:
        print('failed to get products for ' + brewery)
    #get name and append to obj
    p = product.text.strip().split(chr(10))
    name = p[0].strip()
    if not name in beerObj:
        beerObj.append(name)
#send list of beer names and brewery to be added to db
addToDB.addBeer(beerObj,brewery)
