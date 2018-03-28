/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.kleptomania.services;
import edu.eci.arsw.kleptomania.model.Player;
import java.util.List;

/**
 *
 * @author xbran
 */
public interface kleptomaniaServices {

    public void addThief(int roomNumber,Player p) throws kleptomaniaServicesException;

    public void addCops(int roomNumber,Player p) throws kleptomaniaServicesException;
    
    public void addRoom(int roomNumber) throws kleptomaniaServicesException;

    public List<Player> getThieves(int roomNumber) throws kleptomaniaServicesException;

    public List<Player> getCops(int roomNumber) throws kleptomaniaServicesException;

}
