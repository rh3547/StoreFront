@echo off
c: && cd C:\Program Files\MongoDB\Server\3.4\bin
timeout /t 2
mongod --dbpath D:\Projects\Programming\StoreFront\StoreFrontAPI\data
PAUSE