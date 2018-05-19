/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.kleptomania.model;

/**
 *
 * @author xbran
 */
public class Player {

    String nickname;
    String identification;
    
    public Player(){
    
    }
    
    public String getIdentification() {
        return identification;
    }

    public void setIdentification(String identification) {
        this.identification = identification;
    }
    
    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    
    @Override
    public String toString() {
        return "Player{" + "nickname=" + nickname + ", identification=" + identification+ '}';
    }
    
}
