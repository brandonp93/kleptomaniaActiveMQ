/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.kleptomania.restcontrollers;

import edu.eci.arsw.kleptomania.services.kleptomaniaServices;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 *
 * @author xbran
 */
@Controller
public class STOMPMessagesHandler {
    
    @Autowired
    SimpMessagingTemplate msgt;
    
    @Autowired
    kleptomaniaServices services;

    @MessageMapping("/teamPlayer.{roomNumber}")    
	public void handleteamEvent (String nickname,@DestinationVariable String roomNumber) throws Exception {
		System.out.println("Nuevo nickname en el servidor!: "+nickname);
                services.changeTeam(Integer.parseInt(roomNumber), nickname);
		msgt.convertAndSend("/topic/teamChange."+roomNumber, nickname);
	}
    
    
}
