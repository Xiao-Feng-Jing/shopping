package com.pojo;


import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

/**
 * @author zengkan
 */
@TableName(value = "spec_param")
public class SpecParam {

  @TableId(value = "id")
  private long id;
  @TableField(value = "cid")
  private long cid;
  @TableField(value = "group_id")
  private long groupId;
  @TableField(value = "name")
  private String name;
  @TableField(value = "generic")
  private long generic;
  @TableField(value = "status")
  private long status;

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

}
