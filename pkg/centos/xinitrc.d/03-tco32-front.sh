#!/bin/sh
if [ $USER = pos ]; then
    set +e
    /usr/bin/xterm -e /bin/bash -c "/usr/bin/xrandr > /tmp/xrandr.log"
    /usr/bin/xterm -e /bin/bash -c '/usr/bin/xrandr --newmode "1366x768_60.00" 85.25 1366 1440 1576 1784 768 771 781 798 -hsync +vsync'
    /usr/bin/xterm -e /bin/bash -c '/usr/bin/xrandr --newmode "568x1000_60.00"   46.25  568 600 656 744  1000 1003 1013 1038 -hsync +vsync'
    /usr/bin/xterm -e /bin/bash -c '/usr/bin/xrandr --newmode "1600x900_60.00"  118.25  1600 1696 1856 2112  900 903 908 934 -hsync +vsync'
    /usr/bin/xterm -e /bin/bash -c '/usr/bin/xrandr --newmode "1920x1080_60.00"  173.00  1920 2048 2248 2576  1080 1083 1088 1120 -hsync +vsync'
    /usr/bin/xterm -e /bin/bash -c "/usr/bin/xrandr --addmode Virtual1 1600x900_60.00"
    /usr/bin/xterm -e /bin/bash -c "/usr/bin/xrandr --output Virtual1 --mode 1600x900_60.00"
    /usr/bin/xterm -e /bin/bash -c "/usr/bin/xrandr --addmode HDMI1 1920x1080_60.00"
    /usr/bin/xterm -e /bin/bash -c "/usr/bin/xrandr --output HDMI1 --mode 1920x1080_60.00 --rotate left"
    /usr/bin/xterm -e /bin/bash -c "/usr/bin/xrandr --addmode VGA1 1920x1080_60.00"
    /usr/bin/xterm -e /bin/bash -c "/usr/bin/xrandr --output VGA1 --mode 1920x1080_60.00 --rotate left"

    /usr/bin/xterm -e /bin/bash -c "/usr/bin/xinput list > /tmp/xinput.log"
    /usr/bin/xterm -e /bin/bash -c "/usr/bin/xinput list-props 'TouchPlanet XTA' > /tmp/xinput-listprops-orig.log 2>/tmp/xinput-listprops.err.log"
    /usr/bin/xterm -e /bin/bash -c "/usr/bin/xinput set-int-prop 'TouchPlanet XTA' 'Evdev Axis Inversion' 8 1 0"
    # 0.5625 Был во второй строчке после разворота перенем ее в первую строку
    /usr/bin/xterm -e /bin/bash -c "/usr/bin/xinput set-prop 'TouchPlanet XTA' 'Coordinate Transformation Matrix' 0.5625 0 0  0 1 0  0 0 1"
    /usr/bin/xterm -e /bin/bash -c '/usr/bin/xinput set-int-prop "TouchPlanet XTA" "Evdev Axes Swap" 8 1'
    #/usr/bin/xterm -e /bin/bash -c '/usr/bin/xinput set-int-prop "TouchPlanet XTA" "Evdev Third Button Emulation" 8 0'
    #/usr/bin/xterm -e /bin/bash -c "/usr/bin/xinput_calibrator -v --precalib 0 1080 0 1920 --geometry 1080x1920 --output-type xinput > /tmp/cal.txt 2>/tmp/cal2.txt"
    /usr/bin/xterm -e /bin/bash -c "/usr/bin/xinput list-props 'TouchPlanet XTA' > /tmp/xinput-listprops.log 2>/tmp/xinput-listprops.err.log"

    set -e
    cd /tmp
    rm -rf ~/.cache/chromium
    rm -rf ~/.config/chromium
    # Экран ТСО32
    chromium http://127.0.0.1:5000/app/index.html --window-size=1060,1900 --start-fullscreen --kiosk --noerrdialogs --disable-translate --no-first-run --fast --fast-start --disable-infobars --disable-features=TranslateUI --disable-pinch --overscroll-history-navigation=0
    # Экран ТСО32 без киоска
    #chromium http://127.0.0.1:5000/app/index.html --window-size=1060,1900 --start-fullscreen --disable-translate --no-first-run --fast --fast-start -disable-features=TranslateUI
    # Экран Virtual Box
    #chromium http://127.0.0.1:5000/app/index.html --window-size=1580,880 --start-fullscreen --kiosk --noerrdialogs --disable-translate --no-first-run --fast --fast-start --disable-infobars --disable-features=TranslateUI
    exit
fi
