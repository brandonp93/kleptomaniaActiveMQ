/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.kleptomania.restcontrollers;

import edu.eci.arsw.kleptomania.model.Player;
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
    
    Object Lock = new Object();
    
    @MessageMapping("/teamPlayer.{roomNumber}")    
	public void handleteamEvent (String nickname,@DestinationVariable String roomNumber) throws Exception {
		System.out.println("Nuevo nickname en el servidor!: "+nickname);
                services.changeTeam(Integer.parseInt(roomNumber), nickname);
		msgt.convertAndSend("/topic/teamChange."+roomNumber, nickname);
	}
        
        //cuando el jugador se mueve envia un envento con su nueva posicion y aca se va a validar y enviar al cliente
        @MessageMapping("/position.{roomNumber}")    
	public void handleRoomPosition (Player p,@DestinationVariable String roomNumber) throws Exception {
            //Sincronizar
		System.out.println("Player: " + p.getNickname() +" id: " +p.getIdentification()+ " team: " + p.getTeam() +" x: "+ p.getThisxpos()+ "  y: " + p.getThisypos());
                //enviar posicion a la que se va a mover el jugardor
		msgt.convertAndSend("/topic/colorized."+roomNumber, p);
	}
    
}
