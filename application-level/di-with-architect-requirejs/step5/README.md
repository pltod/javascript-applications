WHAT IS DEMONSTRATED ON THIS STEP
---------------------------------
- AMD modules loaded with Architect -> Cloud9 Architect on client side
- Programatically configured Architect plugins
- How to make facade-s to different implementation mechanisms:
	Example: 
		-> MVC mechanism (the implementation) - Backbone
		-> The Facade (or the stable interface used across the application) - realized with mvc Architect Plugin
		-> The Consumer - app.js
	
	So if we change the Backbone implementation with another it will reflect only the Facade without breaking the  
	application workflow. 
	
