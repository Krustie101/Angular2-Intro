package com.realdolmen.angular2.intro.configuration;

import java.io.File;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
@ComponentScan(value={"com.realdolmen.angular2.intro"})
public class ServletApplicationContextConfig extends WebMvcConfigurerAdapter {

	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
		// TODO: add this to dev profile
		String currentPath = new File(".").getAbsolutePath();
		currentPath = "file:///" + currentPath;
		// This one adds a link to the distribution folder
		registry.addResourceHandler("/app/**")
				.addResourceLocations(currentPath + "/../frontend/dist/");
		// This one adds a link to the sources folder for debugging in the browser. This must be configured in conjuction
		// with the following configuration in tsconfig.json file: 
		// "sourceMap": true  -> generate source maps so that we can link js with ts files for debugging
        // "sourceRoot": "/app-src" -> same as configured below (this way we get a clean separation between js files and ts files on the client)
	    registry.addResourceHandler("/app-src/**")
        		.addResourceLocations(currentPath + "/../frontend/src/");
    }
}
