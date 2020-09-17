#!/bin/sh
if [ $# -eq 0 ]; then
    # Не указано имя файла
    exit 1
fi

# create backup
if [ ! -f $1.orig ]; then
echo $1
    cp $1 $1.orig
fi

sed -i "s|ScreenSaverDelay=.*|ScreenSaverDelay=0|g" $1
sed -i "s|LockerDpmsOffTimeout=.*|LockerDpmsOffTimeout=0|g" $1
