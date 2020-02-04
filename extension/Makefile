.PHONY: all build build-chrome

TSC:=tsc

all: build build-chrome
build: dist/quickapply.xpi
build-chrome: dist/quickapply.crx

dist/quickapply.xpi: src/app.js src/db.js src/index.js src/init.js src/ interview.svg manifest.json popup.html pouchdb-7.1.1.min.js 
	zip $@ $+

dist/quickapply.crx: src/app.js src/db.js src/index.js src/init.js src/ interview.svg manifest.json popup.html pouchdb-7.1.1.min.js 
	zip $@ $+

