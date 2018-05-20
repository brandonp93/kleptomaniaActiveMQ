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
    String team;
    String thisxpos;
    String thisypos;
    String thisvx;
    String thisvy;

    public String getThisvx() {
        return thisvx;
    }

    public void setThisvx(String thisvx) {
        this.thisvx = thisvx;
    }

    public String getThisvy() {
        return thisvy;
    }

    public void setThisvy(String thisvy) {
        this.thisvy = thisvy;
    }
    
    
    public String getThisxpos() {
        return thisxpos;
    }

    public void setThisxpos(String thisxpos) {
        this.thisxpos = thisxpos;
    }

    public String getThisypos() {
        return thisypos;
    }

    public void setThisypos(String thisypos) {
        this.thisypos = thisypos;
    }
   
    
    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

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
        return "Player{" + "nickname=" + nickname + ", identification=" + identification+ ", team=" + team + ", thisposx=" +  thisxpos + ", thisposy="+ thisypos + ", thisvx=" + thisvx + ", thisvy=" + thisvy +'}';
    }
    
}
