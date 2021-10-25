package com.ELEC5620.MotionGame.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Collectors;

@Configuration
public class WebSecurityConfig extends WebMvcConfigurerAdapter {

    /**
     * 登录session key
     */
    public final static String SESSION_KEY = "userId";
    public final static Integer SESSION_EXTEND_SECOND = 1800;
    public final static String COOKIE_NAME_FOR_AUTH = "JSESSIONID";

    @Bean
    public SecurityInterceptor getSecurityInterceptor() {
        return new SecurityInterceptor();
    }

    public void addInterceptors(InterceptorRegistry registry) {
        InterceptorRegistration addInterceptor = registry.addInterceptor(getSecurityInterceptor());

        // 排除配置
        addInterceptor.excludePathPatterns("/error");
        addInterceptor.excludePathPatterns("/login**");
        addInterceptor.excludePathPatterns("/register**");

        // 拦截配置
        addInterceptor.addPathPatterns("/**");
    }

    private class SecurityInterceptor extends HandlerInterceptorAdapter {

        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
                throws Exception {
            return true;
//            HttpSession session = request.getSession();
//            Cookie[] cookies = request.getCookies();
//            if (cookies != null){
//                if (request.getCookies().length > 0) {
//                    Optional<Cookie> cookie = Arrays.stream(request.getCookies()).filter(c -> c.getName().equals(COOKIE_NAME_FOR_AUTH)).findFirst();
//                    if (!cookie.isEmpty()) {
//                        String getJSessionId = cookie.get().getValue();
//                        String aliveSessionId = session.getId();
//                        if (getJSessionId.equals(aliveSessionId)) {
//                            Integer userId = (Integer) session.getAttribute(SESSION_KEY);
//                            if (userId != null) {
//                                return true;
//                            }
//                        }
//                    }
//                }
//            }
//
//            // 跳转登录
//            response.setStatus(401);
////            String url = "/login";
////            response.sendRedirect(url);
//            return false;
        }
    }
}