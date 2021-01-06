package com.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import org.springframework.stereotype.Repository;

/**
 * @author zengkan
 */
@Repository
@TableName(resultMap = "specParam")
public class SpecParam {

  @TableId(value = "id", type = IdType.AUTO)
  private long id;
  private long cid;
  private long groupId;
  private String name;
  private long generic;
  private long status;
  private int main;

  public int getMain() {
    return main;
  }

  public void setMain(int main) {
    this.main = main;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public long getCid() {
    return cid;
  }

  public void setCid(long cid) {
    this.cid = cid;
  }


  public long getGroupId() {
    return groupId;
  }

  public void setGroupId(long groupId) {
    this.groupId = groupId;
  }


  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }


  public long getGeneric() {
    return generic;
  }

  public void setGeneric(long generic) {
    this.generic = generic;
  }


  public long getStatus() {
    return status;
  }

  public void setStatus(long status) {
    this.status = status;
  }

  @Override
  public String toString() {
    return "SpecParam(id=" + getId() +
            ", cid=" + getCid() +
            ", groupId=" + getGroupId() +
            ", name='" + getName() +
            ", generic=" + getGeneric() +
            ", status=" + getStatus() +
            ")";
  }
}
