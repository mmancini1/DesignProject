import sys
sys.path.append('/Library/Frameworls/Python.framework/Versions/3.9/lib/python3.9/site-packages')
import bs4 as bs
from urllib.request import Request, urlopen
import pymongo
import datetime
import re


def contains_word(s, w):
    return f' {w} ' in f' {s} '

#downloads image from untappd
def downloadImage(img, name, brewery):
    imgfile = urlopen(img)
    destinationPath = '/Users/MattMacbookPro/designProject/src/assets/images/' + brewery + '/' + name + '.jpeg'
    #write to destination
    with open(destinationPath,'wb') as output:
        output.write(imgfile.read())
    print('added photo of ' + name)
        
#use beautiful soup to parse site
def getSoup(url):
    req = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    source = urlopen(req).read()
    return bs.BeautifulSoup(source,'lxml')

#check if item exists in my db
def checkDB(n,b):
    myquery = { "searchName": n.lower(), "brewery": b }
    return mycol.find_one(myquery)

#update item
def updateBeer(found):
    mycol.update_one(found,{'$set':{'date':date},'$push':{'previousDate':date}})

#remove 'show less' from description
def fixDescription(desc):
    if 'Show Less' in desc:
        return desc.replace('Show Less','')
    
#check unTappd for beer
def getTappd(brewery, beer):
    global abv, ibu, rating, style, description
    url='https://untappd.com/search?q='
    baseUrl = 'https://untappd.com'
    searchBeer=brewery+" "+beer.encode('ascii', 'ignore').decode('ascii')
    searchBeer=searchBeer.replace(" ","+")
    soup=getSoup(url+searchBeer)
    link = soup.find('p',class_="name")
    if link:
        ratingPage=link.find('a').get('href')
        soup=getSoup(baseUrl+ratingPage)
        basic = soup.find('div',class_='basic')
        img = basic.find('a',class_='label').find('img').get('src')
        downloadImage(img, beer, brewery)
        description = soup.find('div',class_='beer-descrption-read-less').text
        description = fixDescription(description)
        detail = soup.find('div',class_='details')
        abv = detail.find('p', class_='abv').string.strip()
        ibu = detail.find('p', class_='ibu').string.strip()
        rating = detail.find('div', class_='caps').get('data-rating')
        style = soup.find('p',class_='style').string
        return True
    return False

#set db and date
def setUp():
    global mycol, date
    #db location
    myclient = pymongo.MongoClient("mongodb://localhost:27017/")
    #db name
    mydb = myclient["designProject"]
    #collection name
    mycol = mydb["beers"]
    date = datetime.datetime.now().strftime("%x")

#clear variables 
def clearVars():
    global price, abv, ibu, rating, style
    price=None
    abv=None
    ibu=None
    rating=None
    style=None

#main entry - adds beer to db
def addBeer(names,brewery):
    #vars
    print('started ' + brewery)
    setUp()
    notFoundBeers=[]
    isFound = False
    #loop through each beer item
    for name in names:
        clearVars()
        name = name.strip()
        length=len(name.rsplit(" "))
        count=0
        found = None
        #loop through name string - sometimes beers have added phrases that don't match
        #what is listed in my db as well as untappd
        while not found and count < length:
            n=name.rsplit(" ",count)[0]
            found=checkDB(n, brewery)
            count+=1
            if found:
                if found['date'] != date:
                    updateBeer(found)
                break 
        #if beer is not found in my db
        if not found:
            #check untappd
            isFound=getTappd(brewery,n)
            if isFound:
                print('added - '+n)
                #create obj
                insertBeer={
                            '$set':
                                {
                                    "name": n,
                                    "abv": abv,
                                    "ibu": ibu,
                                    "rating": round(float(rating),2),
                                    "price": price,
                                    "description": description,
                                    "brewery": brewery,
                                    "date": date,
                                    "style": style,
                                },
                            '$push':
                                {
                                    'previousDate': date
                                }
                            }
                myquery = { "name": n, "brewery": brewery }
                mycol.update_one(myquery,insertBeer,True)
                break
            else:
                notFoundBeers.append(name)
    #alert that a beer was not found
    print(notFoundBeers)


                                




