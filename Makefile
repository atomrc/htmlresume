JSDIR = src/
BUILTDIR = js/
COMPRESSOR = yuicompressor/yuicompressor-2.4.6.jar
FILENAME = general.js
MINFILENAME = general-min.js

all:$(JSDIR)config.js $(JSDIR)main.js $(JSDIR)Model.js $(JSDIR)Views.js $(JSDIR)Controllers.js $(JSDIR)Utils.js
	cat $^ > $(BUILTDIR)$(FILENAME)

min: all 
	java -jar $(COMPRESSOR) $(BUILTDIR)$(FILENAME) > $(BUILTDIR)$(MINFILENAME) 
clean:
	rm $(BUILTDIR)$(FILENAME) $(BUILTDIR)$(MINFILENAME)
