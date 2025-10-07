from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Chrome in headless mode for stability/CI

driver = webdriver.Chrome()
wait = WebDriverWait(driver, 10)

try:
    driver.get("http://localhost:3000/")
    # Wait for page title to contain 'React App'
    wait.until(EC.title_contains("React App"))
    assert "React App" in driver.title
    print(driver.title)

    # Interact with the form
    wait.until(EC.element_to_be_clickable((By.NAME, "addTodos"))).send_keys("New Todo Added")
    wait.until(EC.element_to_be_clickable((By.NAME, "Button"))).click()

    # Wait for success indicator and assert its text
    final_add = wait.until(EC.visibility_of_element_located((By.NAME, "Added")))
    assert "Todo added successfully!" in final_add.text
    
finally:
    driver.quit()
