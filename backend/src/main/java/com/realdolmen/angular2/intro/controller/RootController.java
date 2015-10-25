package com.realdolmen.angular2.intro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class RootController {

	// This is in conjuction with the following configuration in the routing example:
	// in index-router.html: baseref = /app/
	// in main-router.ts: APP_BASE_HREF = /app/root (configuration for routing)
	@RequestMapping("/app/root/**")
	public String init() {
		return "/app/index-router.html";
	}

}
   