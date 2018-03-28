/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.kleptomania.restcontrollers;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import edu.eci.arsw.kleptomania.model.Player;
import edu.eci.arsw.kleptomania.services.kleptomaniaServices;
import edu.eci.arsw.kleptomania.services.kleptomaniaServicesException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author xbran
 */

@RestController
@RequestMapping(value = "/lobby")
public class kleptomaniaAPIController {
    
    @Autowired
    kleptomaniaServices services;
    
    @Autowired
    SimpMessagingTemplate msgt;
    
    @RequestMapping(path = "/{roomNumber}/thief", method = RequestMethod.GET)
        public ResponseEntity<?> controllerGetThievesRoom(@PathVariable String roomNumber) throws kleptomaniaServicesException{
            try {
                    //obtener datos que se enviarán a través del API
                    return new ResponseEntity<>(services.getThieves(Integer.parseInt(roomNumber)),HttpStatus.ACCEPTED);
            } catch (kleptomaniaServicesException ex) {
                    Logger.getLogger(kleptomaniaServicesException.class.getName()).log(Level.SEVERE, null, ex);
                    return new ResponseEntity<>("Error GGEEEET" + ex,HttpStatus.NOT_FOUND);
            }  
        } 

    @RequestMapping(path = "/{room}/thief",method = RequestMethod.PUT)
    public ResponseEntity<?> addThief(@PathVariable String room,@RequestBody Player player) throws kleptomaniaServicesException {
        synchronized(services){
            try {
                System.out.println("PLAYER: " + player.getNickname());
                services.addThief(Integer.parseInt(room), player);
                List <Player> thief = services.getThieves(Integer.parseInt(room));
                msgt.convertAndSend("/topic/currentPlayers",thief);     
            } catch (kleptomaniaServicesException ex) {
                Logger.getLogger(kleptomaniaAPIController.class.getName()).log(Level.SEVERE, null, ex);
                return new ResponseEntity<>("ERRRROR PUT ",HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
    }
    
    @RequestMapping(path = "/{room}",method = RequestMethod.POST)
    public ResponseEntity<?> controllerPostRoom(@PathVariable String room) throws kleptomaniaServicesException {
        synchronized(services){
            try {
                services.addRoom(Integer.parseInt(room));  
            } catch (kleptomaniaServicesException ex) {
                Logger.getLogger(kleptomaniaAPIController.class.getName()).log(Level.SEVERE, null, ex);          
                return new ResponseEntity<>("ERRRROR POST ",HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
    }
    
}
