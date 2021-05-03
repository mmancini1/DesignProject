import addToDB
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time

#Tree house

#vars
brewery = 'Tree House Brewing Company'
options = Options()
options.headless = True
beerObj=[]
#web elements on page
ids= ['category-4334','category-4332']

#nav to webpage
driver = webdriver.Chrome(executable_path="/Users/MattMacbookPro/Desktop/chromedriver",options=options)
driver.get('https://orders.treehousebrew.com/oa/order/menu')
time.sleep(2)


try:
    #loop through tables to get each can/bottle available
    for i in ids:
        beerItems=driver.find_element_by_id(i)
        beerItem = beerItems.find_elements_by_class_name('menu-list__items')
        for items in beerItem:
            for item in items.find_elements_by_class_name('menu-list__item-header'):
                name = item.find_element_by_class_name('no-wrap-ellipsis').get_attribute('innerText')
                beerObj.append(name.split(' [')[0])
finally:
    driver.quit()
    addToDB.addBeer(beerObj,brewery)
