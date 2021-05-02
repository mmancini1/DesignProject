from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from urllib.request import Request, urlopen
import pymongo
import datetime
import time
import pickle
import re
import os

## this will naviage to untapped and get each beer listed under a certain brewery. it will then populate my DB
## with each beer, rating, image, and other data that is listed on untappd.


#downloads image from untappd
def downloadImage(img):
    imgfile = urlopen(img)
    destinationPath = '/Users/MattMacbookPro/designProject/src/assets/images/' + brewery + '/' + name + '.jpeg'
    #write to destination
    with open(destinationPath,'wb') as output:
        output.write(imgfile.read())

#add to database
def addToDB():
    insertBeer={
            '$set':
                {
                    "name": name,
                    "abv": abv,
                    "ibu": ibu,
                    "rating": round(float(rating),2),
                    "price": "",
                    "description": description,
                    "brewery": brewery,
                    "date": "",
                    "style": style,
                }
            }
    myquery = { "name": name, "brewery": brewery }
    mycol.update_one(myquery,insertBeer,True)
    print('\nadded '+ name)




#db location
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
#db name
mydb = myclient["designProject"]
#collection name
mycol = mydb["beers"]


#sets options to make browser headless
options = Options()
options.headless = True
#nav to destination
driver = webdriver.Chrome(executable_path="/Users/MattMacbookPro/Desktop/chromedriver",options=options)
driver.get('https://untappd.com/')
#set cookies for login
cookies = pickle.load(open("cookies.pkl", "rb"))
for cookie in cookies:
    driver.add_cookie(cookie)


time.sleep(1)


#set brewery and url
brewery = 'Four Quarters Brewing'
driver.get('https://untappd.com/FourQuartersBrewing/beer')
time.sleep(1)


#create path if it doesn't already exist
try:
    os.mkdir('/Users/MattMacbookPro/designProject/src/assets/images/' + brewery + '/')
finally:
    try:
        #click 'show more' button until it no longer exists
        url=":more_beer"
        btn=driver.find_element_by_xpath('//a[@data-href="'+url+'"]')
        while btn.value_of_css_property("display")=='block':
            btn.click()
            time.sleep(1)
    finally:
        
        try:
            #get item
            beerItem=driver.find_elements_by_class_name('beer-item')
            for item in beerItem:
                beerNum=item.get_attribute('data-bid')
                image = item.find_element_by_tag_name('img').get_attribute('src')
                beerDetails=item.find_element_by_class_name('beer-details')
                name = beerDetails.find_element_by_class_name('name').get_attribute('innerText')
                name = re.sub('[@#$%*\\\/]','',name)
                style=beerDetails.find_element_by_class_name('style').get_attribute('innerText')
                description = beerDetails.find_element_by_class_name('desc-full-'+beerNum).get_attribute('innerText')
                description = description.replace(" Read Less","")
                details=item.find_element_by_class_name('details')
                abv = details.find_element_by_class_name('abv').get_attribute('innerText')
                ibu = details.find_element_by_class_name('ibu').get_attribute('innerText')
                downloadImage(image)
                #get rating - try and except because there are two different styles
                try:
                    rating = details.find_element_by_class_name('caps').get_attribute('data-rating')
                except:
                    rating = details.find_element_by_class_name('num').get_attribute('innerText')
                finally:
                    rating = re.sub('[\(\)]','',rating)
                    if rating == 'N/A':
                        rating = 0
                    addToDB()
        finally:
            driver.quit()





