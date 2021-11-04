package com.ELEC5620.MotionGame.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
// TODO: 弄清楚这个和Filter的区别
public class CrossOriginConfig implements WebMvcConfigurer {
    static final String ORIGINS[] = new String[]{"GET", "POST", "PUT", "DELETE", "OPTION"};

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        WebMvcConfigurer.super.addCorsMappings(registry);
//        registry.addMapping("/**").allowedOrigins("*").allowedOriginPatterns().allowedMethods(ORIGINS).maxAge(3600);
        registry.addMapping("/**")
                .allowedHeaders("*")
                .allowedMethods("*")
//                .allowedOrigins("http://localhost:8001")
                .allowedOriginPatterns("*")
                .allowCredentials(true);
    }
}
