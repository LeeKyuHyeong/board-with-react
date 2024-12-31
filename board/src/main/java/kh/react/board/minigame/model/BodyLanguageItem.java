package kh.react.board.minigame.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "body_language_item")
public class BodyLanguageItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private BodyLanguageGroup group;

    private String name;
    private String description;

    @Column(name = "reg_dt")
    private Date regDt;

    @Column(name = "reg_id")
    private String regId;

    @Column(name = "mod_dt")
    private Date modDt;

    @Column(name = "mod_id")
    private String modId;

    @Column(name = "use_yn")
    private String useYn;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BodyLanguageGroup getGroup() {
        return group;
    }

    public void setGroup(BodyLanguageGroup group) {
        this.group = group;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
