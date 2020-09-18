package com.studybuddy.config;

import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.studybuddy.filter.FlashcardDeckFilter;
import com.studybuddy.filter.UserFilter;

@Configuration
public class Filters {
	
	private final UserFilter userFilt;
	private final FlashcardDeckFilter fdFilt;
	
	@Autowired
	public Filters(UserFilter userFilt, FlashcardDeckFilter fdFilt) {
		this.userFilt = userFilt;
		this.fdFilt = fdFilt;
	}
	
	@Bean
	public FilterRegistrationBean<UserFilter> userRegistrationBean() {
		FilterRegistrationBean<UserFilter> filterRegistrationBean = new FilterRegistrationBean<UserFilter>();
		filterRegistrationBean.setFilter(this.userFilt);
		filterRegistrationBean.setUrlPatterns(Arrays.asList("/login/*", "/register/*"));
		return filterRegistrationBean;
  }
	
	@Bean
	public FilterRegistrationBean<FlashcardDeckFilter> fDeckRegistrationBean() {
	    FilterRegistrationBean<FlashcardDeckFilter> filterRegistrationBean = new FilterRegistrationBean<FlashcardDeckFilter>();
	    filterRegistrationBean.setFilter(this.fdFilt);
	    filterRegistrationBean.setUrlPatterns(Arrays.asList("/flashcardDeck/*", "/flashcardDecks/*"));
	    return filterRegistrationBean;
  }

}
