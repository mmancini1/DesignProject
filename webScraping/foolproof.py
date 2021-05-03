import addToDB
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

#check if list of strings are included in the name to be removed
def checkInclude(name):
    for n in includeNames:
        if n in name:
            return True
    return False

def updateObj(name):
    if not name in beerObj:
        if checkInclude(name):
        name = name.split(' | ')
        name = name[0]
        beerObj.append(name)

#Foolproof Brewing Company

#vars
brewery="Foolproof Brewing Company"
options = Options()
options.headless = True
beerObj=[]
includeNames=['Pack']

#nav to url
driver = webdriver.Chrome(executable_path="/Users/MattMacbookPro/Desktop/chromedriver",options=options)
driver.get('https://foolproofbrewing.square.site')
time.sleep(1)

try:
    #loop through data to add obj
    beerItem=driver.find_elements_by_class_name('grid__item')
    for items in beerItem:
        name = items.find_element_by_class_name('w-product-title').get_attribute('innerText')
        inStock = items.find_elements_by_class_name('stock-tag')
        #this site has a warning if a beer is out of stock or in low supply
        if inStock:
            #makes sure beer is not out of stock - adds beer
            if inStock[0].get_attribute('innerText') != 'Out of stock':
                updateObj(name)
        #no warning - add beer
        else:
            updateObj(name)

finally:
    driver.quit()
    addToDB.addBeer(beerObj,brewery)
