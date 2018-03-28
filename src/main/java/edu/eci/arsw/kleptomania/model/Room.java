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
    
    public Room(int roomNumber) {
        this.roomNumber = roomNumber;
    }
    
    
    
}
