bootstrap: install_deps deploy

install_deps:
	sudo apt-get install -y npm nodejs
	-sudo ln -s /usr/bin/nodejs /usr/bin/node
	npm install
	./node_modules/bower/bin/bower install
	curl https://raw.githubusercontent.com/CKGrafico/jQuery_HandlebarsJS/master/js/functions/jquery.loadFromTemplate.min.js > assets/scripts/jquery.loadFromTemplate.min.js

deploy:
	-cp ./bower_components/handlebars/handlebars.min.js assets/scripts/handlebars.min.js
	-cp ./bower_components/jquery/dist/jquery.min.js assets/scripts/jquery.min.js
	-cp ./bower_components/underscore/underscore-min.js assets/scripts/underscore.min.js
