package it.inc.org.spring.configuration;

import it.inc.org.spring.dao.EventDao;
import it.inc.org.spring.dao.EventDaoImpl;
import it.inc.org.spring.dao.TypeDao;
import it.inc.org.spring.dao.TypeDaoImpl;
import it.inc.org.spring.dao.UserDao;
import it.inc.org.spring.dao.UserDaoImpl;
import it.inc.org.spring.service.EventService;
import it.inc.org.spring.service.EventServiceImpl;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;
 
@Configuration
@ComponentScan(basePackages = "it.inc.org.spring")
@EnableWebMvc
public class AppConfig {
 
	 @Bean
	   public static PropertySourcesPlaceholderConfigurer properties() {
	      return new PropertySourcesPlaceholderConfigurer();
	   }
	 
	 @Bean
	 public InternalResourceViewResolver  configureViewResolver() {
		 InternalResourceViewResolver  viewResolve = new InternalResourceViewResolver ();
	     viewResolve.setPrefix("/WEB-INF/jsp/");
	     viewResolve.setSuffix(".jsp");
	     viewResolve.setViewClass(JstlView.class);
	     System.out.println("setting: "+viewResolve.getClass());
	     return viewResolve;
	 }
	 
	 @Bean
	 public TypeDao typeDao(){return new TypeDaoImpl();}
	 
	 @Bean
	 public EventDao eventDao(){return new EventDaoImpl();}

	 @Bean
	 public UserDao userDao(){return new UserDaoImpl();}
	 
	 @Bean
	 public EventService eventService(){return new EventServiceImpl();}
	
}