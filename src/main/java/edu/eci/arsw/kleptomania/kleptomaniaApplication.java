package edu.eci.arsw.kleptomania;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author xbran
 */

@SpringBootApplication
@ComponentScan(basePackages = {"edu.eci.arsw.kleptomania"})
public class kleptomaniaApplication {

    public static void main(String[] args) {
        SpringApplication.run(kleptomaniaApplication.class, args);
    }
    
}
