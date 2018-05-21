/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.kleptomania.services;

import edu.eci.arsw.kleptomania.model.Player;
import edu.eci.arsw.kleptomania.model.Room;
import edu.eci.arsw.kleptomania.model.Team;
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
    
    private final ConcurrentHashMap<Integer, Room> rooms = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<Integer, CopyOnWriteArrayList<Player>> players = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<Integer, CopyOnWriteArrayList<Player>> thieves = new ConcurrentHashMap<>();
    private final ConcurrentHashMap<Integer, CopyOnWriteArrayList<Player>> cops = new ConcurrentHashMap<>();
    
    @Override
    public void addThief(int roomNumber, Player player) throws kleptomaniaServicesException {
        /*if (!players.containsKey(player.getIdentification())) {
            
        } else {
           throw new kleptomaniaServicesException("This player have been joined already " + player);
        }*/
        players.get(roomNumber).add(player); 
        thieves.get(roomNumber).add(player);
        int a = 64+thieves.get(roomNumber).size();
        System.out.println("Prueba print");
        String nickname = player.getNickname();
        player.setTeam("T");
        String equipo = player.getTeam();
        System.out.println("identification Thief: " + a + " p: " + nickname + " team: " + equipo);   
        player.setIdentification(Character.toString ((char) a));
        
    }


    @Override
    public void addCops(int roomNumber, Player player) throws kleptomaniaServicesException {
        players.get(roomNumber).add(player);
        cops.get(roomNumber).add(player);
        int a = 96+cops.get(roomNumber).size();
        System.out.println("Prueba print COPS");
        String nickname = player.getNickname();
        player.setTeam("C");
        System.out.println("identification COP: " + a + " p COP: " + nickname );   
        player.setIdentification(Character.toString ((char) a));
        
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
    public void addRoom(int roomNumber, Room r) throws kleptomaniaServicesException {
        if (rooms.containsKey(roomNumber)) {
            throw new kleptomaniaServicesException("This room have been created already " + roomNumber);
        } else {
            rooms.put(roomNumber,r);
            CopyOnWriteArrayList<Player> temp = new CopyOnWriteArrayList();
            CopyOnWriteArrayList<Player> temp1 = new CopyOnWriteArrayList();
            CopyOnWriteArrayList<Player> temp2 = new CopyOnWriteArrayList();
            Player firstPlayer = r.getHost();
            cops.put(roomNumber, temp1);
            players.put(roomNumber,temp);
            thieves.put(roomNumber, temp2);
            addThief(roomNumber, firstPlayer);
            System.out.println("COps size should be 0: "+ cops.get(roomNumber).size());
            for(Integer p: players.keySet()){
                String key =p.toString();
                CopyOnWriteArrayList<Player> value = players.get(p);  
                for(Player u: value){
                    System.out.println(key + " " + u.getNickname() + " aca");  
                }
                
            }
        }
    }
    
    @Override
    public CopyOnWriteArrayList<Room> getCurrentRooms() throws kleptomaniaServicesException{
        System.out.println("rooms api: " + rooms.keys());
        if(!rooms.isEmpty()){
            CopyOnWriteArrayList<Room> currentRooms = new CopyOnWriteArrayList();
            for(Room r: rooms.values()){
                currentRooms.add(r);
            }
            return currentRooms;
        }
        else{
            throw new kleptomaniaServicesException("There are no rooms");
        }
    }

    @Override
    public String getId(int roomNumber, String nickname) throws kleptomaniaServicesException{
        CopyOnWriteArrayList<Player> currentRoomPlayers = players.get(roomNumber);
        String id = null;
        for (Player p : currentRoomPlayers) {
            if(p.getNickname().contentEquals(nickname)){
                id = p.getIdentification();
            }
        }
        return id;

    }

    @Override
    public void changeTeam(int roomNumber, String nickname) throws kleptomaniaServicesException {
        System.out.println("Cambio de equipo");
        CopyOnWriteArrayList<Player> currentRoomPlayers = players.get(roomNumber);
        for(Player p: currentRoomPlayers){
            System.out.println("Buscando jugador");
            if(p.getNickname().equals(nickname)){
                System.out.println("Jugador a Cambiar: " + p.getNickname());
                if(p.getTeam().equals("T")){
                    System.out.println("old team: " + p.getTeam());
                    addCops(roomNumber, p);
                    deleteThief(roomNumber, p);
                    System.out.println("new team: " + p.getTeam());
                    
                }
                else{
                    addThief(roomNumber, p);
                    deleteCop(roomNumber, p);
                    
                }
            }
        }
    }

   
    private void deleteThief(int roomNumber, Player player) throws kleptomaniaServicesException {
        players.get(roomNumber).remove(player);
        thieves.get(roomNumber).remove(player);
    }

    private void deleteCop(int roomNumber, Player player) throws kleptomaniaServicesException {
        players.get(roomNumber).remove(player);
        cops.get(roomNumber).remove(player);
    }

    @Override
    public void obliterate() throws kleptomaniaServicesException {
        System.out.println("Cleaning Data.....");
        players.clear();
        cops.clear();
        thieves.clear();
    }

    @Override
    public List<Player> getPolicias(int roomNumber) throws kleptomaniaServicesException {
        if(rooms.containsKey(roomNumber)){
            return cops.get(roomNumber);
        }
        else{
            throw new kleptomaniaServicesException("This room doesn't exist " + roomNumber);
        }    }

    @Override
    public List<Player> getLadrones(int roomNumber) throws kleptomaniaServicesException {
        if(rooms.containsKey(roomNumber)){
            return thieves.get(roomNumber);
        }
        else{
            throw new kleptomaniaServicesException("This room doesn't exist " + roomNumber);
        }
    }

}
