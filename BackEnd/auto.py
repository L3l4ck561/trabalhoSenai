import pyautogui,keyboard,time
cod = 0

while True:
    if cod == 1:
        pyautogui.click()
        pyautogui.click()
        time.sleep(0)

    if keyboard.is_pressed('space') and cod == 0:
        cod = 1

    if keyboard.is_pressed('esc') and cod == 1:
        cod = 0



    if keyboard.is_pressed('x'):
        break
                                                                            