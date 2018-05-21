/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.kleptomania.services;
import edu.eci.arsw.kleptomania.model.Player;
import edu.eci.arsw.kleptomania.model.Room;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 *
 * @author xbran
 */
public interface kleptomaniaServices {

    public void addThief(int roomNumber,Player player) throws kleptomaniaServicesException;

    public void addCops(int roomNumber,Player player) throws kleptomaniaServicesException;
    
    public void addRoom(int roomNumber, Room r) throws kleptomaniaServicesException;

    public List<Player> getThieves(int roomNumber) throws kleptomaniaServicesException;

    public List<Player> getPolicias(int roomNumber) throws kleptomaniaServicesException;
    
    public List<Player> getLadrones(int roomNumber) throws kleptomaniaServicesException;
    
    public CopyOnWriteArrayList<Room> getCurrentRooms() throws kleptomaniaServicesException;

    public String getId (int roomNumber,String nickname) throws kleptomaniaServicesException;
    
    public void changeTeam(int roomNumber,String nickname) throws kleptomaniaServicesException;
        
    public void obliterate () throws kleptomaniaServicesException;
    
    public String getPlayerTeam(int roomNumber,String nickname) throws kleptomaniaServicesException;
}
