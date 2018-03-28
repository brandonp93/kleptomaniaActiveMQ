/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.kleptomania.model;

import java.util.ArrayList;

/**
 *
 * @author xbran
 */
public class Room {
    
    public int roomNumber;
    public ArrayList<Player> players;
    public Player host;
    
    public Room(){
        
    }
    
    public Room(int roomNumber, Player host) {
        this.roomNumber = roomNumber;
        this.host = host;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Player getHost() {
        return host;
    }

    public void setHost(Player host) {
        this.host = host;
    }
    
    @Override
    public String toString() {
        return "Room{" + "roomNumber=" + roomNumber + ", host=" + host.getNickname() + '}';
    }
    
}
