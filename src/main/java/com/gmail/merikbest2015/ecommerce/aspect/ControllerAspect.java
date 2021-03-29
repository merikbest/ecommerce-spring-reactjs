package com.gmail.merikbest2015.ecommerce.aspect;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Slf4j
@Component
public class ControllerAspect {

    @Pointcut(value = "execution(* com.gmail.merikbest2015.ecommerce.controller.*.*(..))")
    public void executeLogging() {
    }

    @Around("executeLogging()")
    public Object loggingAround(ProceedingJoinPoint joinPoint) throws Throwable {
        ObjectMapper mapper = new ObjectMapper();
        Object[] args = joinPoint.getArgs();
        Object proceed = joinPoint.proceed();
        String className = joinPoint.getTarget().getClass().toString();
        String methodName  = joinPoint.getSignature().getName();
        log.info(className + " : " + methodName + "() " + "Request: " + mapper.writeValueAsString(args));
        log.info(className + " : " + methodName + "() " + "Response: " + mapper.writeValueAsString(proceed));
        return proceed;
    }
}
