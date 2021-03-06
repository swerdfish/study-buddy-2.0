package com.studybuddy.config;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
	
	@Override
	public void configure(HttpSecurity http) throws Exception {
		http.cors().and()
			.headers().frameOptions().sameOrigin().and()
			.csrf().disable().authorizeRequests()
//		Probably unnecessary since this is just a REST API and we're not serving web pages
//			.antMatchers("/css/**", "/js/**", "/images/**", "/static/**", "/**/favicon.ico").permitAll()
			.antMatchers(HttpMethod.GET, "/ping", "/flashcardDeck/**", "/flashcardDecks/**").permitAll()
			.antMatchers(HttpMethod.POST, "/login", "/register", "/flashcardDeck/**", "/flashcardDecks/**").permitAll()
			.antMatchers(HttpMethod.PUT, "/flashcardDeck/**", "/flashcardDecks/**").permitAll()
			.antMatchers(HttpMethod.DELETE, "/flashcardDeck/**", "/flashcardDecks/**").permitAll()
			.antMatchers("/h2-console/**").permitAll()
			.antMatchers("h2-console/login.do**").permitAll()
			.antMatchers("/rest/**").permitAll()
			.antMatchers("/").permitAll()
			.anyRequest().authenticated();
	}
	
//	@Bean
//	CorsConfigurationSource corsConfigurationSource() {
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
//		return (CorsConfigurationSource) source;
//	}
	
}
