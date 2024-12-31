// src/main/java/com/example/minigame/entity/GameInfo.java
package kh.react.board.minigame.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "game_info")
public class GameInfo {
    @Id
    private String id;

    @Column(name = "game_name")
    private String name;

    @Column(name = "game_path")
    private String path;

    @Column(name = "game_description")
    private String description;

    @Column(name = "reg_dt")
    @Temporal(TemporalType.DATE)
    private Date regDt;

    @Column(name = "reg_id")
    private String regId;

    @Column(name = "mod_dt")
    @Temporal(TemporalType.DATE)
    private Date modDt;

    @Column(name = "mod_id")
    private String modId;

    @Column(name = "use_yn")
    private String useYn;

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getRegDt() {
        return regDt;
    }

    public void setRegDt(Date regDt) {
        this.regDt = regDt;
    }

    public String getRegId() {
        return regId;
    }

    public void setRegId(String regId) {
        this.regId = regId;
    }

    public Date getModDt() {
        return modDt;
    }

    public void setModDt(Date modDt) {
        this.modDt = modDt;
    }

    public String getModId() {
        return modId;
    }

    public void setModId(String modId) {
        this.modId = modId;
    }

    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }
}
