.PHONY: bootstrap install_deps install_pure css_build js_build deploy

bootstrap: install_deps install_pure deploy

install_deps:
	sudo apt-get install -y npm nodejs
	-sudo ln -s /usr/bin/nodejs /usr/bin/node
	npm install
	./node_modules/bower/bin/bower install

install_pure:
	cd ./bower_components/purecss/ && npm install

css_build:
	cd ./bower_components/purecss/ && ./node_modules/grunt-cli/bin/grunt
	-cp -R ./bower_components/purecss/build/*-min.css assets/css/pure/


js_build:
	curl https://raw.githubusercontent.com/CKGrafico/jQuery_HandlebarsJS/master/js/functions/jquery.loadFromTemplate.min.js > assets/scripts/jquery.loadFromTemplate.min.js
	-cp ./bower_components/handlebars/handlebars.min.js assets/scripts/handlebars.min.js
	-cp ./bower_components/jquery/dist/jquery.min.js assets/scripts/jquery.min.js
	-cp ./bower_components/underscore/underscore-min.js assets/scripts/underscore.min.js
	-cp ./bower_components/underscore/underscore-min.js assets/scripts/underscore.min.js

deploy: js_build css_build
