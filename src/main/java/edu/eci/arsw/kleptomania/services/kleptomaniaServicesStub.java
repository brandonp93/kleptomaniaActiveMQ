/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.kleptomania.services;

import edu.eci.arsw.kleptomania.model.Player;
import edu.eci.arsw.kleptomania.model.Room;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;
import org.springframework.stereotype.Service;

/**
 *
 * @author xbran
 */
@Service
public class kleptomaniaServicesStub implements kleptomaniaServices{
    
    private ConcurrentHashMap<Integer, Room> rooms = new ConcurrentHashMap<>();
    private ConcurrentHashMap<Integer, CopyOnWriteArrayList<Player>> players = new ConcurrentHashMap<>();


    
    @Override
    public void addThief(int roomNumber, Player player) throws kleptomaniaServicesException {
        /*if (!players.containsKey(player.getIdentification())) {
            players.get(1).add(player);  
        } else {
           throw new kleptomaniaServicesException("This player have been joined already " + player);
        }*/
        Player p = new Player();
        p.setNickname("UAN");
        players.get(1).add(p); 
    }

    @Override
    public void addCops(int roomNumber, Player p) throws kleptomaniaServicesException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public List<Player> getThieves(int roomNumber) throws kleptomaniaServicesException {
        if(rooms.containsKey(roomNumber)){
            return players.get(roomNumber);
        }
        else{
            throw new kleptomaniaServicesException("This room doesn't exist " + roomNumber);
        }
        
    };

    @Override
    public List<Player> getCops(int roomNumber) throws kleptomaniaServicesException {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    public void addRoom(int roomNumber) throws kleptomaniaServicesException {
        if (rooms.containsKey(roomNumber)) {
            throw new kleptomaniaServicesException("This room have been created already " + roomNumber);
        } else {
            rooms.put(roomNumber,new Room(roomNumber));
            players.put(roomNumber, new CopyOnWriteArrayList());
        }
    }
   
}
