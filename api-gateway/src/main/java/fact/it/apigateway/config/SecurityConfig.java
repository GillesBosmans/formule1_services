package fact.it.apigateway.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity serverHttpSecurity) {
        serverHttpSecurity
                .securityMatcher(ServerWebExchangeMatchers.anyExchange())
                .authorizeExchange(exchange -> exchange
                        .pathMatchers(HttpMethod.GET, "/teams", "/drivers", "/tracks", "/result/{id}").permitAll()
                        .anyExchange().authenticated()
                )
                .csrf(csrf -> csrf.csrfTokenRepository(null))  // Disable CSRF
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(withDefaults())
                );
        return serverHttpSecurity.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:5173");  // Allow frontend requests
        corsConfig.addAllowedOrigin("http://localhost:3000");  // Allow frontend requests
        corsConfig.addAllowedMethod("*");                     // Allow all HTTP methods
        corsConfig.addAllowedHeader("*");                    // Allow all headers
        corsConfig.setAllowCredentials(true);                // Allow cookies/tokens

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfig);
        return source;
    }
}
