from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome()
driver.get("https://the-internet.herokuapp.com/login")

time.sleep(3)

username = driver.find_element(By.ID, "username")
username.send_keys("tomsmith")


time.sleep(2)

password = driver.find_element(By.ID, "password")
password.send_keys("SuperSecretPassword!")

time.sleep(2)

login_button = driver.find_element(By.CSS_SELECTOR, "button.radius")
login_button.click()


time.sleep(4)

mensagem = driver.find_element(By.ID, "flash").text
print("Mensagem exibida:", mensagem)

driver.quit()
