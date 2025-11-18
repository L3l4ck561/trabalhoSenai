from selenium import webdriver
from selenium.webdriver.common.by import By
import time


driver = webdriver.Chrome()


driver.get("https://www.python.org")


time.sleep(2)


print("Título da página:", driver.title)


search_box = driver.find_element(By.NAME, "q")
search_box.send_keys("Selenium")


search_box.submit()

time.sleep(2)


results = driver.find_elements(By.CLASS_NAME, "list-recent-events")
for result in results:
    print(result.text)


driver.quit()
