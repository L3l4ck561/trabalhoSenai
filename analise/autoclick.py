import pyautogui
import keyboard
import time

clicking = False

print("Auto clicker pronto. Pressione 'ctrl+z' para ativar/desativar. Ctrl+C para sair.")

try:
    while True:
        if keyboard.is_pressed('ctrl+z'):
            clicking = not clicking
            print("Auto clicker ativado." if clicking else "Auto clicker desativado.")
            time.sleep(0.5)

        if clicking:
            pyautogui.click()
            time.sleep(0)

except KeyboardInterrupt:
    print("\nAuto clicker encerrado.")
