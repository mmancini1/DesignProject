import addToDB
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

#proclamation

#proc uses abbv which will cause the beer not to be found
def fixName(name):
    n = name.replace('Deriv:', 'Derivative:')
    return n

#vars
brewery = 'Proclamation Ale Company'
options = Options()
options.headless = True
beerObj=[]

#nav to url
driver = webdriver.Chrome(executable_path="/Users/MattMacbookPro/Desktop/chromedriver",options=options)
driver.get('https://proclamation-ale-company.square.site/shop/beer/2?page=1&limit=60&sort_by=popularity_score&sort_order=desc')
time.sleep(1)

try:
    #add beer to obj
    beerItem=driver.find_elements_by_class_name('category__products')
    for items in beerItem:
        for item in items.find_elements_by_class_name('w-product-title'):
            name = item.get_attribute('innerText')
            if not name in beerObj:
                beerObj.append(fixName(name))
finally:
    driver.quit()
    addToDB.addBeer(beerObj,brewery)
